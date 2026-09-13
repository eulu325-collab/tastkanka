import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const COLUMNS: { title: string; links: { label: string; to: string }[] }[] = [
  {
    title: 'Ürün',
    links: [
      { label: 'Görsel Yükle', to: '/yukle' },
      { label: 'Görsellerim', to: '/gorsellerim' },
    ],
  },
  {
    title: 'Şirket',
    links: [
      { label: 'Hakkımızda', to: '/hakkimizda' },
      { label: 'İletişim', to: '/iletisim' },
    ],
  },
  {
    title: 'Yasal',
    links: [
      { label: 'Kurallar', to: '/kurallar' },
      { label: 'Gizlilik', to: '/gizlilik' },
    ],
  },
  {
    title: 'Yardım',
    links: [{ label: 'Yardım Merkezi', to: '/yardim' }],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-mist">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-5">
          <div className="col-span-2 sm:col-span-1">
            <Logo />
            <p className="mt-3 max-w-[220px] text-sm text-slate-500">
              Görsellerini saniyeler içinde yükle, linkini paylaş.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3 text-sm font-semibold text-navy">{col.title}</h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="text-sm text-slate-500 hover:text-brand-600">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-line pt-6 text-sm text-slate-400">
          © 2026 ResimLink. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
