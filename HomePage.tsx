import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

const FEATURES = [
  {
    title: 'Hızlı',
    desc: 'Görselini seç, saniyeler içinde paylaşım linkine kavuş.',
    icon: (
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    title: 'Kolay',
    desc: 'Sürükle-bırak veya dosya seç, karmaşık ayar gerekmez.',
    icon: <path d="M12 4v12m0 0-4-4m4 4 4-4M4 18h16" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    title: 'Güvenli',
    desc: 'İstersen şifre koru, istersen saklama süresini sen belirle.',
    icon: (
      <path
        d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

const STEPS = [
  { n: '01', title: 'Görselini seç', desc: 'Bilgisayarından veya telefonundan bir görsel seç.' },
  { n: '02', title: 'Yükle', desc: 'Sürükle-bırak ile veya dosya seçerek yükle.' },
  { n: '03', title: 'Linkini al', desc: 'Sistemin oluşturduğu benzersiz linki kopyala.' },
  { n: '04', title: 'Paylaş', desc: 'İstediğin platformda, istediğin kişiyle paylaş.' },
];

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-brand-50 to-white px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold leading-tight text-navy sm:text-5xl">
            Resmini yükle.
            <br />
            Linkini paylaş.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-slate-600">
            Görsellerini saniyeler içinde yükle, paylaşım bağlantını oluştur ve istediğin yerde kullan.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/yukle">
              <Button size="lg">Görsel Yükle</Button>
            </Link>
            <a href="#nasil-calisir">
              <Button size="lg" variant="secondary">Nasıl Çalışır?</Button>
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-lg border border-line p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {f.icon}
                </svg>
              </div>
              <h3 className="mb-1.5 text-base font-semibold text-navy">{f.title}</h3>
              <p className="text-sm text-slate-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="nasil-calisir" className="border-t border-line bg-mist px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-2xl font-bold text-navy sm:text-3xl">Nasıl çalışır?</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <div key={step.n}>
                <span className="font-display text-3xl font-bold text-brand-200">{step.n}</span>
                <h3 className="mt-2 text-base font-semibold text-navy">{step.title}</h3>
                <p className="mt-1 text-sm text-slate-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-6 rounded-xl bg-navy px-8 py-12 text-center sm:flex-row sm:text-left">
          <div>
            <h3 className="text-xl font-bold text-white">Hemen ücretsiz bir görsel yükle.</h3>
            <p className="mt-1 text-sm text-brand-100">Hesap oluşturmadan da deneyebilirsin.</p>
          </div>
          <Link to="/yukle">
            <Button size="lg" className="!bg-white !text-navy hover:!bg-brand-50">
              Görsel Yükle
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
