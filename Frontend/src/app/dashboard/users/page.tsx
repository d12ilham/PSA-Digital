"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuth, User } from "@/context/AuthContext";
import {
  Plus,
  Trash2,
  Edit3,
  X,
  Check,
  Users,
  Shield,
  UserPlus,
} from "lucide-react";

export default function UserManagementPage() {
  const { user: currentUser } = useAuth();

  const [usersList, setUsersList] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  // Register New User Modal
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState<"admin" | "editor" | "viewer">("editor");

  // Edit User Modal
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editRole, setEditRole] = useState<"admin" | "editor" | "viewer">(
    "editor",
  );
  const [editIsActive, setEditIsActive] = useState(true);

  const [submitting, setSubmitting] = useState(false);

  const isAdmin = currentUser?.role === "admin";

  useEffect(() => {
    if (isAdmin) {
      loadUsers();
    }
  }, [isAdmin]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get<User[]>("/users");
      setUsersList(res);
    } catch (err) {
      console.error("Failed to load users list:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post("/auth/register", {
        email,
        password,
        firstName,
        lastName,
        role,
      });
      setAddModalOpen(false);
      setEmail("");
      setPassword("");
      setFirstName("");
      setLastName("");
      setRole("editor");
      loadUsers();
    } catch (err: any) {
      alert(`Registration failed: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleOpenEdit = (user: User) => {
    setEditingUser(user);
    setEditRole(user.role);
    setEditIsActive(user.isActive);
    setEditModalOpen(true);
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setSubmitting(true);
    try {
      await api.patch(`/users/${editingUser.id}`, {
        role: editRole,
        isActive: editIsActive,
      });
      setEditModalOpen(false);
      loadUsers();
    } catch (err: any) {
      alert(`Update failed: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleActive = async (user: User) => {
    if (user.id === currentUser?.id) {
      alert("You cannot deactivate your own account.");
      return;
    }
    const updatedStatus = !user.isActive;
    try {
      await api.patch(`/users/${user.id}`, {
        isActive: updatedStatus,
      });
      loadUsers();
    } catch (err: any) {
      alert(`Toggle status failed: ${err.message}`);
    }
  };

  if (!isAdmin) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center border border-dashed border-border bg-sidebar/20 p-8 text-center">
        <Shield className="mb-4 h-8 w-8 text-red-500" />
        <span className="font-mono text-xs uppercase text-red-500 mb-2">
          Access Denied
        </span>
        <p className="max-w-xs text-xs text-muted/80 leading-relaxed">
          User Management functions are strictly restricted to system
          administrators. Please contact your administrator.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ── Breadcrumb & Title ── */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2 font-mono text-xs uppercase text-muted">
            <span>Home</span>
            <span>/</span>
            <span>Admin</span>
            <span>/</span>
            <span className="text-primary font-bold">Users</span>
          </div>
          <h1 className="text-2xl font-bold text-primary">User Accounts</h1>
        </div>

        <button
          onClick={() => setAddModalOpen(true)}
          className="bg-primary px-4 py-2 font-mono text-xs uppercase text-white hover:bg-active transition-colors flex items-center justify-center gap-1.5"
        >
          <UserPlus className="h-4 w-4" />
          Add User Account
        </button>
      </div>

      {/* ── Users Table Card ── */}
      <div className="border border-border bg-card p-6 rounded-2xl relative">
        <span className="absolute top-2 right-3 font-mono text-xs uppercase text-muted">
          * SYSTEM ACCOUNTS INDEX
        </span>

        {loading ? (
          <div className="flex h-32 items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-4 w-4 animate-spin rounded-full border border-primary border-t-transparent" />
              <span className="font-mono text-xs uppercase text-muted">
                Loading account data...
              </span>
            </div>
          </div>
        ) : usersList.length === 0 ? (
          <div className="text-center py-12 font-mono text-xs uppercase text-muted italic">
            * No user records found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border text-muted font-mono uppercase text-xs font-bold">
                  <th className="py-2.5 px-3">Full Name</th>
                  <th className="py-2.5 px-3">Email Address</th>
                  <th className="py-2.5 px-3">Authorization Role</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {usersList.map((usr) => (
                  <tr key={usr.id} className="hover:bg-sidebar/10">
                    <td className="py-3 px-3 font-bold text-primary">
                      {usr.firstName} {usr.lastName}{" "}
                      {usr.id === currentUser?.id && " (You)"}
                    </td>
                    <td className="py-3 px-3 font-mono text-xs text-muted">
                      {usr.email}
                    </td>
                    <td className="py-3 px-3">
                      <span className="wireframe-badge text-xs font-semibold">
                        {usr.role.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => handleToggleActive(usr)}
                        disabled={usr.id === currentUser?.id}
                        className={`text-xs font-mono uppercase border px-1.5 py-0.5 transition-colors disabled:opacity-50 ${
                          usr.isActive
                            ? "text-green-700 border-green-200 bg-green-50/50 hover:bg-green-50"
                            : "text-red-700 border-red-200 bg-red-50/50 hover:bg-red-50"
                        }`}
                      >
                        {usr.isActive ? "Active" : "Suspended"}
                      </button>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(usr)}
                          disabled={usr.id === currentUser?.id}
                          className="p-1 border border-border bg-card hover:bg-sidebar text-muted disabled:opacity-50"
                          title="Edit Role/Status"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Register User Modal ── */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/20 backdrop-blur-xs px-4">
          <div className="w-full max-w-md border border-border bg-card p-6 relative">
            <span className="absolute top-2 right-3 font-mono text-xs uppercase text-muted">
              * REGISTER USER
            </span>

            <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
              <h3 className="text-sm font-bold uppercase text-primary">
                Register New Account
              </h3>
              <button
                onClick={() => setAddModalOpen(false)}
                className="p-1 border border-border hover:bg-sidebar text-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <label className="block font-mono text-xs uppercase text-muted">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-xs uppercase text-muted">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-xs uppercase text-muted">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                  placeholder="e.g. name@psa.gov.au"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-xs uppercase text-muted">
                  Temporary Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                  placeholder="At least 8 characters"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-xs uppercase text-muted font-bold">
                  Initial Role
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full border border-border bg-card py-1.5 px-2 text-xs focus:outline-none"
                >
                  <option value="editor">
                    Editor (Can edit drafts/reports)
                  </option>
                  <option value="admin">Administrator (Full Control)</option>
                  <option value="viewer">Viewer (Read-only access)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border/60">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="border border-border bg-card px-4 py-2 font-mono text-xs uppercase hover:bg-sidebar transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-primary px-4 py-2 font-mono text-xs uppercase text-white hover:bg-active transition-colors disabled:opacity-50"
                >
                  {submitting ? "Registering..." : "Register Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── Edit User Modal ── */}
      {editModalOpen && editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/20 backdrop-blur-xs px-4">
          <div className="w-full max-w-sm border border-border bg-card p-6 relative">
            <span className="absolute top-2 right-3 font-mono text-xs uppercase text-muted">
              * ACCOUNT PRIVILEGES
            </span>

            <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
              <h3 className="text-sm font-bold uppercase text-primary">
                Edit User: {editingUser.firstName}
              </h3>
              <button
                onClick={() => setEditModalOpen(false)}
                className="p-1 border border-border hover:bg-sidebar text-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateUser} className="space-y-4">
              <div className="space-y-1">
                <label className="block font-mono text-xs uppercase text-muted font-bold">
                  Assign Role
                </label>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value as any)}
                  className="w-full border border-border bg-card py-1.5 px-2 text-xs focus:outline-none"
                >
                  <option value="editor">Editor (Can edit content)</option>
                  <option value="admin">Administrator (Full Control)</option>
                  <option value="viewer">Viewer (Read-only access)</option>
                </select>
              </div>

              <div className="flex items-center py-2">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={editIsActive}
                    onChange={(e) => setEditIsActive(e.target.checked)}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-0 cursor-pointer"
                  />
                  <span className="font-mono text-xs uppercase text-primary">
                    Active Account Status
                  </span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-border/60">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="border border-border bg-card px-4 py-2 font-mono text-xs uppercase hover:bg-sidebar transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-primary px-4 py-2 font-mono text-xs uppercase text-white hover:bg-active transition-colors disabled:opacity-50"
                >
                  {submitting ? "Updating..." : "Save Settings"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
