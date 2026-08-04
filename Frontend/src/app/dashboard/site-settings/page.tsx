"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import { useToast } from "@/context/ToastContext";
import MediaLibraryModal from "@/components/media/MediaLibraryModal";
import {
  Globe,
  ImageIcon,
  BookOpen,
  Plus,
  Save,
  Edit2,
  Trash2,
  X,
  FileText,
  Check,
  Loader2,
  Settings,
} from "lucide-react";

interface Menu {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

interface MenuItem {
  id: string;
  menuId: string;
  parentId: string | null;
  label: string;
  url: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
  subItems?: MenuItem[];
}

interface SiteSettings {
  id: number;
  title: string;
  description: string | null;
  logoLightUrl: string | null;
  logoDarkUrl: string | null;
  faviconUrl: string | null;
  updatedAt: string;
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

export default function SiteSettingsPage() {
  const { user } = useAuth();
  const toast = useToast();

  const isEditorOrAdmin = user?.role === "admin" || user?.role === "editor";

  // Active Tab
  const [activeTab, setActiveTab] = useState<"identity" | "menus">("identity");

  // ── 1. Site Identity State ──────────────────────────────────────────────────
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);

  // Identity Form Fields
  const [siteTitle, setSiteTitle] = useState("");
  const [siteDescription, setSiteDescription] = useState("");
  const [logoLightUrl, setLogoLightUrl] = useState("");
  const [logoDarkUrl, setLogoDarkUrl] = useState("");
  const [faviconUrl, setFaviconUrl] = useState("");

  // Media Library Pickers State
  const [pickerOpen, setPickerOpen] = useState(false);
  const [pickerTarget, setPickerTarget] = useState<
    "logoLight" | "logoDark" | "favicon" | null
  >(null);

  // ── 2. Navigation Menus State ───────────────────────────────────────────────
  const [menusList, setMenusList] = useState<Menu[]>([]);
  const [menusLoading, setMenusLoading] = useState(false);

  // Selected Menu & Nested Items
  const [selectedMenuId, setSelectedMenuId] = useState<string>("");
  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);
  const [menuItemsTree, setMenuItemsTree] = useState<MenuItem[]>([]);
  const [menuItemsFlat, setMenuItemsFlat] = useState<MenuItem[]>([]);
  const [menuDetailLoading, setMenuDetailLoading] = useState(false);

  // Edit Menu Metadata Form
  const [menuName, setMenuName] = useState("");
  const [menuSlug, setMenuSlug] = useState("");
  const [savingMenuInfo, setSavingMenuInfo] = useState(false);

  // Create Menu Modal/Form
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [newMenuName, setNewMenuName] = useState("");
  const [newMenuSlug, setNewMenuSlug] = useState("");
  const [creatingMenu, setCreatingMenu] = useState(false);

  // Add Item Form Fields
  const [itemLabel, setItemLabel] = useState("");
  const [itemUrl, setItemUrl] = useState("");
  const [itemParentId, setItemParentId] = useState("");
  const [itemSortOrder, setItemSortOrder] = useState("0");
  const [addingItem, setAddingItem] = useState(false);

