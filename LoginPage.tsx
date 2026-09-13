import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import TextField from './TextField';
import Button from './Button';
import { useAuth } from './useAuth';
import { useToast } from './useToast';
import { AuthServiceError } from './authService';

export default function LoginPage() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    try {
      await login({ email, password, rememberMe });
      showToast('Giriş başarılı.');
      const redirectTo = (location.state as { from?: string })?.from || '/gorsellerim';
      navigate(redirectTo);
    } catch (err) {
      setError(err instanceof AuthServiceError ? err.message : 'Bir hata oluştu.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-bold text-navy">Giriş Yap</h1>
      <p className="mt-1.5 text-sm text-slate-500">Hesabına giriş yaparak görsellerini yönet.</p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        <TextField
          label="E-posta"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ornek@eposta.com"
        />
        <TextField
          label="Şifre"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          error={error}
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-line text-brand-500 focus:ring-brand-300"
            />
            Beni hatırla
          </label>
          <Link to="/sifremi-unuttum" className="text-sm font-medium text-brand-600 hover:underline">
            Şifremi unuttum?
          </Link>
        </div>

        <Button type="submit" fullWidth size="lg" isLoading={isSubmitting}>
          Giriş Yap
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Hesabın yok mu?{' '}
        <Link to="/kayit" className="font-medium text-brand-600 hover:underline">
          Kayıt ol
        </Link>
      </p>
    </div>
  );
}
