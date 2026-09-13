import React, { useState } from 'react';
import TextField from './TextField';
import Button from './Button';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsSubmitting(false);
    setIsSent(true);
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-14 sm:px-6">
      <h1 className="text-2xl font-bold text-navy">İletişim</h1>
      <p className="mt-2 text-sm text-slate-500">Sorunun mu var? Bize aşağıdaki formdan ulaşabilirsin.</p>

      {isSent ? (
        <div className="mt-8 rounded-md border border-brand-200 bg-brand-50 p-5 text-sm text-navy">
          <strong className="font-semibold">Mesajın gönderildi.</strong>
          <p className="mt-1 text-slate-600">En kısa sürede sana geri dönüş yapacağız.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <TextField label="Ad" required value={name} onChange={(e) => setName(e.target.value)} />
          <TextField
            label="E-posta"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField label="Konu" required value={subject} onChange={(e) => setSubject(e.target.value)} />
          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="text-sm font-medium text-ink">
              Mesaj
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="resize-none rounded-md border border-line px-3.5 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </div>
          <Button type="submit" isLoading={isSubmitting} fullWidth size="lg">
            Mesaj Gönder
          </Button>
        </form>
      )}
    </div>
  );
}
