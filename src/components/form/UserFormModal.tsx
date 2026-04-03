import { useEffect, useState } from 'react';
import { User, UserFormValues } from '../../types/user';
import { validateUser } from '../../utils/validation';
import type { UserFormErrors } from '../../utils/validation';

interface UserFormModalProps {
  isOpen: boolean;
  editUser: User | null;
  users: User[];
  onClose: () => void;
  onSave: (values: UserFormValues) => void;
}

const initialValues: UserFormValues = {
  name: '',
  email: '',
  role: 'Viewer',
  status: 'Active',
};

export default function UserFormModal({
  isOpen,
  editUser,
  users,
  onClose,
  onSave,
}: UserFormModalProps) {
  const [formValues, setFormValues] = useState<UserFormValues>(initialValues);
  const [errors, setErrors] = useState<UserFormErrors>({});

  useEffect(() => {
    if (editUser) {
      setFormValues({
        name: editUser.name,
        email: editUser.email,
        role: editUser.role,
        status: editUser.status,
      });
    } else {
      setFormValues(initialValues);
    }

    setErrors({});
  }, [editUser, isOpen]);

  if (!isOpen) return null;

  const handleChange = <K extends keyof UserFormValues>(
    field: K,
    value: UserFormValues[K]
  ) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateUser(formValues, {
      existingUsers: users,
      editingUserId: editUser?.id ?? null,
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSave({
      ...formValues,
      email: formValues.email.trim().toLowerCase(),
      name: formValues.name.trim(),
    });
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card" role="dialog" aria-modal="true" aria-labelledby="user-form-title">
        <div className="modal-header">
          <h2 id="user-form-title">{editUser ? 'Edit User' : 'Add User'}</h2>
          <button type="button" onClick={onClose} aria-label="Close modal">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form-grid">
          <label>
            Name
            <input
              value={formValues.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </label>

          <label>
            Email
            <input
              value={formValues.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </label>

          <label>
            Role
            <select
              value={formValues.role}
              onChange={(e) =>
                handleChange('role', e.target.value as UserFormValues['role'])
              }
            >
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
            {errors.role && <span className="field-error">{errors.role}</span>}
          </label>

          <label>
            Account Status
            <select
              value={formValues.status}
              onChange={(e) =>
                handleChange('status', e.target.value as UserFormValues['status'])
              }
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
            {errors.status && <span className="field-error">{errors.status}</span>}
          </label>

          <div className="form-actions">
            <button type="button" className="secondary-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-btn">
              {editUser ? 'Update User' : 'Create User'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}