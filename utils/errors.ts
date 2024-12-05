export const ErrorCodes = {
  ERROR_LOCAL_AUTH: {
    code: 'ERROR_LOCAL_AUTH',
    message: 'Error authenticating locally',
  },
  ERROR_LOCAL_AUTH_INVALID: {
    code: 'ERROR_LOCAL_AUTH_INVALID',
    message: 'Biomeric authentication invalid',
  },
  ERROR_LOCAL_AUTH_CANCELLED: {
    code: 'ERROR_LOCAL_AUTH_CANCELLED',
    message: 'Biomeric authentication cancelled',
  },
  ERROR_NO_ENROLLED_AUTH: {
    code: 'ERROR_NO_ENROLLED_AUTH',
    message: 'There is no biometric data on this device',
  },
  ERROR_GETTING_USER_SECRET: {
    code: 'ERROR_GETTING_USER_SECRET',
    message: 'Error getting user secret, try manually login',
  },
  ERROR_INIT_FIREBASE: {
    code: 'ERROR_INIT_FIREBASE',
    message: 'Error initializing Firebase',
  },
  ERROR_GETTING_FILE: {
    code: 'ERROR_GETTING_FILE',
    message: 'Error getting file',
  },
  ERROR_LOGIN_ANONYMOUSLY: {
    code: 'ERROR_LOGIN_ANONYMOUSLY',
    message: 'Error login anonymously',
  },
  ERROR_LOGIN_WITH_APPLE: {
    code: 'ERROR_LOGIN_WITH_APPLE',
    message: 'Error login with Apple',
  },
  ERROR_GETTING_ID_TOKEN: {
    code: 'ERROR_GETTING_ID_TOKEN',
    message: 'Error getting id token',
  },
  ERROR_SESSION_EXPIRED: {
    code: 'ERROR_SESSION_EXPIRED',
    message: 'Session expired',
  },
  ERROR_USER_NOT_FOUND: {
    code: 'ERROR_USER_NOT_FOUND',
    message: 'User not found on app',
  },
  ERROR_INVALID_CREDENTIAL: {
    code: 'ERROR_INVALID_CREDENTIAL',
    message: 'Invalid credentials',
  },
  ERROR_DELETING_ACCOUNT: {
    code: 'ERROR_DELETING_ACCOUNT',
    message: 'Error deleting account',
  },
  ERROR_GETTING_USER: {
    code: 'ERROR_GETTING_USER',
    message: 'Error getting user from Firebase',
  },
  ERROR_NOT_FIRST_SIGN_IN: {
    code: 'ERROR_NOT_FIRST_SIGN_IN',
    message: 'A firt sign in is required to use biometrics',
  },
  ERROR_LOGIN_WITH_GOOGLE: {
    code: 'ERROR_LOGIN_WITH_GOOGLE',
    message: 'Error login with Google',
  },
  ERROR_LOGIN_WITH_EMAIL_AND_PASSWORD: {
    code: 'ERROR_LOGIN_WITH_EMAIL_AND_PASSWORD',
    message: 'Error login with email and password',
  },
  ERROR_REGISTER_WITH_EMAIL_AND_PASSWORD: {
    code: 'ERROR_REGISTER_WITH_EMAIL_AND_PASSWORD',
    message: 'Error register with email and password',
  },
  ERROR_EVENT_NOT_FOUND: {
    code: 'ERROR_EVENT_NOT_FOUND',
    message: 'Event not found',
  },
  ERROR_LOGOUT: {
    code: 'ERROR_LOGOUT',
    message: 'Error logout',
  },
  ERROR_GETTING_POKEMONS: {
    code: 'ERROR_GETTING_POKEMONS',
    message: 'Error getting pokemons',
  },
  ERROR_GETTING_POKEMON_DETAIL: {
    code: 'ERROR_GETTING_POKEMON_DETAIL',
    message: 'Error getting pokemon detail',
  },
};

export class ErrorService extends Error {
  code: string;
  message: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
    this.message = message;
  }

  static getMessageFromCode(code: string) {
    return ErrorCodes[code as keyof typeof ErrorCodes].message || 'Error desconocido';
  }

  static getErrorFromCode(error: (typeof ErrorCodes)[keyof typeof ErrorCodes]) {
    return new ErrorService(error.code, error.message);
  }
}
