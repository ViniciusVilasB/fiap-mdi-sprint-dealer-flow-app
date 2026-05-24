export const logger = {
  // Log para warn
  warn: (message, error = null) => {
    if (__DEV__) {
      console.warn(`[WARN] ${message}`, error ? error : '');
    } else {
      console.warn(`[WARN] ${message}`);
    }
  },

  // Log para error
  error: (message, error = null) => {
    if (__DEV__) {
      console.error(`[ERROR] ${message}`, error ? error : '');
    } else {
      // Em produção, silenciamos o erro técnico
      console.error(`[ERROR] ${message}`);
    }
  },

  // Log para info
  info: (message, data = '') => {
    if (__DEV__) {
      console.log(`[INFO] ${message}`, data);
    }
  }
};