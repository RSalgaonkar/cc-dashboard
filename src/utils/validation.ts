import { UserFormValues } from '../types/user';

export type UserFormErrors = {
  name?: string;
  email?: string;
  role?: string;
  status?: string;
  security?: {
    passwordAgeDays?: string;
    lastPasswordUpdate?: string;
  };
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateUser(values: UserFormValues): UserFormErrors {
  const errors: UserFormErrors = {};

  if (!values.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(values.email)) {
    errors.email = 'Enter a valid email address';
  }

  if (!values.role) {
    errors.role = 'Role is required';
  }

  if (!values.status) {
    errors.status = 'Status is required';
  }

  if (values.security.passwordAgeDays < 0) {
    errors.security = {
      ...(errors.security ?? {}),
      passwordAgeDays: 'Password age cannot be negative',
    };
  }

  if (!String(values.security.lastPasswordUpdate).trim()) {
    errors.security = {
      ...(errors.security ?? {}),
      lastPasswordUpdate: 'Last password update is required',
    };
  }

  return errors;
}
