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

  const handleChange = <K extends keyof UserFormValues>(field: K, value: UserFormValues[K]) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateUser(formValues);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSave(formValues);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>{editUser ? 'Edit User' : 'Add User'}</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Close modal">
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="user-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              className="input"
              value={formValues.name}
              onChange={(e) => handleChange('name', e.target.value)}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="input"
              value={formValues.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              className="select"
              value={formValues.role}
              onChange={(e) => handleChange('role', e.target.value as UserFormValues['role'])}
            >
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
            {errors.role && <span className="error-text">{errors.role}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="status">Account Status</label>
            <select
              id="status"
              className="select"
              value={formValues.status}
              onChange={(e) => handleChange('status', e.target.value as UserFormValues['status'])}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
            </select>
            {errors.status && <span className="error-text">{errors.status}</span>}
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