import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ImageRecord } from './types';
import { useClipboard } from './useClipboard';
import QrCodeModal from './QrCodeModal';
import { imageService } from './imageService';
import { useToast } from './useToast';

export default function UploadResultCard({
  image,
  onDeleted,
}: {
  image: ImageRecord;
  onDeleted: (id: string) => void;
}) {
  const shareUrl = `${window.location.origin}/gorsel/${image.id}`;
  const { isCopied, copy } = useClipboard();
  const [isQrOpen, setIsQrOpen] = useState(false);
  const { showToast } = useToast();

  function handleDelete() {
    imageService.delete(image.id);
    onDeleted(image.id);
    showToast('Görsel silindi.');
  }

  return (
    <div className="flex flex-col gap-4 rounded-lg border border-line p-4 sm:flex-row sm:items-center">
      <img src={image.dataUrl} alt={image.fileName} className="h-20 w-20 shrink-0 rounded-md object-cover" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-ink">{image.fileName}</p>
        <p className="mt-1 truncate text-sm text-brand-600">{shareUrl}</p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => copy(shareUrl)}
          className="rounded-md border border-line px-3 py-1.5 text-xs font-semibold text-ink hover:bg-mist"
        >
          {isCopied ? 'Link Kopyalandı ✓' : 'Linki Kopyala'}
        </button>
        <Link
          to={`/gorsel/${image.id}`}
          className="rounded-md border border-line px-3 py-1.5 text-xs font-semibold text-ink hover:bg-mist"
        >
          Görseli Aç
        </Link>
        <button
          onClick={() => setIsQrOpen(true)}
          className="rounded-md border border-line px-3 py-1.5 text-xs font-semibold text-ink hover:bg-mist"
        >
          QR Kod
        </button>
        <button
          onClick={handleDelete}
          className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
        >
          Sil
        </button>
      </div>
      <QrCodeModal isOpen={isQrOpen} onClose={() => setIsQrOpen(false)} url={shareUrl} fileName={image.id} />
    </div>
  );
}
