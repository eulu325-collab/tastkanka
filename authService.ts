import { AuthSession, User } from './types';
import { STORAGE_KEYS } from './storageKeys';
import { generateUuid } from './id';
import { demoHash } from './hash';

// NOT: Bu servis şu anda localStorage üzerinde çalışan bir mock
// implementasyondur. Gerçek bir backend bağlanacağı zaman bu
// fonksiyonların içi fetch('/api/...') çağrılarıyla değiştirilebilir;
// dışa açılan fonksiyon imzaları (Promise tabanlı) aynı kalabilir.

function readUsers(): User[] {
  const raw = localStorage.getItem(STORAGE_KEYS.USERS);
  return raw ? (JSON.parse(raw) as User[]) : [];
}

function writeUsers(users: User[]): void {
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

function readSession(): AuthSession | null {
  const raw = localStorage.getItem(STORAGE_KEYS.SESSION);
  return raw ? (JSON.parse(raw) as AuthSession) : null;
}

export interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
  rememberMe: boolean;
}

class AuthServiceError extends Error {}

export const authService = {
  async register(input: RegisterInput): Promise<User> {
    await simulateLatency();
    const users = readUsers();
    if (users.some((u) => u.email.toLowerCase() === input.email.toLowerCase())) {
      throw new AuthServiceError('Bu e-posta adresi zaten kayıtlı.');
    }
    const newUser: User = {
      id: generateUuid(),
      username: input.username,
      email: input.email,
      passwordHash: demoHash(input.password),
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    writeUsers(users);
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify({ userId: newUser.id, rememberMe: true }));
    return newUser;
  },

  async login(input: LoginInput): Promise<User> {
    await simulateLatency();
    const users = readUsers();
    const user = users.find((u) => u.email.toLowerCase() === input.email.toLowerCase());
    if (!user || user.passwordHash !== demoHash(input.password)) {
      throw new AuthServiceError('E-posta veya şifre hatalı.');
    }
    localStorage.setItem(
      STORAGE_KEYS.SESSION,
      JSON.stringify({ userId: user.id, rememberMe: input.rememberMe })
    );
    return user;
  },

  logout(): void {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
  },

  getCurrentUser(): User | null {
    const session = readSession();
    if (!session) return null;
    const users = readUsers();
    return users.find((u) => u.id === session.userId) ?? null;
  },

  async requestPasswordReset(email: string): Promise<void> {
    await simulateLatency();
    // Demo ortamında gerçek e-posta gönderimi yapılmaz; başarı simüle edilir.
    return;
  },

  async updateProfile(userId: string, updates: Partial<Pick<User, 'username' | 'email'>>): Promise<User> {
    await simulateLatency();
    const users = readUsers();
    const idx = users.findIndex((u) => u.id === userId);
    if (idx === -1) throw new AuthServiceError('Kullanıcı bulunamadı.');
    users[idx] = { ...users[idx], ...updates };
    writeUsers(users);
    return users[idx];
  },

  async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    await simulateLatency();
    const users = readUsers();
    const idx = users.findIndex((u) => u.id === userId);
    if (idx === -1) throw new AuthServiceError('Kullanıcı bulunamadı.');
    if (users[idx].passwordHash !== demoHash(currentPassword)) {
      throw new AuthServiceError('Mevcut şifre yanlış.');
    }
    users[idx].passwordHash = demoHash(newPassword);
    writeUsers(users);
  },
};

function simulateLatency(ms = 500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export { AuthServiceError };
