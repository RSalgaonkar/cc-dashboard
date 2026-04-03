import { useMemo, useState } from 'react';
import { mockUsers } from '../../data/mockUsers';
import { User, UserFormValues } from '../../types/user';
import useThrottle from '../../hooks/useThrottle';
import UserAnalytics from '../analytics/UserAnalytics';
import UserFormModal from '../form/UserFormModal';
import UserTable from '../table/UserTable';
import UserToolbar from '../toolbar/UserToolbar';

export default function UserDashboard() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  const throttledSearchTerm = useThrottle(searchTerm, 350);

  const filteredUsers = useMemo(() => {
    const normalizedSearch = throttledSearchTerm.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        user.name.toLowerCase().includes(normalizedSearch) ||
        user.email.toLowerCase().includes(normalizedSearch);

      const matchesRole = selectedRole === 'All' || user.role === selectedRole;
      const matchesStatus =
        selectedStatus === 'All' || user.status === selectedStatus;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, throttledSearchTerm, selectedRole, selectedStatus]);

  const handleAddUser = () => {
    setEditUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setEditUser(user);
    setIsModalOpen(true);
  };

  const handleSaveUser = (values: UserFormValues) => {
    if (editUser) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === editUser.id
            ? {
                ...user,
                name: values.name,
                email: values.email,
                role: values.role,
                status: values.status,
                details: {
                  ...user.details,
                  security: {
                    ...user.details.security,
                    ...values.security,
                  },
                },
              }
            : user
        )
      );
      return;
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      name: values.name,
      email: values.email,
      role: values.role,
      status: values.status,
      details: {
        activityLogs: [],
        groups: [],
        departments: [],
        security: {
          twoFactorEnabled: values.security.twoFactorEnabled,
          passwordAgeDays: values.security.passwordAgeDays,
          lastPasswordUpdate: values.security.lastPasswordUpdate,
          loginAlertsEnabled: values.security.loginAlertsEnabled,
        },
      },
    };

    setUsers((prev) => [newUser, ...prev]);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditUser(null);
  };

  return (
    <div className="dashboard-shell">
      <header className="page-header">
        <h1>User Management Dashboard</h1>
        <p>
          Manage users, monitor account health, and review security and activity
          trends.
        </p>
      </header>

      <UserToolbar
        searchTerm={searchTerm}
        selectedRole={selectedRole}
        selectedStatus={selectedStatus}
        appliedSearchTerm={throttledSearchTerm}
        onSearchChange={setSearchTerm}
        onRoleChange={setSelectedRole}
        onStatusChange={setSelectedStatus}
        onAddUser={handleAddUser}
      />

      <UserAnalytics users={filteredUsers} totalUsers={users.length} />

      <UserTable users={filteredUsers} onEdit={handleEditUser} />

      <UserFormModal
        isOpen={isModalOpen}
        editUser={editUser}
        onClose={handleCloseModal}
        onSave={handleSaveUser}
      />
    </div>
  );
}
