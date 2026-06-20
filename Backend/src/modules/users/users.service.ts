import { db } from '../../config/database';
import { users } from '../../db/schema';
import { eq, ilike, and, sql } from 'drizzle-orm';
import { AppError } from '../../middleware/error.middleware';
import bcrypt from 'bcryptjs';

export class UsersService {
  async list(params: { page: number; limit: number; search?: string; role?: string }) {
    const { page, limit, search, role } = params;
    const offset = (page - 1) * limit;

    const conditions = [];
    if (search) conditions.push(ilike(users.email, `%${search}%`));
    if (role) conditions.push(eq(users.role, role as any));

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [rows, [{ count }]] = await Promise.all([
      db.select({
        id: users.id,
        email: users.email,
        firstName: users.firstName,
        lastName: users.lastName,
        role: users.role,
        isActive: users.isActive,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      }).from(users).where(where).limit(limit).offset(offset),
      db.select({ count: sql<number>`count(*)::int` }).from(users).where(where),
    ]);

    return { rows, total: count };
  }

  async findById(id: string) {
    const [user] = await db.select({
      id: users.id,
      email: users.email,
      firstName: users.firstName,
      lastName: users.lastName,
      role: users.role,
      isActive: users.isActive,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    }).from(users).where(eq(users.id, id)).limit(1);

    if (!user) throw new AppError('User not found', 404, 'NOT_FOUND');
    return user;
  }

  async update(id: string, data: { role?: string; isActive?: boolean; firstName?: string; lastName?: string }) {
    await this.findById(id);

    const [updated] = await db.update(users)
      .set({ ...data as any, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning({ id: users.id, email: users.email, role: users.role, isActive: users.isActive });

    return updated;
  }

  async resetPassword(id: string, newPassword: string) {
    await this.findById(id);
    const passwordHash = await bcrypt.hash(newPassword, 12);
    await db.update(users).set({ passwordHash, updatedAt: new Date() }).where(eq(users.id, id));
  }

  async deactivate(id: string) {
    return this.update(id, { isActive: false });
  }
}

export const usersService = new UsersService();
