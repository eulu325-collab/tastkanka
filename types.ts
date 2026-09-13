export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export type RetentionPeriod = '1g' | '7g' | '30g' | '90g' | 'suresiz';

export interface ImageRecord {
  id: string;
  ownerId: string | null;
  fileName: string;
  sizeBytes: number;
  mimeType: string;
  dataUrl: string;
  uploadedAt: string;
  retention: RetentionPeriod;
  passwordProtected: boolean;
  password?: string;
  views: number;
}

export interface AuthSession {
  userId: string;
  rememberMe: boolean;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  text: string;
}
