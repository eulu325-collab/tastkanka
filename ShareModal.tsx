import React from 'react';
import Modal from './Modal';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  fileName: string;
  onCopy: () => void;
}

export default function ShareModal({ isOpen, onClose, url, fileName, onCopy }: ShareModalProps) {
  const encodedUrl = encodeURIComponent(url);
  const shareText = encodeURIComponent(`${fileName} - ResimLink üzerinden paylaşıldı`);

  const canUseWebShare = typeof navigator !== 'undefined' && 'share' in navigator;

  async function handleNativeShare() {
    try {
      await (navigator as any).share({ title: fileName, url });
      onClose();
    } catch {
      // Kullanıcı paylaşımı iptal etti, sessizce geç.
    }
  }

  const options = [
    {
      label: 'WhatsApp',
      href: `https://wa.me/?text=${shareText}%20${encodedUrl}`,
      color: 'bg-[#25D366]',
    },
    {
      label: 'Telegram',
      href: `https://t.me/share/url?url=${encodedUrl}&text=${shareText}`,
      color: 'bg-[#2AABEE]',
    },
    {
      label: 'X',
      href: `https://twitter.com/intent/tweet?text=${shareText}&url=${encodedUrl}`,
      color: 'bg-black',
    },
    {
      label: 'E-posta',
      href: `mailto:?subject=${shareText}&body=${encodedUrl}`,
      color: 'bg-slate-500',
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Paylaş">
      <div className="flex flex-col gap-4">
        <button
          onClick={onCopy}
          className="flex items-center gap-3 rounded-md border border-line px-4 py-3 text-left text-sm font-medium text-ink hover:bg-mist"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-600">🔗</span>
          Linki Kopyala
        </button>

        {canUseWebShare && (
          <button
            onClick={handleNativeShare}
            className="flex items-center gap-3 rounded-md border border-line px-4 py-3 text-left text-sm font-medium text-ink hover:bg-mist"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-600">↗</span>
            Cihaz Paylaşım Menüsü
          </button>
        )}

        <div className="grid grid-cols-2 gap-3">
          {options.map((opt) => (
            <a
              key={opt.label}
              href={opt.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-md border border-line px-3 py-2.5 text-sm font-medium text-ink hover:bg-mist"
            >
              <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${opt.color}`} />
              {opt.label}
            </a>
          ))}
        </div>
      </div>
    </Modal>
  );
}
