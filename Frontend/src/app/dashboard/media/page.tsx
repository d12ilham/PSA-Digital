"use client";

import React from "react";
import MediaLibrary from "@/components/media/MediaLibrary";

export default function MediaLibraryPage() {
  return (
    <div className="space-y-8">
      {/* ── Breadcrumb & Title ── */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2 font-mono text-xs uppercase text-muted">
            <span>Home</span>
            <span>/</span>
            <span className="text-primary font-bold">Media Library</span>
          </div>
          <h1 className="text-2xl font-bold text-primary">Media Library</h1>
        </div>
        <div className="font-mono text-xs uppercase text-muted">
          Manage system uploaded assets
        </div>
      </div>

      {/* Standalone Media Library Component */}
      <div className="border border-border bg-card rounded-2xl overflow-hidden">
        <MediaLibrary mode="standalone" allowedType="all" />
      </div>
    </div>
  );
}
