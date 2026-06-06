// Form Validation Utilities

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validateUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const validateForm = (data, requiredFields) => {
  const errors = {};
  requiredFields.forEach((field) => {
    if (!data[field] || (typeof data[field] === 'string' && !data[field].trim())) {
      errors[field] = `${field} is required`;
    }
  });
  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validatePercentage = (value) => {
  const num = parseInt(value);
  return num >= 0 && num <= 100;
};

export const validateYear = (year) => {
  const num = parseInt(year);
  const currentYear = new Date().getFullYear();
  return num >= 1900 && num <= currentYear + 10;
};

export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().split('T')[0];
};

export const formatDateDisplay = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};
