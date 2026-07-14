import { Router, Request, Response, NextFunction } from 'express';
import { db } from '../../config/database';
import { menus, menuItems } from '../../db/schema';
import { eq, and } from 'drizzle-orm';
import { authenticate } from '../../middleware/auth.middleware';
import { requireEditor } from '../../middleware/rbac.middleware';
import { AppError } from '../../middleware/error.middleware';
import { successResponse } from '../../types/common';
import { param } from '../../types/params';

const router = Router();

// GET /api/v1/menus - List all menus
router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const list = await db.select().from(menus).orderBy(menus.name);
    res.json(successResponse(list));
  } catch (e) { next(e); }
});

// GET /api/v1/menus/:idOrSlug - Get single menu with nested items
router.get('/:idOrSlug', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const idOrSlug = param(req.params.idOrSlug);
    
    // Find menu
    let [menu] = await db.select().from(menus).where(eq(menus.id, idOrSlug)).limit(1);
    if (!menu) {
      [menu] = await db.select().from(menus).where(eq(menus.slug, idOrSlug)).limit(1);
    }
    
    if (!menu) {
      throw new AppError('Menu not found', 404, 'NOT_FOUND');
    }

    // Fetch all items for this menu
    const items = await db.select()
      .from(menuItems)
      .where(eq(menuItems.menuId, menu.id))
      .orderBy(menuItems.sortOrder);

    // Build hierarchical tree (parentId self-references menu_items.id)
    const itemMap = new Map<string, any>();
    for (const item of items) {
      itemMap.set(item.id, { ...item, subItems: [] });
    }

    const rootItems: any[] = [];
    for (const item of items) {
      const mapped = itemMap.get(item.id);
      if (item.parentId && itemMap.has(item.parentId)) {
        itemMap.get(item.parentId).subItems.push(mapped);
      } else {
        rootItems.push(mapped);
      }
    }

    res.json(successResponse({
      ...menu,
      items: rootItems
    }));
  } catch (e) { next(e); }
});

// POST /api/v1/menus - Create a new menu
router.post('/', authenticate, requireEditor, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, slug } = req.body;
    if (!name || !slug) throw new AppError('Name and slug are required', 400, 'BAD_REQUEST');

    // Check slug uniqueness
    const [existing] = await db.select().from(menus).where(eq(menus.slug, slug)).limit(1);
    if (existing) throw new AppError('A menu with this slug already exists', 400, 'BAD_REQUEST');

    const [newMenu] = await db.insert(menus).values({
      name,
      slug
    }).returning();

    res.status(201).json(successResponse(newMenu));
  } catch (e) { next(e); }
});

// PATCH /api/v1/menus/:id - Update menu metadata (name/slug)
router.patch('/:id', authenticate, requireEditor, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = param(req.params.id);
    const { name, slug } = req.body;

    const [menu] = await db.select().from(menus).where(eq(menus.id, id)).limit(1);
    if (!menu) throw new AppError('Menu not found', 404, 'NOT_FOUND');

    if (slug && slug !== menu.slug) {
      // Check slug uniqueness
      const [existing] = await db.select().from(menus).where(eq(menus.slug, slug)).limit(1);
      if (existing) throw new AppError('A menu with this slug already exists', 400, 'BAD_REQUEST');
    }

    const [updatedMenu] = await db.update(menus)
      .set({
        name: name !== undefined ? name : menu.name,
        slug: slug !== undefined ? slug : menu.slug,
        updatedAt: new Date()
      })
      .where(eq(menus.id, id))
      .returning();

    res.json(successResponse(updatedMenu));
  } catch (e) { next(e); }
});

// DELETE /api/v1/menus/:id - Delete menu (cascades to items)
router.delete('/:id', authenticate, requireEditor, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = param(req.params.id);
    const [menu] = await db.select().from(menus).where(eq(menus.id, id)).limit(1);
    if (!menu) throw new AppError('Menu not found', 404, 'NOT_FOUND');

    await db.delete(menus).where(eq(menus.id, id));
    res.json(successResponse({ message: 'Menu deleted successfully' }));
  } catch (e) { next(e); }
});

// POST /api/v1/menus/:menuId/items - Add menu item
router.post('/:menuId/items', authenticate, requireEditor, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const menuId = param(req.params.menuId);
    const { label, url, parentId, sortOrder } = req.body;
    
    if (!label || url === undefined) throw new AppError('Label and URL are required', 400, 'BAD_REQUEST');

    // Verify menu exists
    const [menu] = await db.select().from(menus).where(eq(menus.id, menuId)).limit(1);
    if (!menu) throw new AppError('Menu not found', 404, 'NOT_FOUND');

    // Verify parent exists if set
    if (parentId) {
      const [parent] = await db.select().from(menuItems).where(eq(menuItems.id, parentId)).limit(1);
      if (!parent) throw new AppError('Parent menu item not found', 404, 'NOT_FOUND');
    }

    const [newItem] = await db.insert(menuItems).values({
      menuId,
      parentId: parentId || null,
      label,
      url,
      sortOrder: sortOrder !== undefined ? Number(sortOrder) : 0
    }).returning();

    res.status(201).json(successResponse(newItem));
  } catch (e) { next(e); }
});

// PATCH /api/v1/menus/:menuId/items/:itemId - Update menu item
router.patch('/:menuId/items/:itemId', authenticate, requireEditor, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const menuId = param(req.params.menuId);
    const itemId = param(req.params.itemId);
    const { label, url, parentId, sortOrder } = req.body;

    const [item] = await db.select()
      .from(menuItems)
      .where(and(eq(menuItems.id, itemId), eq(menuItems.menuId, menuId)))
      .limit(1);
      
    if (!item) throw new AppError('Menu item not found in this menu', 404, 'NOT_FOUND');

    // Verify parent exists if set (and ensure it is not itself to prevent loops)
    if (parentId) {
      if (parentId === itemId) throw new AppError('An item cannot be its own parent', 400, 'BAD_REQUEST');
      const [parent] = await db.select().from(menuItems).where(eq(menuItems.id, parentId)).limit(1);
      if (!parent) throw new AppError('Parent menu item not found', 404, 'NOT_FOUND');
    }

    const [updatedItem] = await db.update(menuItems)
      .set({
        label: label !== undefined ? label : item.label,
        url: url !== undefined ? url : item.url,
        parentId: parentId !== undefined ? (parentId || null) : item.parentId,
        sortOrder: sortOrder !== undefined ? Number(sortOrder) : item.sortOrder,
        updatedAt: new Date()
      })
      .where(eq(menuItems.id, itemId))
      .returning();

    res.json(successResponse(updatedItem));
  } catch (e) { next(e); }
});

// DELETE /api/v1/menus/:menuId/items/:itemId - Delete menu item (cascades)
router.delete('/:menuId/items/:itemId', authenticate, requireEditor, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const menuId = param(req.params.menuId);
    const itemId = param(req.params.itemId);

    const [item] = await db.select()
      .from(menuItems)
      .where(and(eq(menuItems.id, itemId), eq(menuItems.menuId, menuId)))
      .limit(1);

    if (!item) throw new AppError('Menu item not found in this menu', 404, 'NOT_FOUND');

    await db.delete(menuItems).where(eq(menuItems.id, itemId));
    res.json(successResponse({ message: 'Menu item deleted successfully' }));
  } catch (e) { next(e); }
});

export { router as menusRouter };
