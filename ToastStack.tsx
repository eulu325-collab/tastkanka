import React from 'react';
import { ToastMessage } from './types';

const ICONS: Record<ToastMessage['type'], string> = {
  success: '✓',
  error: '!',
  info: 'i',
};

const COLORS: Record<ToastMessage['type'], string> = {
  success: 'bg-navy text-white',
  error: 'bg-red-600 text-white',
  info: 'bg-brand-600 text-white',
};

export default function ToastStack({ toasts }: { toasts: ToastMessage[] }) {
  if (toasts.length === 0) return null;
  return (
    <div className="fixed bottom-5 left-1/2 z-[100] flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4 sm:left-auto sm:right-5 sm:translate-x-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="status"
          className={`toast-anim flex items-center gap-3 rounded-md px-4 py-3 text-sm font-medium shadow-card ${COLORS[toast.type]}`}
        >
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs">
            {ICONS[toast.type]}
          </span>
          {toast.text}
        </div>
      ))}
    </div>
  );
}
