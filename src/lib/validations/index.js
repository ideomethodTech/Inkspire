// Form Validations
// Add validation schemas here (e.g., using zod, yup, etc.)

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email) {
  return emailRegex.test(email);
}

export function validatePassword(password) {
  return password.length >= 8;
}

export function validateRequired(value) {
  return value !== null && value !== undefined && value !== '';
}
