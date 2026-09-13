// Tüm localStorage anahtarları tek yerden yönetilir.
// Gerçek bir backend'e geçişte bu servis katmanı fetch/axios
// çağrılarıyla değiştirilebilir; component'ler etkilenmez.
export const STORAGE_KEYS = {
  USERS: 'resimlink_users',
  SESSION: 'resimlink_session',
  IMAGES: 'resimlink_images',
} as const;
