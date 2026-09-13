import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6">
      <h1 className="text-2xl font-bold text-navy sm:text-3xl">Hakkımızda</h1>
      <p className="mt-5 text-base leading-relaxed text-slate-600">
        ResimLink, görsellerini hızlı, basit ve kolay bir şekilde paylaşman için oluşturuldu.
        Karmaşık ayarlarla uğraşmadan bir görsel seç, yükle ve linkini paylaş — hepsi bu kadar.
      </p>
      <p className="mt-4 text-base leading-relaxed text-slate-600">
        İster tek bir fotoğrafı bir arkadaşınla paylaşmak, ister bir tasarım dosyasını ekibinle
        senkronize etmek olsun, ResimLink her zaman hızlı ve güvenilir bir bağlantı oluşturur.
      </p>
      <Link to="/yukle" className="mt-8 inline-block">
        <Button size="lg">Görsel Yükle</Button>
      </Link>
    </div>
  );
}
