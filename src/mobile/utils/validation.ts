/**
 * Validation utilities for form inputs
 */

export interface ValidationResult {
  isValid: boolean;
  value?: number;
  error?: string;
}

/**
 * Validates and parses a numeric input string
 * @param input - The string to validate
 * @param fieldName - Name of the field (for error messages)
 * @param min - Minimum allowed value (optional)
 * @param max - Maximum allowed value (optional)
 * @returns ValidationResult with isValid flag, parsed value, and error message
 */
export function validateNumber(
  input: string,
  fieldName: string,
  min?: number,
  max?: number
): ValidationResult {
  // Check if empty
  if (!input || input.trim() === '') {
    return {
      isValid: false,
      error: `${fieldName} no puede estar vacío`,
    };
  }

  // Parse the number
  const num = parseInt(input, 10);

  // Check if it's a valid number
  if (isNaN(num)) {
    return {
      isValid: false,
      error: `${fieldName} debe ser un número válido`,
    };
  }

  // Check minimum value
  if (min !== undefined && num < min) {
    return {
      isValid: false,
      error: `${fieldName} debe ser mayor o igual a ${min}`,
    };
  }

  // Check maximum value
  if (max !== undefined && num > max) {
    return {
      isValid: false,
      error: `${fieldName} debe ser menor o igual a ${max}`,
    };
  }

  return {
    isValid: true,
    value: num,
  };
}

/**
 * Validates a date string in YYYY-MM-DD format
 * @param dateStr - The date string to validate
 * @returns ValidationResult with isValid flag and error message
 */
export function validateDate(dateStr: string): ValidationResult {
  if (!dateStr || dateStr.trim() === '') {
    return {
      isValid: false,
      error: 'La fecha no puede estar vacía',
    };
  }

  // Check format YYYY-MM-DD
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(dateStr)) {
    return {
      isValid: false,
      error: 'La fecha debe tener el formato YYYY-MM-DD',
    };
  }

  // Validate the date is actually valid
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return {
      isValid: false,
      error: 'La fecha no es válida',
    };
  }

  // Check it's not in the past
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date < today) {
    return {
      isValid: false,
      error: 'La fecha no puede ser en el pasado',
    };
  }

  return {
    isValid: true,
  };
}

/**
 * Validates an email address
 * @param email - The email to validate
 * @returns ValidationResult
 */
export function validateEmail(email: string): ValidationResult {
  if (!email || email.trim() === '') {
    return {
      isValid: false,
      error: 'El email no puede estar vacío',
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      error: 'El email no es válido',
    };
  }

  return {
    isValid: true,
  };
}
