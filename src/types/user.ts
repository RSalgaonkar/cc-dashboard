export type UserRole = 'Admin' | 'Editor' | 'Viewer';
export type UserStatus = 'Active' | 'Inactive' | 'Pending';

export interface UserActivityLog {
  id: string;
  action: string;
  timestamp: string;
  type: 'Login' | 'Update' | 'Security' | 'Profile';
}

export interface UserSecuritySettings {
  twoFactorEnabled: boolean;
  passwordAgeDays: number;
  lastPasswordUpdate: string;
  loginAlertsEnabled: boolean;
}

export interface UserDetails {
  activityLogs: UserActivityLog[];
  groups: string[];
  departments: string[];
  security: UserSecuritySettings;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  details: UserDetails;
}

export interface UserFormValues {
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}