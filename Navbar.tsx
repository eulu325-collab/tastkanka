import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from './Logo';
import Button from './Button';
import { useAuth } from './useAuth';

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `text-sm font-medium transition-colors ${isActive ? 'text-brand-600' : 'text-ink hover:text-brand-600'}`;

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate('/anasayfa');
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-7 md:flex">
          <NavLink to="/anasayfa" className={navLinkClass}>Ana Sayfa</NavLink>
          <NavLink to="/yukle" className={navLinkClass}>Görsel Yükle</NavLink>
          <NavLink to="/yardim" className={navLinkClass}>Yardım</NavLink>
          {user && <NavLink to="/gorsellerim" className={navLinkClass}>Görsellerim</NavLink>}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <NavLink
                to="/profil"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-700"
              >
                {user.username.charAt(0).toUpperCase()}
              </NavLink>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                Çıkış Yap
              </Button>
            </>
          ) : (
            <>
              <NavLink to="/giris">
                <Button variant="ghost" size="sm">Giriş Yap</Button>
              </NavLink>
              <NavLink to="/kayit">
                <Button variant="primary" size="sm">Kayıt Ol</Button>
              </NavLink>
            </>
          )}
        </div>

        <button
          className="flex h-10 w-10 items-center justify-center rounded-md text-navy md:hidden"
          aria-label="Menüyü aç"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-line bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            <NavLink to="/anasayfa" className={navLinkClass} onClick={() => setMenuOpen(false)}>Ana Sayfa</NavLink>
            <NavLink to="/yukle" className={navLinkClass} onClick={() => setMenuOpen(false)}>Görsel Yükle</NavLink>
            <NavLink to="/yardim" className={navLinkClass} onClick={() => setMenuOpen(false)}>Yardım</NavLink>
            {user && (
              <NavLink to="/gorsellerim" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                Görsellerim
              </NavLink>
            )}
            <div className="mt-2 flex flex-col gap-2 border-t border-line pt-4">
              {user ? (
                <>
                  <NavLink to="/profil" className={navLinkClass} onClick={() => setMenuOpen(false)}>
                    Profil ({user.username})
                  </NavLink>
                  <Button variant="secondary" size="sm" onClick={handleLogout}>Çıkış Yap</Button>
                </>
              ) : (
                <>
                  <NavLink to="/giris" onClick={() => setMenuOpen(false)}>
                    <Button variant="secondary" size="sm" fullWidth>Giriş Yap</Button>
                  </NavLink>
                  <NavLink to="/kayit" onClick={() => setMenuOpen(false)}>
                    <Button variant="primary" size="sm" fullWidth>Kayıt Ol</Button>
                  </NavLink>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
