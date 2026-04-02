import { UserFormValues } from '../types/user';

export type UserFormErrors = Partial<Record<keyof UserFormValues, string>>;

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

  return errors;
}