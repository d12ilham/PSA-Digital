'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  showToast: (message: any, type?: ToastType) => void;
  success: (message: any) => void;
  error: (message: any) => void;
  info: (message: any) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function parseErrorMessage(error: any): string {
  if (!error) return 'An unexpected error occurred.';
  
  // If it is an Error instance, extract the message
  let message = error.message || String(error);
  if (error.response?.data?.error?.message) {
    message = error.response.data.error.message;
  }

  // Check if the message is a stringified JSON array (Zod validation errors)
  if (typeof message === 'string' && message.trim().startsWith('[')) {
    try {
      const parsed = JSON.parse(message);
      if (Array.isArray(parsed)) {
        return parsed
          .map(issue => {
            const field = issue.path && issue.path.length > 0 ? issue.path.join('.') : '';
            return `${field ? `"${field}": ` : ''}${issue.message}`;
          })
          .join('\n');
      }
    } catch {
      // Fallback
    }
  }

  return message;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const showToast = useCallback((message: any, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    const parsedMessage = type === 'error' ? parseErrorMessage(message) : String(message);

    setToasts(prev => [...prev, { id, type, message: parsedMessage }]);

    // Auto-remove after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, [removeToast]);

  const success = useCallback((msg: any) => showToast(msg, 'success'), [showToast]);
  const error = useCallback((msg: any) => showToast(msg, 'error'), [showToast]);
  const info = useCallback((msg: any) => showToast(msg, 'info'), [showToast]);

  return (
    <ToastContext.Provider value={{ showToast, success, error, info }}>
      {children}
      
      {/* Toast Portal Container */}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 shadow-xl rounded border transition-all duration-300 font-mono text-xs ${
              toast.type === 'success'
                ? 'bg-green-50 border-green-200 text-green-800'
                : toast.type === 'error'
                ? 'bg-red-50 border-red-200 text-red-800'
                : 'bg-blue-50 border-blue-200 text-blue-800'
            }`}
            style={{
              animation: 'slideIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            }}
          >
            {/* Icons */}
            {toast.type === 'success' && <CheckCircle className="h-4.5 w-4.5 text-green-600 shrink-0 mt-0.5" />}
            {toast.type === 'error' && <AlertCircle className="h-4.5 w-4.5 text-red-600 shrink-0 mt-0.5" />}
            {toast.type === 'info' && <Info className="h-4.5 w-4.5 text-blue-600 shrink-0 mt-0.5" />}

            {/* Content */}
            <div className="flex-1 whitespace-pre-wrap leading-relaxed">
              {toast.message}
            </div>

            {/* Dismiss Button */}
            <button
              onClick={() => removeToast(toast.id)}
              className="text-muted/60 hover:text-muted shrink-0 p-0.5 -mt-0.5 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Global CSS for sliding animation */}
      <style jsx global>{`
        @keyframes slideIn {
          from {
            transform: translateY(-1rem) scale(0.95);
            opacity: 0;
          }
          to {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
