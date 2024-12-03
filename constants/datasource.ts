export type AuthMethodType = 'email' | 'google' | 'apple' | 'anonymous';

export const AUTH_METHODS: Record<string, AuthMethodType> = {
  email: 'email',
  google: 'google',
  apple: 'apple',
  anonymous: 'anonymous',
};

export const AUTH_METHOD_KEY = 'auth-method';

export const CHECK_BIOMETRIC = 'check-biometric';

export const FIREBASE_ID_TOKEN = 'firebase-id-token';

export const SECRET_EMAIL = 'secret-email';

export const SECRET_PASSWORD = 'secret-password';

export const USERS_COLLECTION = 'users-v3';
