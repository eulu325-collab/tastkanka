import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { imageService } from './imageService';
import { ImageRecord } from './types';
import { formatDateTime, formatFileSize } from './format';
import { useClipboard } from './useClipboard';
import Button from './Button';
import TextField from './TextField';
import QrCodeModal from './QrCodeModal';
import ShareModal from './ShareModal';
import { useToast } from './useToast';

export default function ImagePage() {
  const { id } = useParams<{ id: string }>();
  const [image, setImage] = useState<ImageRecord | null | undefined>(undefined);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const { isCopied, copy } = useClipboard();
  const { showToast } = useToast();

  useEffect(() => {
    if (!id) return;
    const found = imageService.getById(id);
    setImage(found);
    if (found && !found.passwordProtected) {
      imageService.registerView(id);
    }
  }, [id]);

  function handleUnlock(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return;
    if (imageService.verifyPassword(id, passwordInput)) {
      setIsUnlocked(true);
      setPasswordError('');
      imageService.registerView(id);
    } else {
      setPasswordError('Şifre yanlış, tekrar dene.');
    }
  }

  async function handleCopy() {
    const ok = await copy(shareUrl);
    if (ok) showToast('Link kopyalandı.');
  }

  if (image === undefined) return null;

  if (image === null) {
    return (
      <div className="text-center">
        <h1 className="text-xl font-bold text-navy">Görsel bulunamadı</h1>
        <p className="mt-2 text-sm text-slate-500">Bu görsel silinmiş veya hiç var olmamış olabilir.</p>
        <Link to="/anasayfa" className="mt-6 inline-block">
          <Button>Ana Sayfaya Dön</Button>
        </Link>
      </div>
    );
  }

  const shareUrl = `${window.location.origin}/gorsel/${image.id}`;

  if (image.passwordProtected && !isUnlocked) {
    return (
      <div className="w-full max-w-sm rounded-xl border border-line bg-white p-8 text-center shadow-card">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-600">
          🔒
        </div>
        <h1 className="text-lg font-semibold text-navy">Bu görsel şifre ile korunuyor</h1>
        <p className="mt-1 text-sm text-slate-500">Görüntülemek için şifreyi gir.</p>
        <form onSubmit={handleUnlock} className="mt-5 flex flex-col gap-4 text-left">
          <TextField
            label="Şifre"
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            error={passwordError}
            autoFocus
          />
          <Button type="submit" fullWidth>
            Görüntüle
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl">
      <div className="overflow-hidden rounded-xl border border-line bg-white shadow-card">
        <img src={image.dataUrl} alt={image.fileName} className="max-h-[70vh] w-full object-contain" />
        <div className="p-5">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-base font-semibold text-navy">{image.fileName}</p>
              <p className="mt-0.5 text-sm text-slate-500">
                {formatFileSize(image.sizeBytes)} • {formatDateTime(image.uploadedAt)}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <Button size="sm" onClick={handleCopy}>
              {isCopied ? 'Link Kopyalandı ✓' : 'Linki Kopyala'}
            </Button>
            <Button size="sm" variant="secondary" onClick={() => setIsShareOpen(true)}>
              Paylaş
            </Button>
            <Button size="sm" variant="secondary" onClick={() => setIsQrOpen(true)}>
              QR Kod
            </Button>
          </div>
        </div>
      </div>

      <QrCodeModal isOpen={isQrOpen} onClose={() => setIsQrOpen(false)} url={shareUrl} fileName={image.id} />
      <ShareModal
        isOpen={isShareOpen}
        onClose={() => setIsShareOpen(false)}
        url={shareUrl}
        fileName={image.fileName}
        onCopy={handleCopy}
      />
    </div>
  );
}
