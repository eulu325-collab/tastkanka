import React from 'react';
import { formatFileSize } from './format';

export interface QueueItem {
  localId: string;
  file: File;
  previewUrl: string;
  progress: number;
  status: 'bekliyor' | 'yukleniyor' | 'tamamlandi' | 'hata';
  resultId?: string;
}

interface UploadQueueItemProps {
  item: QueueItem;
  onRemove: (localId: string) => void;
}

export default function UploadQueueItem({ item, onRemove }: UploadQueueItemProps) {
  return (
    <div className="flex items-center gap-4 rounded-lg border border-line p-3">
      <img src={item.previewUrl} alt={item.file.name} className="h-14 w-14 shrink-0 rounded-md object-cover" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-sm font-medium text-ink">{item.file.name}</p>
          <span className="shrink-0 text-xs text-slate-400">{formatFileSize(item.file.size)}</span>
        </div>

        {item.status === 'hata' ? (
          <p className="mt-1.5 text-xs font-medium text-red-600">Yükleme başarısız</p>
        ) : item.status === 'tamamlandi' ? (
          <p className="mt-1.5 flex items-center gap-1 text-xs font-medium text-brand-600">
            <span>✓</span> Yüklendi
          </p>
        ) : (
          <div className="mt-2 flex items-center gap-2">
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${item.progress}%` }} />
            </div>
            <span className="w-9 shrink-0 text-right text-xs text-slate-400">{item.progress}%</span>
          </div>
        )}
      </div>
      {item.status !== 'yukleniyor' && (
        <button
          type="button"
          onClick={() => onRemove(item.localId)}
          aria-label="Dosyayı sil"
          className="shrink-0 rounded-md p-1.5 text-slate-400 hover:bg-mist hover:text-red-500"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </div>
  );
}
