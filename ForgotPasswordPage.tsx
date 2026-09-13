import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import TextField from './TextField';
import Button from './Button';
import { authService } from './authService';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    await authService.requestPasswordReset(email);
    setIsSubmitting(false);
    setIsSent(true);
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <h1 className="text-2xl font-bold text-navy">Şifremi Unuttum</h1>
      <p className="mt-1.5 text-sm text-slate-500">
        E-posta adresini gir, sana şifre sıfırlama linki gönderelim.
      </p>

      {isSent ? (
        <div className="mt-8 rounded-md border border-brand-200 bg-brand-50 p-5 text-sm text-navy">
          <strong className="font-semibold">E-posta gönderildi.</strong>
          <p className="mt-1 text-slate-600">
            {email} adresine bir şifre sıfırlama linki gönderdik. Gelen kutunu kontrol et.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <TextField
            label="E-posta"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ornek@eposta.com"
          />
          <Button type="submit" fullWidth size="lg" isLoading={isSubmitting}>
            Şifre Sıfırlama Linki Gönder
          </Button>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-slate-500">
        <Link to="/giris" className="font-medium text-brand-600 hover:underline">
          Giriş sayfasına dön
        </Link>
      </p>
    </div>
  );
}
