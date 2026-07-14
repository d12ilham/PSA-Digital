"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useReport } from "@/context/ReportContext";
import { useAuth } from "@/context/AuthContext";
import {
  Plus,
  Trash2,
  Edit3,
  Eye,
  X,
  Check,
  Sliders,
  SlidersHorizontal,
} from "lucide-react";

interface Strategy {
  id: string;
  reportId: string;
  strategyType: "proposed" | "existing" | "federal" | "update";
  strategyYear: number | null;
  strategyNumber: number | null;
  title: string;
  description: string | null;
  deliveryTimeline: string | null;
  leadAgency: string | null;
  updateNote: string | null;
  status: "draft" | "active" | "archived";
  sortOrder: number;
}

export default function StrategiesManagementPage() {
  const { activeReport } = useReport();
  const { user } = useAuth();
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [loading, setLoading] = useState(false);

  // Filters
  const [typeFilter, setTypeFilter] = useState<
    "all" | "proposed" | "existing" | "federal" | "update"
  >("all");

  // Edit / Add Modal States
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStrategy, setEditingStrategy] = useState<Strategy | null>(null);

  // Form Fields
  const [strategyType, setStrategyType] = useState<
    "proposed" | "existing" | "federal" | "update"
  >("proposed");
  const [strategyYear, setStrategyYear] = useState<number>(2026);
  const [strategyNumber, setStrategyNumber] = useState<number>(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deliveryTimeline, setDeliveryTimeline] = useState("");
  const [leadAgency, setLeadAgency] = useState("");
  const [updateNote, setUpdateNote] = useState("");
  const [status, setStatus] = useState<"draft" | "active" | "archived">(
    "active",
  );

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (activeReport) {
      loadStrategies();
    }
  }, [activeReport]);

  const loadStrategies = async () => {
    setLoading(true);
    try {
      const res = await api.get<Strategy[]>(
        `/reports/${activeReport!.id}/strategies`,
      );
      setStrategies(res.sort((a, b) => a.sortOrder - b.sortOrder));
    } catch (err) {
      console.error("Failed to load strategies:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setEditingStrategy(null);
    setStrategyType("proposed");
    setStrategyYear(2026);
    setStrategyNumber(strategies.length + 1);
    setTitle("");
    setDescription("");
    setDeliveryTimeline("");
    setLeadAgency("");
    setUpdateNote("");
    setStatus("active");
    setModalOpen(true);
  };

  const handleOpenEdit = (strat: Strategy) => {
    setEditingStrategy(strat);
    setStrategyType(strat.strategyType);
    setStrategyYear(strat.strategyYear || 2026);
    setStrategyNumber(strat.strategyNumber || 1);
    setTitle(strat.title);
    setDescription(strat.description || "");
    setDeliveryTimeline(strat.deliveryTimeline || "");
    setLeadAgency(strat.leadAgency || "");
    setUpdateNote(strat.updateNote || "");
    setStatus(strat.status);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeReport) return;

    const payload = {
      strategyType,
      strategyYear: Number(strategyYear),
      strategyNumber: Number(strategyNumber),
      title,
      description: description || null,
      deliveryTimeline: deliveryTimeline || null,
      leadAgency: leadAgency || null,
      updateNote: strategyType === "update" ? updateNote : null,
      status,
    };

    try {
      if (editingStrategy) {
        // Update
        await api.patch(
          `/reports/${activeReport.id}/strategies/${editingStrategy.id}`,
          payload,
        );
      } else {
        // Create
        await api.post(`/reports/${activeReport.id}/strategies`, {
          ...payload,
          sortOrder: strategies.length + 1,
        });
      }
      setModalOpen(false);
      loadStrategies();
    } catch (err: any) {
      alert(`Operation failed: ${err.message}`);
    }
  };

  const handleDelete = async (stratId: string) => {
    if (!activeReport) return;
    if (
      !confirm(
        "Are you sure you want to delete this strategy record? This is irreversible.",
      )
    )
      return;

    try {
      await api.delete(`/reports/${activeReport.id}/strategies/${stratId}`);
      loadStrategies();
    } catch (err: any) {
      alert(`Delete failed: ${err.message}`);
    }
  };

  const filteredStrategies = strategies.filter((s) => {
    if (typeFilter === "all") return true;
    return s.strategyType === typeFilter;
  });

  if (!activeReport) {
    return (
      <div className="text-center p-8 border border-border bg-sidebar/20 font-mono text-xs uppercase text-muted">
        * Error: No active report dataset context selected.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ── Breadcrumb & Title ── */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted">
            <span>Home</span>
            <span>/</span>
            <span>Dataset</span>
            <span>/</span>
            <span className="text-primary font-bold">Strategies</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-primary">
            Workforce Strategies
          </h1>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-primary px-4 py-2 font-mono text-xs uppercase tracking-widest text-white hover:bg-active transition-colors flex items-center justify-center gap-1.5"
        >
          <Plus className="h-4 w-4" />
          Add Strategy
        </button>
      </div>

      {/* ── Visual Filter Chips ── */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="font-mono text-xs uppercase tracking-widest text-muted mr-2">
          Filter Type:
        </span>
        <button
          onClick={() => setTypeFilter("all")}
          className={`chip ${typeFilter === "all" ? "chip-active" : ""}`}
        >
          All Strategies
        </button>
        <button
          onClick={() => setTypeFilter("proposed")}
          className={`chip ${typeFilter === "proposed" ? "chip-active" : ""}`}
        >
          2026 Proposed
        </button>
        <button
          onClick={() => setTypeFilter("existing")}
          className={`chip ${typeFilter === "existing" ? "chip-active" : ""}`}
        >
          Existing Sector
        </button>
        <button
          onClick={() => setTypeFilter("federal")}
          className={`chip ${typeFilter === "federal" ? "chip-active" : ""}`}
        >
          Federal Initiatives
        </button>
        <button
          onClick={() => setTypeFilter("update")}
          className={`chip ${typeFilter === "update" ? "chip-active" : ""}`}
        >
          2025 Updates
        </button>
      </div>

      {/* ── Strategies Table Card ── */}
      <div className="border border-border bg-card p-6 rounded-2xl relative">
        <span className="absolute top-2 right-3 font-mono text-xs uppercase tracking-widest text-muted">
          * STRATEGIES DATA TABLE
        </span>

        {loading ? (
          <div className="flex h-32 items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="h-4 w-4 animate-spin rounded-full border border-primary border-t-transparent" />
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                Loading strategies...
              </span>
            </div>
          </div>
        ) : filteredStrategies.length === 0 ? (
          <div className="text-center py-12 font-mono text-xs uppercase text-muted italic">
            * No strategy records found matching the current filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border text-muted font-mono uppercase text-xs tracking-wider font-bold">
                  <th className="py-2.5 px-3">Num</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Strategy Title</th>
                  <th className="py-2.5 px-3">Lead Agency / Timeline</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {filteredStrategies.map((strat) => (
                  <tr key={strat.id} className="hover:bg-sidebar/10">
                    <td className="py-3 px-3 font-mono text-xs text-muted">
                      #{strat.strategyNumber || "-"}
                    </td>
                    <td className="py-3 px-3">
                      <span className="wireframe-badge text-xs font-semibold">
                        {strat.strategyType.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-3 max-w-xs">
                      <div className="font-bold text-primary">
                        {strat.title}
                      </div>
                      {strat.description && (
                        <p className="text-xs text-muted line-clamp-1 mt-0.5">
                          {strat.description}
                        </p>
                      )}
                      {strat.strategyType === "update" && strat.updateNote && (
                        <div className="mt-1 bg-sidebar/40 border border-border/40 p-1 text-xs font-mono text-muted">
                          * UPDATE: {strat.updateNote}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-3 font-mono text-xs text-muted">
                      <div>Agency: {strat.leadAgency || "N/A"}</div>
                      <div className="mt-0.5">
                        Timeline: {strat.deliveryTimeline || "N/A"}
                      </div>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`text-xs font-mono uppercase ${strat.status === "active" ? "text-green-700" : "text-muted"}`}
                      >
                        {strat.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(strat)}
                          className="p-1 border border-border bg-card hover:bg-sidebar text-muted"
                          title="Edit"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        {isAdmin && (
                          <button
                            onClick={() => handleDelete(strat.id)}
                            className="p-1 border border-red-150 bg-[#fff5f5] hover:bg-red-50 text-red-500 hover:border-red-300"
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── Slide-Over Form Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/20 backdrop-blur-xs px-4">
          <div className="w-full max-w-lg border border-border bg-card shadow-lg p-6 relative">
            <span className="absolute top-2 right-3 font-mono text-xs uppercase tracking-widest text-muted">
              * STRATEGY DIALOG
            </span>

            <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
                {editingStrategy
                  ? "Modify Strategy Record"
                  : "Create Strategy Record"}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 border border-border hover:bg-sidebar text-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="space-y-1">
                  <label className="block font-mono text-xs uppercase tracking-wider text-muted">
                    Type
                  </label>
                  <select
                    value={strategyType}
                    onChange={(e) => setStrategyType(e.target.value as any)}
                    className="w-full border border-border bg-card py-1.5 px-2 text-xs focus:outline-none"
                  >
                    <option value="proposed">Proposed 2026</option>
                    <option value="existing">Existing Sector</option>
                    <option value="federal">Federal</option>
                    <option value="update">Update on 2025</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-xs uppercase tracking-wider text-muted">
                    Year
                  </label>
                  <input
                    type="number"
                    value={strategyYear}
                    onChange={(e) => setStrategyYear(Number(e.target.value))}
                    className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-mono text-xs uppercase tracking-wider text-muted">
                    Number
                  </label>
                  <input
                    type="number"
                    value={strategyNumber}
                    onChange={(e) => setStrategyNumber(Number(e.target.value))}
                    className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-xs uppercase tracking-wider text-muted">
                  Strategy Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                  placeholder="e.g. Implement targeted apprenticeships programs"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-xs uppercase tracking-wider text-muted font-bold">
                  Lead Agency
                </label>
                <input
                  type="text"
                  value={leadAgency}
                  onChange={(e) => setLeadAgency(e.target.value)}
                  className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                  placeholder="e.g. Local Governments Association"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-xs uppercase tracking-wider text-muted font-bold">
                  Delivery Timeline
                </label>
                <input
                  type="text"
                  value={deliveryTimeline}
                  onChange={(e) => setDeliveryTimeline(e.target.value)}
                  className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                  placeholder="e.g. Q3 2026 - Q2 2027"
                />
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-xs uppercase tracking-wider text-muted font-semibold">
                  Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full border border-border bg-card py-1.5 px-2 text-xs focus:outline-none"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="block font-mono text-xs uppercase tracking-wider text-muted">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-border bg-[#fdfdfc] px-3 py-1.5 text-xs focus:outline-none"
                />
              </div>

              {strategyType === "update" && (
                <div className="space-y-1 border-t border-border/60 pt-3">
                  <label className="block font-mono text-xs uppercase tracking-wider text-red-600 font-bold">
                    Progress Update Note (2025 Strategy Status)
                  </label>
                  <textarea
                    rows={2}
                    value={updateNote}
                    onChange={(e) => setUpdateNote(e.target.value)}
                    className="w-full border border-red-200 bg-red-50/10 px-3 py-1.5 text-xs focus:outline-none placeholder:text-muted/40"
                    placeholder="e.g. Apprenticships schemes completed with 84% placement success..."
                  />
                </div>
              )}

              <div className="flex justify-end gap-2 pt-3 border-t border-border/60">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="border border-border bg-card px-4 py-2 font-mono text-xs uppercase tracking-widest hover:bg-sidebar transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary px-4 py-2 font-mono text-xs uppercase tracking-widest text-white hover:bg-active transition-colors"
                >
                  Save Strategy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
