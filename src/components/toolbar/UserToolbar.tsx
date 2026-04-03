import { UserRole, UserStatus } from '../../types/user';

interface UserToolbarProps {
  searchTerm: string;
  selectedRole: string;
  selectedStatus: string;
  onSearchChange: (value: string) => void;
  onRoleChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onAddUser: () => void;
}

const roles: Array<'All' | UserRole> = ['All', 'Admin', 'Editor', 'Viewer'];
const statuses: Array<'All' | UserStatus> = ['All', 'Active', 'Inactive', 'Pending'];

export default function UserToolbar({
  searchTerm,
  selectedRole,
  selectedStatus,
  onSearchChange,
  onRoleChange,
  onStatusChange,
  onAddUser,
}: UserToolbarProps) {
  return (
    <div className="toolbar">
      <div className="toolbar-filters">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="input"
        />

        <select
          value={selectedRole}
          onChange={(e) => onRoleChange(e.target.value)}
          className="select"
        >
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="select"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <button type="button" className="primary-btn" onClick={onAddUser}>
        Add User
      </button>
    </div>
  );
}