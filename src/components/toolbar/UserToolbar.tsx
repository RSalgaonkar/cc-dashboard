import { UserRole, UserStatus } from '../../types/user';

interface UserToolbarProps {
  searchTerm: string;
  selectedRole: string;
  selectedStatus: string;
  appliedSearchTerm: string;
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
  appliedSearchTerm,
  onSearchChange,
  onRoleChange,
  onStatusChange,
  onAddUser,
}: UserToolbarProps) {
  const isPending = searchTerm !== appliedSearchTerm;

  return (
    <div className="toolbar">
      <div className="toolbar-filters">
        <div className="search-group">
          <input
            type="text"
            placeholder="Search by name or email"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="input"
          />
          <span className="search-meta">
            {isPending ? 'Applying throttled search...' : 'Search synced'}
          </span>
        </div>

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
