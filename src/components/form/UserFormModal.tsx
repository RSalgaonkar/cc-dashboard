import { useEffect, useState } from 'react';
import { User, UserFormValues } from '../../types/user';
import { validateUser } from '../../utils/validation';
import type { UserFormErrors } from '../../utils/validation';

interface UserFormModalProps {
  isOpen: boolean;
  editUser: User | null;
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
  onClose,
  onSave,
}: UserFormModalProps) {
  const [formValues, setFormValues] = useState<UserFormValues>(initialValues);
  const [errors, setErrors] = useState<UserFormErrors>({});

  useEffect(() => {
    if (!isOpen) return;

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateUser(formValues);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSave(formValues);
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="user-modal-title"
      onClick={onClose}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 id="user-modal-title">{editUser ? 'Edit User' : 'Add User'}</h2>

          <button
            type="button"
            className="icon-btn"
            aria-label="Close modal"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form className="user-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="user-name">Name</label>
            <input
              id="user-name"
              className="input"
              type="text"
              value={formValues.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter full name"
            />
            {errors.name ? <span className="error-text">{errors.name}</span> : null}
          </div>

          <div className="form-group">
            <label htmlFor="user-email">Email</label>
            <input
              id="user-email"
              className="input"
              type="email"
              value={formValues.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="Enter email address"
            />
            {errors.email ? <span className="error-text">{errors.email}</span> : null}
          </div>

          <div className="form-group">
            <label htmlFor="user-role">Role</label>
            <select
              id="user-role"
              className="select"
              value={formValues.role}
              onChange={(e) =>
                handleChange('role', e.target.value as UserFormValues['role'])
              }
            >
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
            {errors.role ? <span className="error-text">{errors.role}</span> : null}
          </div>

          <div className="form-group">
            <label htmlFor="user-status">Account Status</label>
            <select
              id="user-status"
              className="select"
              value={formValues.status}
              onChange={(e) =>
                handleChange('status', e.target.value as UserFormValues['status'])
              }
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
            {errors.status ? (
              <span className="error-text">{errors.status}</span>
            ) : null}
          </div>

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