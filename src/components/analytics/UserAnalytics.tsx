import { useMemo } from 'react';
import { User, UserRole, UserStatus } from '../../types/user';

interface UserAnalyticsProps {
  users: User[];
  totalUsers: number;
}

type MetricItem = {
  label: string;
  value: number;
  colorClass: string;
};

function percent(value: number, total: number) {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

function BarSection({
  title,
  items,
  total,
}: {
  title: string;
  items: MetricItem[];
  total: number;
}) {
  return (
    <section className="analytics-card">
      <div className="analytics-card-header">
        <h3>{title}</h3>
        <span>{total} users</span>
      </div>

      <div className="analytics-bar-list">
        {items.map((item) => {
          const width = percent(item.value, total);

          return (
            <div key={item.label} className="analytics-bar-row">
              <div className="analytics-bar-labels">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>

              <div className="analytics-bar-track">
                <div
                  className={`analytics-bar-fill ${item.colorClass}`}
                  style={{ width: `${width}%` }}
                />
              </div>

              <span className="analytics-percent">{width}%</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function UserAnalytics({
  users,
  totalUsers,
}: UserAnalyticsProps) {
  const analytics = useMemo(() => {
    const roleCounts: Record<UserRole, number> = {
      Admin: 0,
      Editor: 0,
      Viewer: 0,
    };

    const statusCounts: Record<UserStatus, number> = {
      Active: 0,
      Inactive: 0,
      Pending: 0,
    };

    let twoFactorEnabled = 0;
    let loginAlertsEnabled = 0;
    let stalePasswords = 0;
    let totalActivityLogs = 0;

    users.forEach((user) => {
      roleCounts[user.role] += 1;
      statusCounts[user.status] += 1;
      totalActivityLogs += user.details.activityLogs.length;

      if (user.details.security.twoFactorEnabled) {
        twoFactorEnabled += 1;
      }

      if (user.details.security.loginAlertsEnabled) {
        loginAlertsEnabled += 1;
      }

      if (user.details.security.passwordAgeDays > 60) {
        stalePasswords += 1;
      }
    });

    return {
      visibleUsers: users.length,
      activeUsers: statusCounts.Active,
      pendingUsers: statusCounts.Pending,
      inactiveUsers: statusCounts.Inactive,
      twoFactorEnabled,
      loginAlertsEnabled,
      stalePasswords,
      totalActivityLogs,
      avgActivity:
        users.length > 0 ? (totalActivityLogs / users.length).toFixed(1) : '0.0',
      roleItems: [
        { label: 'Admin', value: roleCounts.Admin, colorClass: 'bar-admin' },
        { label: 'Editor', value: roleCounts.Editor, colorClass: 'bar-editor' },
        { label: 'Viewer', value: roleCounts.Viewer, colorClass: 'bar-viewer' },
      ],
      statusItems: [
        { label: 'Active', value: statusCounts.Active, colorClass: 'bar-active' },
        { label: 'Pending', value: statusCounts.Pending, colorClass: 'bar-pending' },
        { label: 'Inactive', value: statusCounts.Inactive, colorClass: 'bar-inactive' },
      ],
      securityItems: [
        { label: '2FA Enabled', value: twoFactorEnabled, colorClass: 'bar-secure' },
        { label: 'Login Alerts', value: loginAlertsEnabled, colorClass: 'bar-alerts' },
        { label: 'Stale Passwords', value: stalePasswords, colorClass: 'bar-stale' },
      ],
    };
  }, [users]);

  return (
    <section className="analytics-section">
      <div className="kpi-grid">
        <article className="kpi-card">
          <span className="kpi-label">Visible Users</span>
          <strong className="kpi-value">{analytics.visibleUsers}</strong>
          <span className="kpi-meta">Out of {totalUsers} total records</span>
        </article>

        <article className="kpi-card">
          <span className="kpi-label">Active Accounts</span>
          <strong className="kpi-value">{analytics.activeUsers}</strong>
          <span className="kpi-meta">Currently active users in this view</span>
        </article>

        <article className="kpi-card">
          <span className="kpi-label">2FA Coverage</span>
          <strong className="kpi-value">
            {percent(analytics.twoFactorEnabled, analytics.visibleUsers)}%
          </strong>
          <span className="kpi-meta">
            {analytics.twoFactorEnabled} users have 2FA enabled
          </span>
        </article>

        <article className="kpi-card">
          <span className="kpi-label">Avg Activity</span>
          <strong className="kpi-value">{analytics.avgActivity}</strong>
          <span className="kpi-meta">
            {analytics.totalActivityLogs} recent logs in current view
          </span>
        </article>
      </div>

      <div className="analytics-grid">
        <BarSection
          title="Users by Role"
          items={analytics.roleItems}
          total={analytics.visibleUsers}
        />

        <BarSection
          title="Users by Status"
          items={analytics.statusItems}
          total={analytics.visibleUsers}
        />

        <BarSection
          title="Security Overview"
          items={analytics.securityItems}
          total={analytics.visibleUsers}
        />
      </div>
    </section>
  );
}