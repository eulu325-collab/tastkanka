import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import Modal from './Modal';
import Button from './Button';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  fileName: string;
}

export default function QrCodeModal({ isOpen, onClose, url, fileName }: QrCodeModalProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  function handleDownload() {
    const canvas = wrapperRef.current?.querySelector('canvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `${fileName}-qr.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="QR Kod">
      <div ref={wrapperRef} className="flex flex-col items-center gap-5">
        <div className="rounded-lg border border-line p-4">
          <QRCodeCanvas value={url} size={200} fgColor="#0F2A52" />
        </div>
        <div className="flex w-full gap-3">
          <Button variant="secondary" fullWidth onClick={onClose}>
            Kapat
          </Button>
          <Button fullWidth onClick={handleDownload}>
            QR Kodunu İndir
          </Button>
        </div>
      </div>
    </Modal>
  );
}
