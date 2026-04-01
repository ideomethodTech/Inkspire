import { body, validationResult } from 'express-validator';

// ─── Shared error handler ──────────────────────────────────────────────────
// Call this as the LAST middleware in a validation chain.
// If any rule failed, it short-circuits with a consistent error shape.
export const handleValidationErrors = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: result.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};

// ─── Address validation (POST /api/address) ────────────────────────────────
export const validateAddress = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string')
    .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),

  body('phone')
    .trim()
    .notEmpty().withMessage('Phone is required')
    .matches(/^[6-9]\d{9}$/).withMessage('Phone must be a valid Indian mobile number (10 digits, starting with 6–9)'),

  body('addressLine')
    .trim()
    .notEmpty().withMessage('Address line is required')
    .isString().withMessage('Address line must be a string')
    .isLength({ min: 5, max: 200 }).withMessage('Address line must be between 5 and 200 characters'),

  body('city')
    .trim()
    .notEmpty().withMessage('City is required')
    .isString().withMessage('City must be a string')
    .isLength({ min: 2, max: 100 }).withMessage('City must be between 2 and 100 characters'),

  body('state')
    .trim()
    .notEmpty().withMessage('State is required')
    .isString().withMessage('State must be a string')
    .isLength({ min: 2, max: 100 }).withMessage('State must be between 2 and 100 characters'),

  body('zip')
    .trim()
    .notEmpty().withMessage('ZIP code is required')
    .matches(/^\d{6}$/).withMessage('ZIP must be a valid Indian PIN code (6 digits)'),

  body('country')
    .optional()
    .trim()
    .isString().withMessage('Country must be a string')
    .isLength({ min: 2, max: 100 }).withMessage('Country must be between 2 and 100 characters'),

  body('isDefault')
    .optional()
    .isBoolean().withMessage('isDefault must be a boolean'),
];

// ─── Profile validation (PUT /protected/profile) ──────────────────────────
export const validateProfile = [
  body('displayName')
    .optional()
    .trim()
    .isString().withMessage('Display name must be a string')
    .isLength({ min: 2, max: 100 }).withMessage('Display name must be between 2 and 100 characters'),

  body('phoneNumber')
    .optional()
    .trim()
    .matches(/^[6-9]\d{9}$/).withMessage('Phone number must be a valid Indian mobile number (10 digits, starting with 6–9)'),

  body('dob')
    .optional()
    .isDate({ format: 'YYYY-MM-DD', strictMode: true })
    .withMessage('Date of birth must be a valid date in YYYY-MM-DD format')
    .custom((value) => {
      const dob = new Date(value);
      if (dob >= new Date()) {
        throw new Error('Date of birth must be a past date');
      }
      return true;
    }),
];
