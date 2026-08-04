"use client";

import React, { useState, useEffect, useRef } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import {
  Search,
  Upload,
  X,
  FileText,
  Film,
  ImageIcon,
  Trash2,
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Calendar,
  HardDrive,
} from "lucide-react";

export interface MediaAsset {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  sizeBytes: number;
  storagePath: string;
  url: string;
  altText: string | null;
  uploadedBy: string | null;
  createdAt: string;
}

interface MediaLibraryProps {
  mode?: "standalone" | "select";
  allowedType?: "image" | "video" | "pdf" | "all";
  onSelect?: (url: string, asset: MediaAsset) => void;
  onClose?: () => void;
}

const BACKEND_URL = "http://localhost:3000";

export default function MediaLibrary({
  mode = "standalone",
  allowedType = "all",
  onSelect,
  onClose,
}: MediaLibraryProps) {
  const { user } = useAuth();
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Tabs
  const [activeTab, setActiveTab] = useState<"library" | "upload">("library");

  // Search, Filters & Pagination
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>(allowedType);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalAssets, setTotalAssets] = useState(0);

  // Assets List
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(false);

  // Selected Asset & Sidebar Edit States
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const [altTextInput, setAltTextInput] = useState("");
  const [savingAltText, setSavingAltText] = useState(false);
  const [deletingAsset, setDeletingAsset] = useState(false);

  // Upload States
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const isAdmin = user?.role === "admin";

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1); // Reset page to 1 on new search
    }, 400);

    return () => clearTimeout(handler);
  }, [search]);

  // Fetch assets on filter or page change
  useEffect(() => {
    fetchAssets();
  }, [debouncedSearch, typeFilter, page]);

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const response = await api.get("/media", {
        params: {
          page,
          limit: 18,
          search: debouncedSearch || undefined,
          type: typeFilter === "all" ? undefined : typeFilter,
        },
      });

      // Response contains success, data, meta
      if (response && Array.isArray(response)) {
        setAssets(response);
        setTotalPages(1);
        setTotalAssets(response.length);
      } else if (response && response.success === false) {
        toast.error(response.message || "Failed to load media assets");
      } else {
        // Fallback for API paging structure
        const list = response.data || response;
        const meta = response.meta || {};
        setAssets(Array.isArray(list) ? list : []);
        setTotalPages(meta.totalPages || 1);
        setTotalAssets(meta.total || (Array.isArray(list) ? list.length : 0));
      }
    } catch (err: any) {
      console.error("Fetch media failed:", err);
      toast.error("Failed to load media library assets");
    } finally {
      setLoading(false);
    }
  };

  // Select asset
  const handleSelectAsset = (asset: MediaAsset) => {
    setSelectedAsset(asset);
    setAltTextInput(asset.altText || "");
  };

  // Save Alt Text
  const handleSaveAltText = async () => {
    if (!selectedAsset) return;
    setSavingAltText(true);
    try {
      const result = await api.patch(`/media/${selectedAsset.id}`, {
        altText: altTextInput,
      });

      const updatedAsset = result.data || result;
      // Update selected asset in state
      setSelectedAsset(updatedAsset);
      // Update asset in list
      setAssets((prev) =>
        prev.map((a) => (a.id === updatedAsset.id ? updatedAsset : a)),
      );
      toast.success("Alt text updated successfully");
    } catch (err: any) {
      console.error("Save alt text failed:", err);
      toast.error(err.message || "Failed to update alt text");
    } finally {
      setSavingAltText(false);
    }
  };

  // Delete Asset
  const handleDeleteAsset = async () => {
    if (!selectedAsset) return;
    if (
      !confirm(
        `Are you sure you want to permanently delete "${selectedAsset.originalName}"? This action cannot be undone.`,
      )
    )
      return;

    setDeletingAsset(true);
    try {
      await api.delete(`/media/${selectedAsset.id}`);
      toast.success("Asset deleted successfully");
      // Clear selection and refresh list
      setSelectedAsset(null);
      fetchAssets();
    } catch (err: any) {
      console.error("Delete asset failed:", err);
      toast.error(
        err.message ||
          "Failed to delete asset. Ensure you have administrator rights.",
      );
    } finally {
      setDeletingAsset(false);
    }
  };

  // Handle Select Action (modal mode)
  const handleConfirmSelection = () => {
    if (!selectedAsset || !onSelect) return;
    const fullUrl = `${BACKEND_URL}${selectedAsset.url}`;
    onSelect(fullUrl, selectedAsset);
  };

  // Upload Files handler
  const handleFileUpload = async (files: FileList) => {
    setUploading(true);
    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const formData = new FormData();
        formData.append("file", file);

        await api.upload("/media/upload", formData);
        successCount++;
      } catch (err: any) {
        console.error("Upload failed for file:", file.name, err);
        failCount++;
      }
    }

    setUploading(false);

    if (successCount > 0) {
      toast.success(`Successfully uploaded ${successCount} file(s).`);
      // Refresh library and switch tab
      fetchAssets();
      setActiveTab("library");
    }

    if (failCount > 0) {
      toast.error(
        `Failed to upload ${failCount} file(s). Check file type restrictions.`,
      );
    }
  };

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  // Helper to format bytes
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Helper to check if file is image, video, or pdf
  const getAssetType = (mimeType: string) => {
    if (mimeType.startsWith("image/")) return "image";
    if (mimeType.startsWith("video/")) return "video";
    if (mimeType === "application/pdf") return "pdf";
    return "other";
  };

  return (
    <div className="flex flex-col h-[75vh] min-h-[500px] bg-card text-primary font-sans select-none">
      {/* ── Library Header & Tabs ── */}
      <div className="flex items-center justify-between border-b border-border bg-sidebar/50 px-4 py-2 shrink-0">
        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveTab("upload")}
            className={`px-3 py-1 font-mono text-xs uppercase transition-colors border ${
              activeTab === "upload"
                ? "bg-primary text-white border-primary"
                : "bg-card border-border hover:bg-sidebar"
            }`}
          >
            <Upload className="h-3 w-3 inline mr-1" />
            Upload Files
          </button>
          <button
            onClick={() => setActiveTab("library")}
            className={`px-3 py-1 font-mono text-xs uppercase transition-colors border ${
              activeTab === "library"
                ? "bg-primary text-white border-primary"
                : "bg-card border-border hover:bg-sidebar"
            }`}
          >
            <HardDrive className="h-3 w-3 inline mr-1" />
            Media Library
          </button>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-1 border border-border bg-card text-muted hover:text-primary transition-colors hover:bg-red-50 hover:border-red-200"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* ── Main Content Grid/Split Layout ── */}
      <div className="flex flex-1 overflow-hidden min-h-0">
        {/* Upload Tab View */}
        {activeTab === "upload" && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 overflow-y-auto">
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`w-full max-w-xl border-2 border-dashed rounded-lg p-10 flex flex-col items-center justify-center gap-4 transition-all duration-200 ${
                dragActive
                  ? "border-primary bg-sidebar/50"
                  : "border-border bg-sidebar/10 hover:bg-sidebar/20"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                accept={
                  allowedType === "image"
                    ? "image/*"
                    : allowedType === "video"
                      ? "video/*"
                      : allowedType === "pdf"
                        ? "application/pdf"
                        : "image/*,video/*,application/pdf"
                }
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleFileUpload(e.target.files);
                  }
                }}
              />
              {uploading ? (
                <div className="flex flex-col items-center gap-2">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <span className="font-mono text-xs uppercase text-muted">
                    Uploading assets...
                  </span>
                </div>
              ) : (
                <>
                  <Upload className="h-10 w-10 text-muted" />
                  <div className="text-center">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="font-mono text-xs uppercase text-primary border border-border px-4 py-2 bg-card hover:bg-sidebar transition-colors font-bold shadow-sm"
                    >
                      Select Files to Upload
                    </button>
                    <p className="text-xs text-muted/60 mt-3 font-mono">
                      or drag and drop files here
                    </p>
                  </div>
                  <div className="text-center space-y-1 font-mono text-xs text-muted uppercase mt-4">
                    <p>Supported Formats:</p>
                    {allowedType === "all" && (
                      <p className="text-muted/60">
                        JPG, PNG, WEBP, SVG, MP4, WEBM, PDF
                      </p>
                    )}
                    {allowedType === "image" && (
                      <p className="text-muted/60">JPG, PNG, WEBP, SVG</p>
                    )}
                    {allowedType === "video" && (
                      <p className="text-muted/60">MP4, WEBM, OGG, MOV</p>
                    )}
                    {allowedType === "pdf" && (
                      <p className="text-muted/60">PDF only</p>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Library Tab View */}
        {activeTab === "library" && (
          <div className="flex-1 flex overflow-hidden">
            {/* Left Grid Area */}
            <div className="flex-1 flex flex-col bg-background overflow-hidden border-r border-border min-w-0">
              {/* Filter / Search Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-b border-border bg-card p-3 gap-2 shrink-0">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    placeholder="Search filename..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border border-border bg-[#fdfdfc] pl-8 pr-3 py-1 text-xs font-mono placeholder:text-muted/40 focus:border-primary focus:outline-none"
                  />
                  <Search className="absolute left-2.5 top-2.5 h-3 w-3 text-muted/50" />
                  {search && (
                    <button
                      onClick={() => setSearch("")}
                      className="absolute right-2.5 top-2.5 text-muted/50 hover:text-primary"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>

                {/* Filter Type */}
                {allowedType === "all" && (
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs uppercase text-muted font-bold whitespace-nowrap">
                      Show:
                    </span>
                    <select
                      value={typeFilter}
                      onChange={(e) => {
                        setTypeFilter(e.target.value);
                        setPage(1);
                      }}
                      className="border border-border bg-[#fdfdfc] px-2 py-1 text-xs font-mono text-primary focus:border-primary focus:outline-none cursor-pointer"
                    >
                      <option value="all">All Types</option>
                      <option value="image">Images</option>
                      <option value="video">Videos</option>
                      <option value="pdf">PDF Documents</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Grid content */}
              <div className="flex-1 overflow-y-auto p-4 min-h-0">
                {loading ? (
                  <div className="flex h-full flex-col items-center justify-center gap-3">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <span className="font-mono text-xs uppercase text-muted">
                      Loading Media Grid...
                    </span>
                  </div>
                ) : assets.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center p-6 border border-dashed border-border bg-sidebar/10">
                    <HardDrive className="h-8 w-8 text-muted/50 mb-3" />
                    <span className="font-mono text-xs uppercase text-muted mb-1">
                      No Assets Found
                    </span>
                    <p className="text-xs text-muted/60 max-w-xs font-mono">
                      No uploaded assets match your filters, or the media
                      library is empty.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {assets.map((asset) => {
                      const type = getAssetType(asset.mimeType);
                      const isSelected = selectedAsset?.id === asset.id;

                      return (
                        <div
                          key={asset.id}
                          onClick={() => handleSelectAsset(asset)}
                          className={`relative rounded-xl aspect-square border cursor-pointer group flex flex-col justify-between bg-card overflow-hidden transition-all duration-150 ${
                            isSelected
                              ? "border-2 border-primary bg-sidebar/20 ring-1 ring-primary"
                              : "border-border hover:border-accent hover:shadow"
                          }`}
                        >
                          {/* Thumbnail Content */}
                          <div className="flex-1 flex items-center justify-center p-2 relative bg-sidebar/5 min-h-0">
                            {type === "image" && (
                              <img
                                src={`${BACKEND_URL}${asset.url}`}
                                alt={asset.altText || asset.originalName}
                                className="max-w-full max-h-full object-contain pointer-events-none"
                                onError={(e) => {
                                  // Fallback for failed image load
                                  (e.target as HTMLImageElement).src = "";
                                  (e.target as HTMLImageElement).style.display =
                                    "none";
                                }}
                              />
                            )}
                            {type === "video" && (
                              <div className="flex flex-col items-center justify-center gap-1 text-muted group-hover:text-primary">
                                <Film className="h-8 w-8 shrink-0" />
                              </div>
                            )}
                            {type === "pdf" && (
                              <div className="flex flex-col items-center justify-center gap-1 text-muted group-hover:text-primary">
                                <FileText className="h-8 w-8 shrink-0 text-red-700/80" />
                              </div>
                            )}
                            {type === "other" && (
                              <div className="flex flex-col items-center justify-center gap-1 text-muted group-hover:text-primary">
                                <FileText className="h-8 w-8 shrink-0" />
                              </div>
                            )}

                            {/* Selection Checkmark Badge */}
                            {isSelected && (
                              <div className="absolute top-1.5 right-1.5 bg-primary text-white p-0.5 shadow-sm">
                                <Check className="h-3 w-3" />
                              </div>
                            )}
                          </div>

                          {/* Truncated File Label */}
                          <div className="border-t border-border bg-sidebar/20 p-1 px-1.5 shrink-0 min-w-0">
                            <p
                              className="font-mono text-xs text-primary truncate"
                              title={asset.originalName}
                            >
                              {asset.originalName}
                            </p>
                            <p className="font-mono text-xs text-muted uppercase">
                              {type}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Grid Pagination Footer */}
              {totalPages > 1 && (
                <div className="border-t border-border bg-card px-4 py-2.5 flex items-center justify-between shrink-0 font-mono text-xs text-muted">
                  <span>
                    Showing Page {page} of {totalPages} ({totalAssets} assets
                    total)
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      disabled={page === 1}
                      onClick={() => setPage((p) => Math.max(p - 1, 1))}
                      className="border border-border p-1 hover:bg-sidebar disabled:opacity-50 disabled:hover:bg-card transition-colors shrink-0"
                    >
                      <ChevronLeft className="h-4.5 w-4.5" />
                    </button>
                    <button
                      disabled={page === totalPages}
                      onClick={() =>
                        setPage((p) => Math.min(p + 1, totalPages))
                      }
                      className="border border-border p-1 hover:bg-sidebar disabled:opacity-50 disabled:hover:bg-card transition-colors shrink-0"
                    >
                      <ChevronRight className="h-4.5 w-4.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Details Panel Drawer */}
            <div className="w-80 shrink-0 flex flex-col bg-card overflow-y-auto min-w-0">
              {selectedAsset ? (
                <div className="p-4 space-y-6">
                  {/* Panel Title */}
                  <div>
                    <h3 className="font-mono text-xs uppercase text-muted">
                      Asset Details
                    </h3>
                  </div>

                  {/* Visual Preview */}
                  <div className="border border-border bg-sidebar/10 rounded p-2 flex items-center justify-center h-40 relative max-w-full overflow-hidden">
                    {getAssetType(selectedAsset.mimeType) === "image" && (
                      <img
                        src={`${BACKEND_URL}${selectedAsset.url}`}
                        alt={
                          selectedAsset.altText || selectedAsset.originalName
                        }
                        className="max-w-full max-h-full object-contain"
                      />
                    )}
                    {getAssetType(selectedAsset.mimeType) === "video" && (
                      <video
                        src={`${BACKEND_URL}${selectedAsset.url}`}
                        controls
                        className="max-w-full max-h-full object-contain"
                      />
                    )}
                    {getAssetType(selectedAsset.mimeType) === "pdf" && (
                      <div className="flex flex-col items-center justify-center text-center gap-2">
                        <FileText className="h-12 w-12 text-red-700/80" />
                        <span className="font-mono text-xs bg-red-100 border border-red-200 text-red-800 uppercase px-1 rounded">
                          PDF Report
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Metadata Fields */}
                  <div className="space-y-2 border-b border-border pb-4 font-mono text-xs text-muted">
                    <div className="flex justify-between items-start gap-1">
                      <span className="uppercase text-muted/60">Filename:</span>
                      <span
                        className="text-primary text-right truncate flex-1 min-w-0 font-bold"
                        title={selectedAsset.originalName}
                      >
                        {selectedAsset.originalName}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="uppercase text-muted/60">Type:</span>
                      <span className="text-primary font-bold uppercase">
                        {selectedAsset.mimeType}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="uppercase text-muted/60">Size:</span>
                      <span className="text-primary font-bold">
                        {formatBytes(selectedAsset.sizeBytes)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="uppercase text-muted/60">Uploaded:</span>
                      <span className="text-primary font-bold">
                        {new Date(selectedAsset.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Alt Text Input Field */}
                  <div className="space-y-1.5">
                    <label className="block font-mono text-xs uppercase text-muted flex items-center justify-between">
                      <span>Alt Text / Tag</span>
                      <span className="text-xs text-muted/40 lowercase">
                        (optional)
                      </span>
                    </label>
                    <textarea
                      value={altTextInput}
                      onChange={(e) => setAltTextInput(e.target.value)}
                      rows={3}
                      className="w-full border border-border bg-[#fdfdfc] p-2 text-xs text-primary focus:border-primary focus:outline-none placeholder:text-muted/40 font-sans leading-relaxed resize-none"
                      placeholder="Describe the media context for screen readers..."
                    />
                    <button
                      onClick={handleSaveAltText}
                      disabled={savingAltText}
                      className="w-full border border-border bg-sidebar hover:bg-sidebar/80 py-1 text-xs font-mono font-medium hover:border-accent transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
                    >
                      {savingAltText ? (
                        <>
                          <Loader2 className="h-3 w-3 animate-spin text-muted" />
                          <span>Saving...</span>
                        </>
                      ) : (
                        <span>Save Alt Text</span>
                      )}
                    </button>
                  </div>

                  {/* Action Buttons (Insert / Delete) */}
                  <div className="pt-4 border-t border-border flex flex-col gap-2">
                    {mode === "select" && onSelect && (
                      <button
                        onClick={handleConfirmSelection}
                        className="w-full bg-primary hover:bg-primary/95 text-white py-1.5 text-xs font-mono font-bold uppercase transition-colors shadow-sm flex items-center justify-center gap-1"
                      >
                        <Check className="h-3.5 w-3.5" />
                        Select Asset
                      </button>
                    )}

                    {isAdmin && (
                      <button
                        onClick={handleDeleteAsset}
                        disabled={deletingAsset}
                        className="w-full border border-red-200 bg-red-50/50 hover:bg-red-50 text-red-700 hover:text-red-800 py-1.5 text-xs font-mono hover:border-red-300 transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
                      >
                        {deletingAsset ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <Trash2 className="h-3.5 w-3.5" />
                        )}
                        <span>Delete Permanently</span>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-muted">
                  <ImageIcon className="h-8 w-8 text-muted/30 mb-2" />
                  <p className="font-mono text-xs uppercase leading-relaxed">
                    Select an asset from the media grid to view details and edit
                    settings.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
