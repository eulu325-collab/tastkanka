import React from 'react';
import { Outlet } from 'react-router-dom';
import Logo from './Logo';

export default function BareLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-mist">
      <header className="border-b border-line bg-white px-4 py-4 sm:px-6">
        <Logo />
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <Outlet />
      </main>
      <footer className="px-4 py-6 text-center text-xs text-slate-400">
        © 2026 ResimLink. Tüm hakları saklıdır.
      </footer>
    </div>
  );
}
