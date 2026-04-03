import { useMemo, useState } from 'react';
import { mockUsers } from '../../data/mockUsers';
import { User, UserFormValues } from '../../types/user';
import UserToolbar from '../toolbar/UserToolbar';
import UserTable from '../table/UserTable';
import UserFormModal from '../form/UserFormModal';
import UserAnalytics from '../analytics/UserAnalytics';

export default function UserDashboard() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  const filteredUsers = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

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
  }, [users, searchTerm, selectedRole, selectedStatus]);

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
                ...values,
              }
            : user
        )
      );
      return;
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      ...values,
      details: {
        activityLogs: [],
        groups: [],
        departments: [],
        security: {
          twoFactorEnabled: false,
          passwordAgeDays: 0,
          lastPasswordUpdate: 'Not updated yet',
          loginAlertsEnabled: false,
        },
      },
    };

    setUsers((prev) => [newUser, ...prev]);
  };

  return (
    <div className="dashboard-shell">
      <header className="page-header">
        <h1>User Management Dashboard</h1>
        <p>Manage users, review status, and monitor access analytics.</p>
      </header>

      <UserToolbar
        searchTerm={searchTerm}
        selectedRole={selectedRole}
        selectedStatus={selectedStatus}
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
        onClose={() => {
          setIsModalOpen(false);
          setEditUser(null);
        }}
        onSave={handleSaveUser}
      />
    </div>
  );
}