import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { useToast } from './useToast';
import { imageService } from './imageService';
import { authService, AuthServiceError } from './authService';
import { formatDate } from './format';
import TextField from './TextField';
import Button from './Button';

export default function ProfilePage() {
  const { user, logout, refreshUser } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const stats = useMemo(() => {
    if (!user) return { totalImages: 0, totalViews: 0 };
    const images = imageService.getByOwner(user.id);
    return {
      totalImages: images.length,
      totalViews: images.reduce((sum, img) => sum + img.views, 0),
    };
  }, [user]);

  const [username, setUsername] = useState(user?.username ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);

  if (!user) return null;

  async function handleProfileSave(e: React.FormEvent) {
    e.preventDefault();
    setIsSavingProfile(true);
    try {
      await authService.updateProfile(user!.id, { username, email });
      refreshUser();
      showToast('Profil bilgilerin güncellendi.');
    } catch {
      showToast('Bir hata oluştu.', 'error');
    } finally {
      setIsSavingProfile(false);
    }
  }

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setPasswordError('');
    setIsSavingPassword(true);
    try {
      await authService.changePassword(user!.id, currentPassword, newPassword);
      setCurrentPassword('');
      setNewPassword('');
      showToast('Şifren güncellendi.');
    } catch (err) {
      setPasswordError(err instanceof AuthServiceError ? err.message : 'Bir hata oluştu.');
    } finally {
      setIsSavingPassword(false);
    }
  }

  function handleLogout() {
    logout();
    navigate('/anasayfa');
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-100 text-2xl font-semibold text-brand-700">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-xl font-bold text-navy">{user.username}</h1>
          <p className="text-sm text-slate-500">{user.email}</p>
        </div>
      </div>

      <div className="mb-10 grid grid-cols-3 gap-4">
        <div className="rounded-lg border border-line p-4 text-center">
          <p className="text-2xl font-bold text-navy">{stats.totalImages}</p>
          <p className="mt-1 text-xs text-slate-500">Toplam Görsel</p>
        </div>
        <div className="rounded-lg border border-line p-4 text-center">
          <p className="text-2xl font-bold text-navy">{stats.totalViews}</p>
          <p className="mt-1 text-xs text-slate-500">Toplam Görüntülenme</p>
        </div>
        <div className="rounded-lg border border-line p-4 text-center">
          <p className="text-2xl font-bold text-navy">{formatDate(user.createdAt)}</p>
          <p className="mt-1 text-xs text-slate-500">Kayıt Tarihi</p>
        </div>
      </div>

      <div className="flex flex-col gap-10">
        <section>
          <h2 className="mb-4 text-base font-semibold text-navy">Profil bilgilerini düzenle</h2>
          <form onSubmit={handleProfileSave} className="flex flex-col gap-4 sm:max-w-sm">
            <TextField label="Kullanıcı adı" value={username} onChange={(e) => setUsername(e.target.value)} />
            <TextField label="E-posta" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button type="submit" isLoading={isSavingProfile} className="self-start">
              Kaydet
            </Button>
          </form>
        </section>

        <section className="border-t border-line pt-8">
          <h2 className="mb-4 text-base font-semibold text-navy">Şifre değiştir</h2>
          <form onSubmit={handlePasswordChange} className="flex flex-col gap-4 sm:max-w-sm">
            <TextField
              label="Mevcut şifre"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              error={passwordError}
            />
            <TextField
              label="Yeni şifre"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button type="submit" isLoading={isSavingPassword} className="self-start">
              Şifreyi Güncelle
            </Button>
          </form>
        </section>

        <section className="border-t border-line pt-8">
          <Button variant="danger" onClick={handleLogout}>
            Çıkış Yap
          </Button>
        </section>
      </div>
    </div>
  );
}
