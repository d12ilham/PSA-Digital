'use client';

import React from 'react';
import MediaLibrary, { MediaAsset } from './MediaLibrary';

interface MediaLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  allowedType?: 'image' | 'video' | 'pdf' | 'all';
  onSelect: (url: string, asset: MediaAsset) => void;
}

export default function MediaLibraryModal({
  isOpen,
  onClose,
  allowedType = 'all',
  onSelect
}: MediaLibraryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 sm:p-6 md:p-10">
      <div className="w-full max-w-5xl bg-card shadow-2xl border border-border overflow-hidden relative" style={{ animation: 'zoomIn 0.15s ease-out' }}>
        <MediaLibrary
          mode="select"
          allowedType={allowedType}
          onSelect={(url, asset) => {
            onSelect(url, asset);
            onClose();
          }}
          onClose={onClose}
        />
      </div>
      
      {/* Zoom In Animation */}
      <style jsx>{`
        @keyframes zoomIn {
          from {
            transform: scale(0.97);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
