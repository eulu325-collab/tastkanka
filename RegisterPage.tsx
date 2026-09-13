import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TextField from './TextField';
import Button from './Button';
import { useAuth } from './useAuth';
import { useToast } from './useToast';
import { AuthServiceError } from './authService';

export default function RegisterPage() {
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (username.trim().length < 3) next.username = 'Kullanıcı adı en az 3 karakter olmalı.';
    if (!email.includes('@')) next.email = 'Geçerli bir e-posta adresi gir.';
    if (password.length < 6) next.password = 'Şifre en az 6 karakter olmalı.';
    if (password !== confirmPassword) next.confirmPassword = 'Şifreler eşleşmiyor.';
    if (!acceptedTerms) next.terms = 'Devam etmek için kullanım koşullarını kabul et.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await register({ username, email, password });
      showToast('Hesabın oluşturuldu.');
      navigate('/yukle');
    } catch (err) {
      setErrors({ email: err instanceof AuthServiceError ? err.message : 'Bir hata oluştu.' });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-bold text-navy">Kayıt Ol</h1>
      <p className="mt-1.5 text-sm text-slate-500">Ücretsiz hesap oluştur, görsellerini yönet.</p>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        <TextField
          label="Kullanıcı adı"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={errors.username}
          placeholder="kullaniciadi"
        />
        <TextField
          label="E-posta"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
          placeholder="ornek@eposta.com"
        />
        <TextField
          label="Şifre"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
          placeholder="En az 6 karakter"
        />
        <TextField
          label="Şifre tekrar"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errors.confirmPassword}
          placeholder="••••••••"
        />

        <div>
          <label className="flex items-start gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-line text-brand-500 focus:ring-brand-300"
            />
            <span>
              <Link to="/kurallar" className="font-medium text-brand-600 hover:underline">
                Kullanım koşullarını
              </Link>{' '}
              kabul ediyorum.
            </span>
          </label>
          {errors.terms && <p className="mt-1 text-xs font-medium text-red-600">{errors.terms}</p>}
        </div>

        <Button type="submit" fullWidth size="lg" isLoading={isSubmitting}>
          Kayıt Ol
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-500">
        Zaten hesabın var mı?{' '}
        <Link to="/giris" className="font-medium text-brand-600 hover:underline">
          Giriş yap
        </Link>
      </p>
    </div>
  );
}
