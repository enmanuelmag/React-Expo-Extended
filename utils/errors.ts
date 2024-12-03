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
  ERROR_GETTING_BUDGETS: {
    code: 'ERROR_GETTING_BUDGETS',
    message: 'Error getting budgets',
  },
  ERROR_GETTING_BUDGET: {
    code: 'ERROR_GETTING_BUDGET',
    message: 'Error getting budget',
  },
  ERROR_BUDGET_NOT_FOUND: {
    code: 'ERROR_BUDGET_NOT_FOUND',
    message: 'Budget not found',
  },
  ERROR_CREATING_BUDGET: {
    code: 'ERROR_CREATING_BUDGET',
    message: 'Error creating budget',
  },
  ERROR_UPDATING_BUDGET: {
    code: 'ERROR_UPDATING_BUDGET',
    message: 'Error updating budget',
  },
  ERROR_TOGGLE_EVENT_COMPLETED: {
    code: 'ERROR_TOGGLE_EVENT_COMPLETED',
    message: 'Error toggle event completed',
  },
  ERROR_TOGGLE_EVENT_BALANCE: {
    code: 'ERROR_TOGGLE_EVENT_BALANCE',
    message: 'Error toggle event balance',
  },
  ERROR_DELETING_BUDGET: {
    code: 'ERROR_DELETING_BUDGET',
    message: 'Error deleting budget',
  },
  ERROR_GETTING_CATEGORIES: {
    code: 'ERROR_GETTING_CATEGORIES',
    message: 'Error getting categories',
  },
  ERROR_CREATING_CATEGORY: {
    code: 'ERROR_CREATING_CATEGORY',
    message: 'Error creating category',
  },
  ERROR_UPDATING_CATEGORY: {
    code: 'ERROR_UPDATING_CATEGORY',
    message: 'Error updating category',
  },
  ERROR_DELETING_CATEGORY: {
    code: 'ERROR_DELETING_CATEGORY',
    message: 'Error deleting category',
  },
  ERROR_GETTING_CHARGES: {
    code: 'ERROR_GETTING_CHARGES',
    message: 'Error getting charges',
  },
  ERROR_CREATING_CHARGE: {
    code: 'ERROR_CREATING_CHARGE',
    message: 'Error creating charge',
  },
  ERROR_UPDATING_CHARGE: {
    code: 'ERROR_UPDATING_CHARGE',
    message: 'Error updating charge',
  },
  ERROR_DELETING_CHARGE: {
    code: 'ERROR_DELETING_CHARGE',
    message: 'Error deleting charge',
  },
  ERROR_GETTING_CHARGE: {
    code: 'ERROR_GETTING_CHARGE',
    message: 'Error getting charge',
  },
  ERROR_GETTING_CHARGE_SCHEDULE: {
    code: 'ERROR_GETTING_CHARGE_SCHEDULE',
    message: 'Error getting charge schedule',
  },
  ERROR_GETTING_PAYMENTS: {
    code: 'ERROR_GETTING_PAYMENTS',
    message: 'Error getting payments',
  },
  ERROR_CREATING_PAYMENT: {
    code: 'ERROR_CREATING_PAYMENT',
    message: 'Error creating payment',
  },
  ERROR_UPDATING_PAYMENT: {
    code: 'ERROR_UPDATING_PAYMENT',
    message: 'Error updating payment',
  },
  ERROR_DELETING_PAYMENT: {
    code: 'ERROR_DELETING_PAYMENT',
    message: 'Error deleting payment',
  },
  ERROR_GETTING_PAYMENT: {
    code: 'ERROR_GETTING_PAYMENT',
    message: 'Error getting payment',
  },
  ERROR_GETTING_DEBTORS: {
    code: 'ERROR_GETTING_DEBTORS',
    message: 'Error getting debtors',
  },
  ERROR_CREATING_DEBTOR: {
    code: 'ERROR_CREATING_DEBTOR',
    message: 'Error creating debtor',
  },
  ERROR_UPDATING_DEBTOR: {
    code: 'ERROR_UPDATING_DEBTOR',
    message: 'Error updating debtor',
  },
  ERROR_DELETING_DEBTOR: {
    code: 'ERROR_DELETING_DEBTOR',
    message: 'Error deleting debtor',
  },
  ERROR_GETTING_DEBTOR: {
    code: 'ERROR_GETTING_DEBTOR',
    message: 'Error getting debtor',
  },
  ERROR_CHARGE_NOT_FOUND: {
    code: 'ERROR_CHARGE_NOT_FOUND',
    message: 'Charge not found',
  },
  ERROR_DEBTOR_NOT_FOUND: {
    code: 'ERROR_DEBTOR_NOT_FOUND',
    message: 'Debtor not found',
  },
  ERROR_CATEGORY_NOT_FOUND: {
    code: 'ERROR_CATEGORY_NOT_FOUND',
    message: 'Category not found',
  },
  ERROR_DELETING_EVENT: {
    code: 'ERROR_DELETING_EVENT',
    message: 'Error deleting event',
  },
  ERROR_BULK_TOGGLE_EVENT_BALANCE: {
    code: 'ERROR_BULK_TOGGLE_EVENT_BALANCE',
    message: 'Error bulk toggle event balance',
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