  // Edit Item Inline State
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editItemLabel, setEditItemLabel] = useState("");
  const [editItemUrl, setEditItemUrl] = useState("");
  const [editItemParentId, setEditItemParentId] = useState("");
  const [editItemSortOrder, setEditItemSortOrder] = useState("0");
  const [savingItemEdit, setSavingItemEdit] = useState(false);

  // ── 3. Effects & Fetching ──────────────────────────────────────────────────
  useEffect(() => {
    fetchSiteSettings();
    fetchMenus();
  }, []);

  useEffect(() => {
    if (selectedMenuId) {
      fetchMenuDetails(selectedMenuId);
    } else {
      setSelectedMenu(null);
      setMenuItemsTree([]);
      setMenuItemsFlat([]);
    }
  }, [selectedMenuId]);

  // Fetch Site Settings
  const fetchSiteSettings = async () => {
    setSettingsLoading(true);
    try {
      const res = await api.get<SiteSettings>("/site-settings");
      const data = res;
      setSettings(data);
      setSiteTitle(data.title || "");
      setSiteDescription(data.description || "");
      setLogoLightUrl(data.logoLightUrl || "");
      setLogoDarkUrl(data.logoDarkUrl || "");
      setFaviconUrl(data.faviconUrl || "");
    } catch (err: any) {
      console.error("Fetch site settings failed:", err);
      toast.error("Failed to load site identity settings");
    } finally {
      setSettingsLoading(false);
    }
  };

  // Save Site Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditorOrAdmin) return;
    setSavingSettings(true);
    try {
      const res = await api.patch<SiteSettings>("/site-settings", {
        title: siteTitle,
        description: siteDescription,
        logoLightUrl: logoLightUrl || null,
        logoDarkUrl: logoDarkUrl || null,
        faviconUrl: faviconUrl || null,
      });
      const data = res;
      setSettings(data);
      toast.success("Site settings updated successfully");
    } catch (err: any) {
      console.error("Save settings failed:", err);
      toast.error(err.message || "Failed to update site settings");
    } finally {
      setSavingSettings(false);
    }
  };

  // Fetch Menus List
  const fetchMenus = async () => {
    setMenusLoading(true);
    try {
      const res = await api.get<Menu[]>("/menus");
      const list = res;
      setMenusList(list);
      // Select first menu if available and none selected
      if (list.length > 0 && !selectedMenuId) {
        setSelectedMenuId(list[0].id);
      }
    } catch (err) {
      console.error("Fetch menus failed:", err);
      toast.error("Failed to load navigation menus");
    } finally {
      setMenusLoading(false);
    }
  };

  // Fetch Menu details with hierarchy
  const fetchMenuDetails = async (id: string) => {
    setMenuDetailLoading(true);
    try {
      const res = await api.get<Menu & { items: MenuItem[] }>(`/menus/${id}`);
      const data = res;
      setSelectedMenu(data);
      setMenuName(data.name || "");
      setMenuSlug(data.slug || "");
      setMenuItemsTree(data.items || []);

      // Build flat list for dropdown selectors
      const flat: MenuItem[] = [];
      const traverse = (node: MenuItem) => {
        flat.push(node);
        if (node.subItems) {
          node.subItems.forEach(traverse);
        }
      };
      (data.items || []).forEach(traverse);
      setMenuItemsFlat(flat);
    } catch (err) {
      console.error("Fetch menu details failed:", err);
      toast.error("Failed to load menu items");
    } finally {
      setMenuDetailLoading(true);
      setMenuDetailLoading(false);
    }
  };

  // Save Menu name/slug updates
  const handleUpdateMenuInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMenu || !isEditorOrAdmin) return;
    setSavingMenuInfo(true);
    try {
      const res = await api.patch(`/menus/${selectedMenu.id}`, {
        name: menuName,
        slug: menuSlug,
      });
      const updated = res;
      toast.success("Menu configurations updated");
      // Update in dropdown lists
      setMenusList((prev) =>
        prev.map((m) => (m.id === updated.id ? updated : m)),
      );
      setSelectedMenu(updated);
    } catch (err: any) {
      toast.error(err.message || "Failed to update menu configs");
    } finally {
      setSavingMenuInfo(false);
    }
  };

  // Delete Menu
  const handleDeleteMenu = async () => {
    if (!selectedMenu || !isEditorOrAdmin) return;
    if (
      !confirm(
        `Are you sure you want to delete the menu "${selectedMenu.name}"? This will delete all its menu items and subitems.`,
      )
    )
      return;

    try {
      await api.delete(`/menus/${selectedMenu.id}`);
      toast.success("Menu deleted successfully");
      const updatedList = menusList.filter((m) => m.id !== selectedMenu.id);
      setMenusList(updatedList);
      setSelectedMenuId(updatedList.length > 0 ? updatedList[0].id : "");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete menu");
    }
  };

  // Create a new Menu
  const handleCreateMenu = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMenuName.trim() || !newMenuSlug.trim() || !isEditorOrAdmin) return;
    setCreatingMenu(true);
    try {
      const res = await api.post<Menu>("/menus", {
        name: newMenuName,
        slug: newMenuSlug,
      });
      const created = res;
      toast.success(`Menu "${created.name}" created`);
      setMenusList((prev) => [...prev, created]);
      setSelectedMenuId(created.id);
      setShowCreateMenu(false);
      setNewMenuName("");
      setNewMenuSlug("");
    } catch (err: any) {
      toast.error(err.message || "Failed to create menu");
    } finally {
      setCreatingMenu(false);
    }
  };

  // Add Item to active Menu
  const handleAddMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !selectedMenu ||
      !itemLabel.trim() ||
      !itemUrl.trim() ||
      !isEditorOrAdmin
    )
      return;
    setAddingItem(true);
    try {
      await api.post(`/menus/${selectedMenu.id}/items`, {
        label: itemLabel,
        url: itemUrl,
        parentId: itemParentId || null,
        sortOrder: Number(itemSortOrder) || 0,
      });
      toast.success("Menu item added successfully");
      setItemLabel("");
      setItemUrl("");
      setItemParentId("");
      setItemSortOrder("0");
      fetchMenuDetails(selectedMenu.id);
    } catch (err: any) {
      toast.error(err.message || "Failed to add menu item");
    } finally {
      setAddingItem(false);
    }
  };

  // Open inline edit for an item
  const handleStartEditItem = (item: MenuItem) => {
    setEditingItemId(item.id);
    setEditItemLabel(item.label);
    setEditItemUrl(item.url);
    setEditItemParentId(item.parentId || "");
    setEditItemSortOrder(String(item.sortOrder));
  };

  // Save inline edit for item
  const handleSaveItemEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMenu || !editingItemId || !isEditorOrAdmin) return;
    setSavingItemEdit(true);
    try {
      await api.patch(`/menus/${selectedMenu.id}/items/${editingItemId}`, {
        label: editItemLabel,
        url: editItemUrl,
        parentId: editItemParentId || null,
        sortOrder: Number(editItemSortOrder) || 0,
      });
      toast.success("Menu item updated");
      setEditingItemId(null);
      fetchMenuDetails(selectedMenu.id);
    } catch (err: any) {
      toast.error(err.message || "Failed to update menu item");
    } finally {
      setSavingItemEdit(false);
    }
  };

  // Delete item from active Menu
  const handleDeleteMenuItem = async (itemId: string, label: string) => {
    if (!selectedMenu || !isEditorOrAdmin) return;
    if (
      !confirm(
        `Are you sure you want to delete the item "${label}"? Any subitems nested inside it will also be deleted.`,
      )
    )
      return;

    try {
      await api.delete(`/menus/${selectedMenu.id}/items/${itemId}`);
      toast.success("Menu item deleted");
      fetchMenuDetails(selectedMenu.id);
    } catch (err: any) {
      toast.error(err.message || "Failed to delete menu item");
    }
  };

  // Trigger media library picker
  const triggerPicker = (target: "logoLight" | "logoDark" | "favicon") => {
    setPickerTarget(target);
    setPickerOpen(true);
  };

  const handleSelectMedia = (url: string) => {
    if (pickerTarget === "logoLight") setLogoLightUrl(url);
    if (pickerTarget === "logoDark") setLogoDarkUrl(url);
    if (pickerTarget === "favicon") setFaviconUrl(url);
  };

  return (
    <div className="space-y-8">
      {/* ── Breadcrumb & Title ── */}
      <div>
        <div className="mb-1 flex items-center gap-2 font-mono text-xs uppercase text-muted">
          <span>Home</span>
          <span>/</span>
          <span>Admin</span>
          <span>/</span>
          <span className="text-primary font-bold">Site Settings</span>
        </div>
        <h1 className="text-2xl font-bold text-primary">
          Site Identity & Navigation
        </h1>
      </div>

      {/* ── Tab Selector ── */}
      <div className="flex border-b border-border gap-1 shrink-0">
        <button
          onClick={() => setActiveTab("identity")}
          className={`px-4 py-2 font-mono text-xs uppercase transition-colors border-t border-x -mb-[1px] ${
            activeTab === "identity"
              ? "bg-card text-primary border-border font-bold"
              : "bg-transparent border-transparent text-muted hover:text-primary"
          }`}
        >
          <Settings className="h-3.5 w-3.5 inline mr-1.5 -mt-0.5" />
          Site Identity
        </button>
        <button
          onClick={() => setActiveTab("menus")}
          className={`px-4 py-2 font-mono text-xs uppercase transition-colors border-t border-x -mb-[1px] ${
            activeTab === "menus"
              ? "bg-card text-primary border-border font-bold"
              : "bg-transparent border-transparent text-muted hover:text-primary"
          }`}
        >
          <BookOpen className="h-3.5 w-3.5 inline mr-1.5 -mt-0.5" />
          Navigation Menus
        </button>
      </div>

      {/* ── Tab Contents ── */}
      <div className="space-y-8">
        {/* Tab 1: Site Identity */}
        {activeTab === "identity" && (
          <div className="dashboard-section-card">
            <div className="dashboard-section-header">
              <h2 className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-[#8AC900]" />
                Manage General Identity
              </h2>
            </div>

            <div className="p-6">
              {settingsLoading ? (
                <div className="flex h-40 items-center justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    <span className="font-mono text-xs uppercase text-muted">
                      Retrieving configurations...
                    </span>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSaveSettings}
                  className="space-y-6 max-w-4xl"
                >
                  {/* Site Title */}
                  <div className="space-y-1">
                    <label className="block font-mono text-xs uppercase text-muted">
                      Site Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={siteTitle}
                      onChange={(e) => setSiteTitle(e.target.value)}
                      className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none"
                      placeholder="PSA Workforce Insights"
                    />
                  </div>

                  {/* Site Description */}
                  <div className="space-y-1">
                    <label className="block font-mono text-xs uppercase text-muted">
                      Site Description
                    </label>
                    <textarea
                      rows={3}
                      value={siteDescription}
                      onChange={(e) => setSiteDescription(e.target.value)}
                      className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:border-primary focus:outline-none leading-relaxed"
                      placeholder="Enter meta description for the site..."
                    />
                  </div>

                  {/* Light & Dark Logo Grid */}
                  <div className="grid gap-6 sm:grid-cols-2">
                    {/* Light Theme Logo */}
                    <div className="space-y-2 border border-border p-4 bg-sidebar/5 rounded">
                      <span className="block font-mono text-xs uppercase text-muted font-bold">
                        Logo (Light Mode BG)
                      </span>
                      <div className="border border-border/80 bg-card rounded p-2 flex items-center justify-center h-20 max-w-full overflow-hidden">
                        {logoLightUrl ? (
                          <img
                            src={logoLightUrl}
                            alt="Light logo preview"
                            className="max-h-full object-contain"
                          />
                        ) : (
                          <span className="font-mono text-xs uppercase text-muted/50 italic">
                            No Logo Selected
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => triggerPicker("logoLight")}
                          className="flex-1 font-mono text-xs uppercase border border-border bg-card hover:bg-sidebar px-2 py-1 transition-colors"
                        >
                          Choose Logo
                        </button>
                        {logoLightUrl && (
                          <button
                            type="button"
                            onClick={() => setLogoLightUrl("")}
                            className="px-2 py-1 text-red-500 border border-red-200 bg-red-50 hover:bg-red-100/50"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Dark Theme Logo */}
                    <div className="space-y-2 border border-border p-4 bg-sidebar/5 rounded">
                      <span className="block font-mono text-xs uppercase text-muted font-bold">
                        Logo (Dark Mode BG)
                      </span>
                      <div className="border border-border/80 bg-primary rounded p-2 flex items-center justify-center h-20 max-w-full overflow-hidden">
                        {logoDarkUrl ? (
                          <img
                            src={logoDarkUrl}
                            alt="Dark logo preview"
                            className="max-h-full object-contain"
                          />
                        ) : (
                          <span className="font-mono text-xs uppercase text-muted/30 italic">
                            No Logo Selected
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => triggerPicker("logoDark")}
                          className="flex-1 font-mono text-xs uppercase border border-border bg-card hover:bg-sidebar px-2 py-1 transition-colors"
                        >
                          Choose Logo
                        </button>
                        {logoDarkUrl && (
                          <button
                            type="button"
                            onClick={() => setLogoDarkUrl("")}
                            className="px-2 py-1 text-red-500 border border-red-200 bg-red-50 hover:bg-red-100/50"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Favicon picker */}
                  <div className="space-y-2 border border-border p-4 bg-sidebar/5 rounded max-w-xs">
                    <span className="block font-mono text-xs uppercase text-muted font-bold">
                      Browser Favicon
                    </span>
                    <div className="flex items-center gap-4">
                      <div className="border border-border/80 bg-card rounded p-2 flex items-center justify-center h-12 w-12 shrink-0">
                        {faviconUrl ? (
                          <img
                            src={faviconUrl}
                            alt="Favicon"
                            className="h-6 w-6 object-contain"
                          />
                        ) : (
                          <Globe className="h-5 w-5 text-muted/30" />
                        )}
                      </div>
                      <div className="flex-1 flex gap-2">
                        <button
                          type="button"
                          onClick={() => triggerPicker("favicon")}
                          className="flex-1 font-mono text-xs uppercase border border-border bg-card hover:bg-sidebar px-2 py-1 transition-colors"
                        >
                          Choose Favicon
                        </button>
                        {faviconUrl && (
                          <button
                            type="button"
                            onClick={() => setFaviconUrl("")}
                            className="px-2 py-1 text-red-500 border border-red-200 bg-red-50 hover:bg-red-100/50"
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Submit button */}
                  {isEditorOrAdmin && (
                    <div className="pt-4 flex justify-end border-t border-border/60">
                      <button
                        type="submit"
                        disabled={savingSettings}
                        className="bg-primary px-5 py-2 font-mono text-xs uppercase text-white hover:bg-active transition-colors disabled:opacity-50 flex items-center gap-1.5 font-bold"
                      >
                        <Save className="h-3.5 w-3.5" />
                        {savingSettings
                          ? "Saving..."
                          : "Save Identity Settings"}
                      </button>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Navigation Menus */}
        {activeTab === "menus" && (
          <div className="space-y-6">
            {/* Header select toolbar */}
            <div className="dashboard-section-card">
              <div className="dashboard-section-header">
                <h2 className="flex items-center gap-2">
                  <BookOpen className="h-4.5 w-4.5 text-[#8AC900]" />
                  Select Navigation Menu
                </h2>
              </div>
              <div className="p-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-card">
                <div className="flex items-center gap-3">
                  <span className="font-sans text-xs uppercase text-muted font-bold whitespace-nowrap">
                    Select a menu to edit:
                  </span>
                  {menusLoading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-muted" />
                  ) : (
                    <select
                      value={selectedMenuId}
                      onChange={(e) => setSelectedMenuId(e.target.value)}
                      className="border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:outline-none cursor-pointer"
                    >
                      <option value="">— Select Menu —</option>
                      {menusList.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {isEditorOrAdmin && (
                  <button
                    onClick={() => setShowCreateMenu(true)}
                    className="font-sans text-xs uppercase px-3 py-1.5 bg-primary text-white hover:bg-[#416102] transition-colors flex items-center gap-1 cursor-pointer font-bold shrink-0 rounded-lg"
                  >
                    <Plus className="h-3 w-3" />
                    Create New Menu
                  </button>
                )}
              </div>
            </div>

            {/* Menu configuration container */}
            {selectedMenu ? (
              <div className="grid gap-8 lg:grid-cols-3">
                {/* Menu Details & Add Items Panel */}
                <div className="lg:col-span-1 space-y-6">
                  {/* Menu Settings */}
                  <div className="border border-border bg-card p-5 relative">
                    <span className="absolute top-2 right-3 font-mono text-xs uppercase text-muted">
                      * CONFIGURATION
                    </span>
                    <h3 className="font-mono text-xs uppercase text-primary font-bold mb-4">
                      Menu Structure Settings
                    </h3>
                    <form onSubmit={handleUpdateMenuInfo} className="space-y-4">
                      <div className="space-y-1">
                        <label className="block font-mono text-xs uppercase text-muted">
                          Menu Name
                        </label>
                        <input
                          type="text"
                          required
                          value={menuName}
                          onChange={(e) => {
                            setMenuName(e.target.value);
                            setMenuSlug(slugify(e.target.value));
                          }}
                          className="w-full border border-border bg-[#fdfdfc] px-2.5 py-1.5 text-xs text-primary focus:outline-none"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block font-mono text-xs uppercase text-muted">
                          Slug (Identifier)
                        </label>
                        <input
                          type="text"
                          required
                          value={menuSlug}
                          onChange={(e) => setMenuSlug(e.target.value)}
                          className="w-full border border-border bg-[#fdfdfc] px-2.5 py-1.5 text-xs text-primary focus:outline-none font-mono text-xs"
                        />
                      </div>

                      {isEditorOrAdmin && (
                        <div className="flex gap-2 pt-2">
                          <button
                            type="button"
                            onClick={handleDeleteMenu}
                            className="border border-red-200 bg-red-50 text-red-600 px-3 py-1.5 font-mono text-xs uppercase hover:bg-red-100 transition-colors flex items-center justify-center gap-1"
                          >
                            <Trash2 className="h-3 w-3" />
                            Delete Menu
                          </button>
                          <button
                            type="submit"
                            disabled={savingMenuInfo}
                            className="flex-1 bg-primary text-white py-1.5 font-mono text-xs uppercase hover:bg-active transition-colors disabled:opacity-50 flex items-center justify-center gap-1 font-bold"
                          >
                            <Save className="h-3 w-3" />
                            {savingMenuInfo ? "Saving..." : "Save Settings"}
                          </button>
                        </div>
                      )}
                    </form>
                  </div>

                  {/* Add Menu Item */}
                  {isEditorOrAdmin && (
                    <div className="border border-border bg-card p-5 relative">
                      <span className="absolute top-2 right-3 font-mono text-xs uppercase text-muted">
                        * ITEM BUILDER
                      </span>
                      <h3 className="font-mono text-xs uppercase text-primary font-bold mb-4">
                        Add Menu Link Item
                      </h3>
                      <form onSubmit={handleAddMenuItem} className="space-y-4">
                        <div className="space-y-1">
                          <label className="block font-mono text-xs uppercase text-muted">
                            Link Label *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Services"
                            value={itemLabel}
                            onChange={(e) => setItemLabel(e.target.value)}
                            className="w-full border border-border bg-[#fdfdfc] px-2.5 py-1.5 text-xs text-primary focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block font-mono text-xs uppercase text-muted">
                            Link URL *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. /services or https://..."
                            value={itemUrl}
                            onChange={(e) => setItemUrl(e.target.value)}
                            className="w-full border border-border bg-[#fdfdfc] px-2.5 py-1.5 text-xs text-primary focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block font-mono text-xs uppercase text-muted">
                            Parent Menu Item
                          </label>
                          <select
                            value={itemParentId}
                            onChange={(e) => setItemParentId(e.target.value)}
                            className="w-full border border-border bg-card px-2.5 py-1.5 text-xs text-primary focus:outline-none cursor-pointer"
                          >
                            <option value="">— None (Top-level) —</option>
                            {menuItemsFlat.map((it) => (
                              <option key={it.id} value={it.id}>
                                {it.label} ({it.url})
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="block font-mono text-xs uppercase text-muted">
                            Sort Order
                          </label>
                          <input
                            type="number"
                            required
                            value={itemSortOrder}
                            onChange={(e) => setItemSortOrder(e.target.value)}
                            className="w-full border border-border bg-[#fdfdfc] px-2.5 py-1.5 text-xs text-primary focus:outline-none font-mono"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={addingItem}
                          className="w-full bg-primary text-white py-2 font-mono text-xs uppercase hover:bg-active transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5 font-bold"
                        >
                          <Plus className="h-3.5 w-3.5" />
                          {addingItem ? "Adding..." : "Add Link to Menu"}
                        </button>
                      </form>
                    </div>
                  )}
                </div>

                {/* Hierarchical Items Outline Panel */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="border border-border bg-card p-6 rounded-2xl relative">
                    <span className="absolute top-2 right-3 font-mono text-xs uppercase text-muted">
                      * MENU OUTLINE
                    </span>
                    <h3 className="font-mono text-xs uppercase text-primary font-bold border-b border-border/60 pb-3 mb-4">
                      Menu Structure & Hierarchy
                    </h3>

                    {menuDetailLoading ? (
                      <div className="flex h-40 items-center justify-center">
                        <div className="flex flex-col items-center gap-2">
                          <Loader2 className="h-5 w-5 animate-spin text-muted" />
                          <span className="font-mono text-xs uppercase text-muted">
                            Retrieving items...
                          </span>
                        </div>
                      </div>
                    ) : menuItemsTree.length === 0 ? (
                      <div className="text-center py-12 border border-dashed border-border bg-sidebar/10 p-6">
                        <p className="text-xs text-muted mb-1 font-mono">
                          This menu is currently empty.
                        </p>
                        <p className="text-xs text-muted/60 leading-relaxed font-mono">
                          Use the "Add Menu Link Item" builder on the left to
                          add your navigation links.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* Recursive Renderer function */}
                        {(() => {
                          const renderMenuItem = (
                            item: MenuItem,
                            depth = 0,
                          ) => {
                            const isEditing = editingItemId === item.id;

                            return (
                              <div key={item.id} className="space-y-2">
                                {/* Mapped Item Box */}
                                <div
                                  className={`border border-border bg-card p-3 flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                                    isEditing
                                      ? "border-primary bg-sidebar/10 ring-1 ring-primary"
                                      : "hover:bg-sidebar/5"
                                  }`}
                                  style={{ marginLeft: `${depth * 28}px` }}
                                >
                                  {isEditing ? (
                                    /* Inline Edit Form */
                                    <form
                                      onSubmit={handleSaveItemEdit}
                                      className="w-full grid gap-3 sm:grid-cols-4 items-end"
                                    >
                                      <div className="space-y-1 sm:col-span-1">
                                        <label className="block font-mono text-xs uppercase text-muted">
                                          Label *
                                        </label>
                                        <input
                                          type="text"
                                          required
                                          value={editItemLabel}
                                          onChange={(e) =>
                                            setEditItemLabel(e.target.value)
                                          }
                                          className="w-full border border-border bg-card px-2 py-1 text-xs text-primary focus:outline-none"
                                        />
                                      </div>
                                      <div className="space-y-1 sm:col-span-1">
                                        <label className="block font-mono text-xs uppercase text-muted">
                                          URL *
                                        </label>
                                        <input
                                          type="text"
                                          required
                                          value={editItemUrl}
                                          onChange={(e) =>
                                            setEditItemUrl(e.target.value)
                                          }
                                          className="w-full border border-border bg-card px-2 py-1 text-xs text-primary focus:outline-none font-mono text-xs"
                                        />
                                      </div>
                                      <div className="space-y-1 sm:col-span-1">
                                        <label className="block font-mono text-xs uppercase text-muted">
                                          Parent
                                        </label>
                                        <select
                                          value={editItemParentId}
                                          onChange={(e) =>
                                            setEditItemParentId(e.target.value)
                                          }
                                          className="w-full border border-border bg-card px-1 py-1 text-xs text-primary focus:outline-none cursor-pointer"
                                        >
                                          <option value="">
                                            — Top Level —
                                          </option>
                                          {menuItemsFlat
                                            .filter(
                                              (flatIt) => flatIt.id !== item.id,
                                            ) // Prevent self-parenting
                                            .map((flatIt) => (
                                              <option
                                                key={flatIt.id}
                                                value={flatIt.id}
                                              >
                                                {flatIt.label}
                                              </option>
                                            ))}
                                        </select>
                                      </div>
                                      <div className="space-y-1 sm:col-span-1 flex gap-1">
                                        <div className="flex-1">
                                          <label className="block font-mono text-xs uppercase text-muted">
                                            Order
                                          </label>
                                          <input
                                            type="number"
                                            required
                                            value={editItemSortOrder}
                                            onChange={(e) =>
                                              setEditItemSortOrder(
                                                e.target.value,
                                              )
                                            }
                                            className="w-full border border-border bg-card px-1.5 py-1 text-xs text-primary focus:outline-none font-mono"
                                          />
                                        </div>
                                        <div className="flex gap-0.5 mt-4 shrink-0">
                                          <button
                                            type="button"
                                            onClick={() =>
                                              setEditingItemId(null)
                                            }
                                            className="p-1.5 border border-border bg-card hover:bg-sidebar text-muted"
                                          >
                                            <X className="h-3.5 w-3.5" />
                                          </button>
                                          <button
                                            type="submit"
                                            disabled={savingItemEdit}
                                            className="p-1.5 bg-primary text-white disabled:opacity-50"
                                          >
                                            {savingItemEdit ? (
                                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                            ) : (
                                              <Save className="h-3.5 w-3.5" />
                                            )}
                                          </button>
                                        </div>
                                      </div>
                                    </form>
                                  ) : (
                                    /* Static Details View */
                                    <>
                                      <div className="flex items-center gap-2.5 min-w-0">
                                        {depth > 0 && (
                                          <span className="font-mono text-muted/30">
                                            └──
                                          </span>
                                        )}
                                        <div className="min-w-0">
                                          <h4 className="text-xs font-bold text-primary flex items-center gap-1.5 leading-none">
                                            {item.label}
                                            <span className="font-mono text-xs uppercase font-normal text-muted/65 border border-border px-1 py-0.5 bg-sidebar/10">
                                              Order: {item.sortOrder}
                                            </span>
                                          </h4>
                                          <p className="font-mono text-xs text-muted mt-1 truncate">
                                            {item.url}
                                          </p>
                                        </div>
                                      </div>

                                      {isEditorOrAdmin && (
                                        <div className="flex items-center gap-1 shrink-0 justify-end">
                                          <button
                                            onClick={() =>
                                              handleStartEditItem(item)
                                            }
                                            className="p-1 border border-border bg-card hover:bg-sidebar text-muted hover:text-primary transition-colors cursor-pointer"
                                            title="Edit Item"
                                          >
                                            <Edit2 className="h-3 w-3" />
                                          </button>
                                          <button
                                            onClick={() =>
                                              handleDeleteMenuItem(
                                                item.id,
                                                item.label,
                                              )
                                            }
                                            className="p-1 border border-red-200 bg-card hover:bg-red-50 text-red-500 transition-colors cursor-pointer"
                                            title="Delete Item"
                                          >
                                            <Trash2 className="h-3 w-3" />
                                          </button>
                                        </div>
                                      )}
                                    </>
                                  )}
                                </div>

                                {/* Recursively render children */}
                                {item.subItems && item.subItems.length > 0 && (
                                  <div className="space-y-2">
                                    {item.subItems
                                      .sort((a, b) => a.sortOrder - b.sortOrder)
                                      .map((child) =>
                                        renderMenuItem(child, depth + 1),
                                      )}
                                  </div>
                                )}
                              </div>
                            );
                          };

                          return (
                            <div className="space-y-3.5">
                              {menuItemsTree
                                .sort((a, b) => a.sortOrder - b.sortOrder)
                                .map((root) => renderMenuItem(root, 0))}
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="border border-dashed border-border bg-sidebar/20 p-8 text-center rounded">
                <Globe className="h-10 w-10 text-muted/30 mx-auto mb-3" />
                <span className="font-mono text-xs uppercase text-muted block mb-1">
                  No Navigation Menu Selected
                </span>
                <p className="font-mono text-xs text-muted/60 max-w-xs mx-auto">
                  Please select an existing menu from the selector toolbar, or
                  click "Create New Menu" to begin.
                </p>
              </div>
            )}

            {/* Create Menu Modal Overlay */}
            {showCreateMenu && (
              <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
                <div className="w-full max-w-md bg-card border border-border p-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-border/60 pb-3">
                    <h3 className="font-mono text-xs uppercase text-primary font-bold flex items-center gap-1.5">
                      <Plus className="h-3.5 w-3.5" />
                      Create Navigation Menu
                    </h3>
                    <button
                      onClick={() => setShowCreateMenu(false)}
                      className="p-0.5 border border-border bg-card text-muted hover:text-primary transition-colors hover:bg-red-50 hover:border-red-200"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateMenu} className="space-y-4">
                    <div className="space-y-1">
                      <label className="block font-mono text-xs uppercase text-muted">
                        Menu Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Header Menu"
                        value={newMenuName}
                        onChange={(e) => {
                          setNewMenuName(e.target.value);
                          setNewMenuSlug(slugify(e.target.value));
                        }}
                        className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block font-mono text-xs uppercase text-muted">
                        Slug (Auto-generated) *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. header-menu"
                        value={newMenuSlug}
                        onChange={(e) => setNewMenuSlug(e.target.value)}
                        className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs text-primary focus:outline-none font-mono text-xs"
                      />
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowCreateMenu(false)}
                        className="border border-border bg-card px-4 py-2 font-mono text-xs uppercase hover:bg-sidebar text-muted"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={creatingMenu}
                        className="bg-primary px-4 py-2 font-mono text-xs uppercase text-white hover:bg-active transition-colors disabled:opacity-50 font-bold"
                      >
                        {creatingMenu ? "Creating..." : "Create Menu"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Reusable Image Selection Picker Modals */}
      <MediaLibraryModal
        isOpen={pickerOpen}
        onClose={() => {
          setPickerOpen(false);
          setPickerTarget(null);
        }}
        allowedType="image"
        onSelect={(url) => {
          handleSelectMedia(url);
          setPickerOpen(false);
          setPickerTarget(null);
        }}
      />
    </div>
  );
}
