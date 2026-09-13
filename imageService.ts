import { ImageRecord, RetentionPeriod } from './types';
import { STORAGE_KEYS } from './storageKeys';
import { generateShortId } from './id';
import { demoHash } from './hash';

// Mock görsel deposu. Gerçek backend entegrasyonunda `dataUrl` yerine
// bir CDN/obje depolama URL'i dönecek şekilde uyarlanabilir; upload
// fonksiyonu FormData ile bir /api/upload endpoint'ine POST edebilir.

function readImages(): ImageRecord[] {
  const raw = localStorage.getItem(STORAGE_KEYS.IMAGES);
  return raw ? (JSON.parse(raw) as ImageRecord[]) : [];
}

function writeImages(images: ImageRecord[]): void {
  localStorage.setItem(STORAGE_KEYS.IMAGES, JSON.stringify(images));
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export interface UploadOptions {
  ownerId: string | null;
  retention: RetentionPeriod;
  password?: string;
  onProgress?: (percent: number) => void;
}

export const imageService = {
  async uploadFile(file: File, options: UploadOptions): Promise<ImageRecord> {
    // Gerçekçi bir ilerleme çubuğu simülasyonu.
    const steps = [15, 35, 55, 75, 92, 100];
    for (const step of steps) {
      await new Promise((r) => setTimeout(r, 90 + Math.random() * 90));
      options.onProgress?.(step);
    }
    const dataUrl = await fileToDataUrl(file);
    const record: ImageRecord = {
      id: generateShortId(),
      ownerId: options.ownerId,
      fileName: file.name,
      sizeBytes: file.size,
      mimeType: file.type,
      dataUrl,
      uploadedAt: new Date().toISOString(),
      retention: options.retention,
      passwordProtected: Boolean(options.password),
      password: options.password ? demoHash(options.password) : undefined,
      views: 0,
    };
    const images = readImages();
    images.unshift(record);
    writeImages(images);
    return record;
  },

  async uploadFromUrl(url: string, options: UploadOptions): Promise<ImageRecord> {
    const steps = [20, 45, 70, 100];
    for (const step of steps) {
      await new Promise((r) => setTimeout(r, 100));
      options.onProgress?.(step);
    }
    const fileName = url.split('/').pop() || 'gorsel.jpg';
    const record: ImageRecord = {
      id: generateShortId(),
      ownerId: options.ownerId,
      fileName,
      sizeBytes: 0,
      mimeType: 'image/*',
      dataUrl: url,
      uploadedAt: new Date().toISOString(),
      retention: options.retention,
      passwordProtected: Boolean(options.password),
      password: options.password ? demoHash(options.password) : undefined,
      views: 0,
    };
    const images = readImages();
    images.unshift(record);
    writeImages(images);
    return record;
  },

  getById(id: string): ImageRecord | null {
    return readImages().find((img) => img.id === id) ?? null;
  },

  getByOwner(ownerId: string): ImageRecord[] {
    return readImages()
      .filter((img) => img.ownerId === ownerId)
      .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());
  },

  verifyPassword(id: string, password: string): boolean {
    const image = this.getById(id);
    if (!image || !image.passwordProtected) return true;
    return image.password === demoHash(password);
  },

  registerView(id: string): void {
    const images = readImages();
    const idx = images.findIndex((img) => img.id === id);
    if (idx !== -1) {
      images[idx].views += 1;
      writeImages(images);
    }
  },

  delete(id: string): void {
    const images = readImages().filter((img) => img.id !== id);
    writeImages(images);
  },
};
