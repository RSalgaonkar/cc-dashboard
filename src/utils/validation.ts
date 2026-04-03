import { User, UserFormValues } from '../types/user';

export type UserFormErrors = Partial<Record<keyof UserFormValues, string>>;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ValidateUserOptions {
  existingUsers?: User[];
  editingUserId?: string | null;
}

export function validateUser(
  values: UserFormValues,
  options: ValidateUserOptions = {}
): UserFormErrors {
  const errors: UserFormErrors = {};
  const normalizedEmail = values.email.trim().toLowerCase();

  if (!values.name.trim()) {
    errors.name = 'Name is required';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(normalizedEmail)) {
    errors.email = 'Enter a valid email address';
  } else {
    const duplicateUser = options.existingUsers?.find((user) => {
      const isSameEmail = user.email.trim().toLowerCase() === normalizedEmail;
      const isDifferentUser = user.id !== options.editingUserId;
      return isSameEmail && isDifferentUser;
    });

    if (duplicateUser) {
      errors.email = 'This email is already assigned to another user';
    }
  }

  if (!values.role) {
    errors.role = 'Role is required';
  }

  if (!values.status) {
    errors.status = 'Status is required';
  }

  return errors;
}