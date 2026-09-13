import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-4 text-center">
      <span className="font-display text-6xl font-bold text-brand-200">404</span>
      <h1 className="mt-4 text-xl font-bold text-navy">Aradığın sayfayı bulamadık.</h1>
      <p className="mt-2 max-w-sm text-sm text-slate-500">
        Yazdığın adres yanlış olabilir ya da bu sayfa artık mevcut değil.
      </p>
      <Link to="/anasayfa" className="mt-6">
        <Button>Ana Sayfaya Dön</Button>
      </Link>
    </div>
  );
}
