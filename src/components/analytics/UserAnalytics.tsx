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

function buildPercentage(value: number, total: number) {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

function BarGroup({
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
          const percentage = buildPercentage(item.value, total);

          return (
            <div key={item.label} className="analytics-bar-row">
              <div className="analytics-bar-labels">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>

              <div className="analytics-bar-track">
                <div
                  className={`analytics-bar-fill ${item.colorClass}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <span className="analytics-percent">{percentage}%</span>
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

    let twoFactorEnabledCount = 0;
    let loginAlertsEnabledCount = 0;
    let totalActivityLogs = 0;

    users.forEach((user) => {
      roleCounts[user.role] += 1;
      statusCounts[user.status] += 1;

      if (user.details.security.twoFactorEnabled) {
        twoFactorEnabledCount += 1;
      }

      if (user.details.security.loginAlertsEnabled) {
        loginAlertsEnabledCount += 1;
      }

      totalActivityLogs += user.details.activityLogs.length;
    });

    return {
      activeCount: statusCounts.Active,
      pendingCount: statusCounts.Pending,
      inactiveCount: statusCounts.Inactive,
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
        {
          label: '2FA Enabled',
          value: twoFactorEnabledCount,
          colorClass: 'bar-secure',
        },
        {
          label: 'Login Alerts',
          value: loginAlertsEnabledCount,
          colorClass: 'bar-alerts',
        },
      ],
      totalActivityLogs,
      averageActivityPerUser:
        users.length > 0 ? (totalActivityLogs / users.length).toFixed(1) : '0.0',
    };
  }, [users]);

  return (
    <section className="analytics-section">
      <div className="kpi-grid">
        <article className="kpi-card">
          <span className="kpi-label">Visible Users</span>
          <strong className="kpi-value">{users.length}</strong>
          <span className="kpi-meta">Out of {totalUsers} total records</span>
        </article>

        <article className="kpi-card">
          <span className="kpi-label">Active Accounts</span>
          <strong className="kpi-value">{analytics.activeCount}</strong>
          <span className="kpi-meta">Healthy access footprint</span>
        </article>

        <article className="kpi-card">
          <span className="kpi-label">Pending Reviews</span>
          <strong className="kpi-value">{analytics.pendingCount}</strong>
          <span className="kpi-meta">Accounts needing follow-up</span>
        </article>

        <article className="kpi-card">
          <span className="kpi-label">Avg Activity</span>
          <strong className="kpi-value">{analytics.averageActivityPerUser}</strong>
          <span className="kpi-meta">
            {analytics.totalActivityLogs} recent logs in view
          </span>
        </article>
      </div>

      <div className="analytics-grid">
        <BarGroup title="Users by Role" items={analytics.roleItems} total={users.length} />
        <BarGroup title="Users by Status" items={analytics.statusItems} total={users.length} />
        <BarGroup title="Security Coverage" items={analytics.securityItems} total={users.length} />
      </div>
    </section>
  );
}