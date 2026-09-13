import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { imageService } from './imageService';
import { ImageRecord } from './types';
import { useAuth } from './useAuth';
import Button from './Button';
import MyImageCard from './MyImageCard';

export default function MyImagesPage() {
  const { user } = useAuth();
  const [images, setImages] = useState<ImageRecord[]>([]);

  useEffect(() => {
    if (user) setImages(imageService.getByOwner(user.id));
  }, [user]);

  function handleDeleted(id: string) {
    setImages((prev) => prev.filter((img) => img.id !== id));
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-navy">Görsellerim</h1>
          <p className="mt-1 text-sm text-slate-500">Yüklediğin tüm görselleri buradan yönetebilirsin.</p>
        </div>
        <Link to="/yukle">
          <Button>Görsel Yükle</Button>
        </Link>
      </div>

      {images.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-line bg-mist px-6 py-20 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-2xl">
            🖼️
          </div>
          <p className="text-base font-medium text-navy">Henüz bir görsel yüklemedin.</p>
          <Link to="/yukle" className="mt-5">
            <Button>İlk Görselini Yükle</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {images.map((image) => (
            <MyImageCard key={image.id} image={image} onDeleted={handleDeleted} />
          ))}
        </div>
      )}
    </div>
  );
}
