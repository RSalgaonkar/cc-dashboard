import { Fragment, useState } from 'react';
import { User } from '../../types/user';
import StatusBadge from './StatusBadge';
import UserDetailPanel from '../details/UserDetailPanel';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
}

export default function UserTable({ users, onEdit }: UserTableProps) {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (userId: string) => {
    setExpandedRows((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  if (users.length === 0) {
    return (
      <div className="empty-state">
        <h3>No users found</h3>
        <p>Try changing the search text or selected filters.</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="user-table">
        <thead>
          <tr>
            <th aria-label="Expand row"></th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th aria-label="Actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            const isExpanded = !!expandedRows[user.id];

            return (
              <Fragment key={user.id}>
                <tr>
                  <td>
                    <button
                      type="button"
                      className={`expand-btn ${isExpanded ? 'is-open' : ''}`}
                      onClick={() => toggleRow(user.id)}
                      aria-expanded={isExpanded}
                      aria-label={isExpanded ? `Collapse details for ${user.name}` : `Expand details for ${user.name}`}
                      title={isExpanded ? 'Collapse details' : 'Expand details'}
                    >
                      <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`} aria-hidden="true">
                        <svg viewBox="0 0 20 20" fill="none">
                          <path
                            d="M6 8l4 4 4-4"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <StatusBadge status={user.status} />
                  </td>
                  <td>
                    <button className="secondary-btn" onClick={() => onEdit(user)}>
                      Edit
                    </button>
                  </td>
                </tr>

                {isExpanded && (
                  <tr className="detail-row">
                    <td colSpan={6}>
                      <UserDetailPanel details={user.details} />
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}