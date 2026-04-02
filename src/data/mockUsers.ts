import { User } from '../types/user';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Aarav Mehta',
    email: 'aarav.mehta@example.com',
    role: 'Admin',
    status: 'Active',
    details: {
      activityLogs: [
        {
          id: 'a1',
          action: 'Successful login from Goa',
          timestamp: '2026-03-31 09:15 AM',
          type: 'Login',
        },
        {
          id: 'a2',
          action: 'Updated editor permissions for content team',
          timestamp: '2026-03-30 04:10 PM',
          type: 'Update',
        },
        {
          id: 'a3',
          action: 'Enabled login alert emails',
          timestamp: '2026-03-28 11:40 AM',
          type: 'Security',
        },
      ],
      groups: ['Platform Admins', 'Access Review Board'],
      departments: ['Engineering', 'Operations'],
      security: {
        twoFactorEnabled: true,
        passwordAgeDays: 18,
        lastPasswordUpdate: '2026-03-14',
        loginAlertsEnabled: true,
      },
    },
  },
  {
    id: '2',
    name: 'Priya Nair',
    email: 'priya.nair@example.com',
    role: 'Editor',
    status: 'Pending',
    details: {
      activityLogs: [
        {
          id: 'b1',
          action: 'Invite accepted',
          timestamp: '2026-03-29 10:00 AM',
          type: 'Profile',
        },
        {
          id: 'b2',
          action: 'Pending first login verification',
          timestamp: '2026-03-29 10:05 AM',
          type: 'Security',
        },
      ],
      groups: ['Content Editors'],
      departments: ['Marketing'],
      security: {
        twoFactorEnabled: false,
        passwordAgeDays: 0,
        lastPasswordUpdate: 'Not updated yet',
        loginAlertsEnabled: false,
      },
    },
  },
  {
    id: '3',
    name: 'Rohan Das',
    email: 'rohan.das@example.com',
    role: 'Viewer',
    status: 'Inactive',
    details: {
      activityLogs: [
        {
          id: 'c1',
          action: 'Last failed login attempt',
          timestamp: '2026-03-20 07:45 PM',
          type: 'Login',
        },
        {
          id: 'c2',
          action: 'Profile details updated',
          timestamp: '2026-03-18 02:10 PM',
          type: 'Profile',
        },
      ],
      groups: ['Finance Viewers'],
      departments: ['Finance'],
      security: {
        twoFactorEnabled: false,
        passwordAgeDays: 93,
        lastPasswordUpdate: '2025-12-29',
        loginAlertsEnabled: true,
      },
    },
  },
  {
    id: '4',
    name: 'Neha Sharma',
    email: 'neha.sharma@example.com',
    role: 'Editor',
    status: 'Active',
    details: {
      activityLogs: [
        {
          id: 'd1',
          action: 'Updated campaign landing page',
          timestamp: '2026-03-31 01:30 PM',
          type: 'Update',
        },
        {
          id: 'd2',
          action: 'Successful login from Mumbai',
          timestamp: '2026-03-31 08:50 AM',
          type: 'Login',
        },
      ],
      groups: ['Content Editors', 'Campaign Managers'],
      departments: ['Marketing', 'Digital'],
      security: {
        twoFactorEnabled: true,
        passwordAgeDays: 35,
        lastPasswordUpdate: '2026-02-25',
        loginAlertsEnabled: true,
      },
    },
  },
  {
    id: '5',
    name: 'Kunal Verma',
    email: 'kunal.verma@example.com',
    role: 'Viewer',
    status: 'Active',
    details: {
      activityLogs: [
        {
          id: 'e1',
          action: 'Viewed reporting dashboard',
          timestamp: '2026-03-30 03:22 PM',
          type: 'Profile',
        },
        {
          id: 'e2',
          action: 'Successful login from Delhi',
          timestamp: '2026-03-30 09:02 AM',
          type: 'Login',
        },
      ],
      groups: ['Analytics Viewers'],
      departments: ['Business Intelligence'],
      security: {
        twoFactorEnabled: true,
        passwordAgeDays: 56,
        lastPasswordUpdate: '2026-02-03',
        loginAlertsEnabled: false,
      },
    },
  },
];