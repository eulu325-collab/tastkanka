import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ImageRecord } from './types';
import { formatDate } from './format';
import { useClipboard } from './useClipboard';
import { imageService } from './imageService';
import { useToast } from './useToast';

export default function MyImageCard({
  image,
  onDeleted,
}: {
  image: ImageRecord;
  onDeleted: (id: string) => void;
}) {
  const shareUrl = `${window.location.origin}/gorsel/${image.id}`;
  const { isCopied, copy } = useClipboard();
  const { showToast } = useToast();
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  function handleDelete() {
    imageService.delete(image.id);
    onDeleted(image.id);
    showToast('Görsel silindi.');
  }

  return (
    <div className="group overflow-hidden rounded-lg border border-line bg-white">
      <Link to={`/gorsel/${image.id}`} className="block aspect-[4/3] overflow-hidden bg-mist">
        <img
          src={image.dataUrl}
          alt={image.fileName}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="p-3.5">
        <p className="truncate text-sm font-medium text-ink">{image.fileName}</p>
        <p className="mt-0.5 text-xs text-slate-400">
          {formatDate(image.uploadedAt)} • {image.views} görüntülenme
        </p>
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={() => copy(shareUrl)}
            className="flex-1 rounded-md border border-line px-2.5 py-1.5 text-xs font-semibold text-ink hover:bg-mist"
          >
            {isCopied ? 'Kopyalandı ✓' : 'Linki Kopyala'}
          </button>
          <Link
            to={`/gorsel/${image.id}`}
            className="rounded-md border border-line px-2.5 py-1.5 text-xs font-semibold text-ink hover:bg-mist"
          >
            Görüntüle
          </Link>
          {confirmingDelete ? (
            <button
              onClick={handleDelete}
              className="rounded-md bg-red-600 px-2.5 py-1.5 text-xs font-semibold text-white"
            >
              Emin misin?
            </button>
          ) : (
            <button
              onClick={() => setConfirmingDelete(true)}
              onBlur={() => setConfirmingDelete(false)}
              aria-label="Görseli sil"
              className="rounded-md border border-line px-2.5 py-1.5 text-xs font-semibold text-red-500 hover:bg-red-50"
            >
              Sil
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
