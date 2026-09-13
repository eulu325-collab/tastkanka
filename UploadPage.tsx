import React, { useState } from 'react';
import Dropzone from './Dropzone';
import UploadQueueItem, { QueueItem } from './UploadQueueItem';
import UploadResultCard from './UploadResultCard';
import Button from './Button';
import TextField from './TextField';
import { generateUuid } from './id';
import { imageService } from './imageService';
import { useAuth } from './useAuth';
import { useToast } from './useToast';
import { ImageRecord, RetentionPeriod } from './types';
import { ALLOWED_MIME_TYPES, MAX_FILE_SIZE_BYTES } from './format';

const RETENTION_OPTIONS: { value: RetentionPeriod; label: string }[] = [
  { value: '1g', label: '1 Gün' },
  { value: '7g', label: '7 Gün' },
  { value: '30g', label: '30 Gün' },
  { value: '90g', label: '90 Gün' },
  { value: 'suresiz', label: 'Süresiz' },
];

export default function UploadPage() {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [results, setResults] = useState<ImageRecord[]>([]);
  const [retention, setRetention] = useState<RetentionPeriod>('30g');
  const [passwordEnabled, setPasswordEnabled] = useState(false);
  const [password, setPassword] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [showUrlUpload, setShowUrlUpload] = useState(false);
  const [isUploadingUrl, setIsUploadingUrl] = useState(false);

  function addFiles(files: File[]) {
    const accepted: QueueItem[] = [];
    for (const file of files) {
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        showToast('Bu dosya formatı desteklenmiyor.', 'error');
        continue;
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        showToast(`${file.name} dosyası çok büyük (maks. 15 MB).`, 'error');
        continue;
      }
      accepted.push({
        localId: generateUuid(),
        file,
        previewUrl: URL.createObjectURL(file),
        progress: 0,
        status: 'bekliyor',
      });
    }
    if (accepted.length > 0) setQueue((prev) => [...prev, ...accepted]);
  }

  function removeFromQueue(localId: string) {
    setQueue((prev) => prev.filter((item) => item.localId !== localId));
  }

  async function handleUploadAll() {
    const pending = queue.filter((item) => item.status === 'bekliyor');
    if (pending.length === 0) return;

    for (const item of pending) {
      setQueue((prev) =>
        prev.map((q) => (q.localId === item.localId ? { ...q, status: 'yukleniyor' } : q))
      );
      try {
        const record = await imageService.uploadFile(item.file, {
          ownerId: user?.id ?? null,
          retention,
          password: passwordEnabled ? password : undefined,
          onProgress: (percent) => {
            setQueue((prev) =>
              prev.map((q) => (q.localId === item.localId ? { ...q, progress: percent } : q))
            );
          },
        });
        setQueue((prev) =>
          prev.map((q) => (q.localId === item.localId ? { ...q, status: 'tamamlandi', resultId: record.id } : q))
        );
        setResults((prev) => [record, ...prev]);
      } catch {
        setQueue((prev) =>
          prev.map((q) => (q.localId === item.localId ? { ...q, status: 'hata' } : q))
        );
      }
    }
    showToast('Yükleme tamamlandı!');
  }

  async function handleUrlUpload() {
    if (!urlInput.trim()) return;
    setIsUploadingUrl(true);
    try {
      const record = await imageService.uploadFromUrl(urlInput.trim(), {
        ownerId: user?.id ?? null,
        retention,
        password: passwordEnabled ? password : undefined,
      });
      setResults((prev) => [record, ...prev]);
      setUrlInput('');
      showToast('Yükleme tamamlandı!');
    } catch {
      showToast('Bir hata oluştu.', 'error');
    } finally {
      setIsUploadingUrl(false);
    }
  }

  function handleResultDeleted(id: string) {
    setResults((prev) => prev.filter((r) => r.id !== id));
  }

  const hasPendingFiles = queue.some((item) => item.status === 'bekliyor');

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-navy sm:text-3xl">Görsel Yükle</h1>
        <p className="mt-2 text-sm text-slate-500">
          Görsellerini yükle, paylaşım linkini saniyeler içinde oluştur.
        </p>
      </div>

      <Dropzone onFilesSelected={addFiles} />

      <div className="mt-4 text-center">
        <button
          onClick={() => setShowUrlUpload((v) => !v)}
          className="text-sm font-medium text-brand-600 hover:underline"
        >
          URL'den yükle
        </button>
      </div>

      {showUrlUpload && (
        <div className="mt-4 flex flex-col gap-3 rounded-lg border border-line p-4 sm:flex-row sm:items-end">
          <div className="flex-1">
            <TextField
              label="Görsel URL'i"
              placeholder="https://example.com/image.jpg"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
            />
          </div>
          <Button onClick={handleUrlUpload} isLoading={isUploadingUrl} className="sm:mb-0.5">
            URL'den Yükle
          </Button>
        </div>
      )}

      <div className="mt-8 grid gap-5 rounded-lg border border-line bg-mist p-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="retention" className="text-sm font-medium text-ink">
            Saklama Süresi
          </label>
          <select
            id="retention"
            value={retention}
            onChange={(e) => setRetention(e.target.value as RetentionPeriod)}
            className="rounded-md border border-line bg-white px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          >
            {RETENTION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="password-toggle" className="text-sm font-medium text-ink">
              Şifre koruması
            </label>
            <button
              id="password-toggle"
              role="switch"
              aria-checked={passwordEnabled}
              onClick={() => setPasswordEnabled((v) => !v)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                passwordEnabled ? 'bg-brand-500' : 'bg-slate-300'
              }`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                  passwordEnabled ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
          {passwordEnabled && (
            <input
              type="password"
              placeholder="Şifre belirle"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md border border-line bg-white px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          )}
        </div>
      </div>

      {queue.length > 0 && (
        <div className="mt-6 flex flex-col gap-3">
          {queue.map((item) => (
            <UploadQueueItem key={item.localId} item={item} onRemove={removeFromQueue} />
          ))}
          {hasPendingFiles && (
            <Button size="lg" onClick={handleUploadAll} className="mt-2">
              Yükle
            </Button>
          )}
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-4 text-lg font-semibold text-navy">Yükleme tamamlandı!</h2>
          <div className="flex flex-col gap-3">
            {results.map((image) => (
              <UploadResultCard key={image.id} image={image} onDeleted={handleResultDeleted} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
