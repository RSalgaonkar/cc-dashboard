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
  security: {
    twoFactorEnabled: false,
    passwordAgeDays: 0,
    lastPasswordUpdate: 'Not updated yet',
    loginAlertsEnabled: false,
  },
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
        security: {
          twoFactorEnabled: editUser.details.security.twoFactorEnabled,
          passwordAgeDays: editUser.details.security.passwordAgeDays,
          lastPasswordUpdate: editUser.details.security.lastPasswordUpdate,
          loginAlertsEnabled: editUser.details.security.loginAlertsEnabled,
        },
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
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSecurityChange = <
    K extends keyof UserFormValues['security']
  >(
    field: K,
    value: UserFormValues['security'][K]
  ) => {
    setFormValues((prev) => ({
      ...prev,
      security: {
        ...prev.security,
        [field]: value,
      },
    }));

    setErrors((prev) => ({
      ...prev,
      security: {
        ...prev.security,
        ...(field === 'passwordAgeDays' ? { passwordAgeDays: undefined } : {}),
        ...(field === 'lastPasswordUpdate' ? { lastPasswordUpdate: undefined } : {}),
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateUser(formValues);

    const hasSecurityErrors =
      !!validationErrors.security &&
      Object.values(validationErrors.security).some(Boolean);

    if (
      validationErrors.name ||
      validationErrors.email ||
      validationErrors.role ||
      validationErrors.status ||
      hasSecurityErrors
    ) {
      setErrors(validationErrors);
      return;
    }

    onSave(formValues);
    onClose();
  };

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="user-form-title"
    >
      <div className="modal modal-lg">
        <div className="modal-header">
          <h2 id="user-form-title">{editUser ? 'Edit User' : 'Add User'}</h2>
          <button
            type="button"
            className="icon-btn"
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <form className="user-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="user-name">Name</label>
              <input
                id="user-name"
                type="text"
                className="input"
                value={formValues.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Enter full name"
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="user-email">Email</label>
              <input
                id="user-email"
                type="email"
                className="input"
                value={formValues.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="Enter email address"
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
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
              {errors.role && <span className="error-text">{errors.role}</span>}
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
              {errors.status && <span className="error-text">{errors.status}</span>}
            </div>
          </div>

          <section className="form-section">
            <h3>Security Settings</h3>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="password-age">Password Age (days)</label>
                <input
                  id="password-age"
                  type="number"
                  min={0}
                  className="input"
                  value={formValues.security.passwordAgeDays}
                  onChange={(e) =>
                    handleSecurityChange(
                      'passwordAgeDays',
                      Number(e.target.value || 0)
                    )
                  }
                />
                {errors.security?.passwordAgeDays && (
                  <span className="error-text">
                    {errors.security.passwordAgeDays}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="last-password-update">Last Password Update</label>
                <input
                  id="last-password-update"
                  type="text"
                  className="input"
                  value={formValues.security.lastPasswordUpdate}
                  onChange={(e) =>
                    handleSecurityChange('lastPasswordUpdate', e.target.value)
                  }
                  placeholder="YYYY-MM-DD or custom status text"
                />
                {errors.security?.lastPasswordUpdate && (
                  <span className="error-text">
                    {errors.security.lastPasswordUpdate}
                  </span>
                )}
              </div>
            </div>

            <div className="toggle-grid">
              <label className="toggle-card">
                <input
                  type="checkbox"
                  checked={formValues.security.twoFactorEnabled}
                  onChange={(e) =>
                    handleSecurityChange('twoFactorEnabled', e.target.checked)
                  }
                />
                <div>
                  <span className="toggle-title">Two-factor authentication</span>
                  <span className="toggle-subtitle">
                    Require an additional verification step for sign-in.
                  </span>
                </div>
              </label>

              <label className="toggle-card">
                <input
                  type="checkbox"
                  checked={formValues.security.loginAlertsEnabled}
                  onChange={(e) =>
                    handleSecurityChange('loginAlertsEnabled', e.target.checked)
                  }
                />
                <div>
                  <span className="toggle-title">Login alerts</span>
                  <span className="toggle-subtitle">
                    Notify the user whenever a sign-in is detected.
                  </span>
                </div>
              </label>
            </div>
          </section>

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
