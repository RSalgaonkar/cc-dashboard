import { UserActivityLog, UserDetails } from '../../types/user';

interface UserDetailPanelProps {
  details: UserDetails;
}

function ActivityTypeBadge({ type }: { type: UserActivityLog['type'] }) {
  const classNameMap: Record<UserActivityLog['type'], string> = {
    Login: 'activity-badge activity-login',
    Update: 'activity-badge activity-update',
    Security: 'activity-badge activity-security',
    Profile: 'activity-badge activity-profile',
  };

  return <span className={classNameMap[type]}>{type}</span>;
}

export default function UserDetailPanel({ details }: UserDetailPanelProps) {
  const { activityLogs, groups, departments, security } = details;

  return (
    <div className="user-detail-panel">
      <div className="detail-grid">
        <section className="detail-card">
          <h4>Recent Activity Logs</h4>

          {activityLogs.length > 0 ? (
            <div className="activity-list">
              {activityLogs.map((log) => (
                <div key={log.id} className="activity-item">
                  <div className="activity-item-top">
                    <ActivityTypeBadge type={log.type} />
                    <span className="detail-muted">{log.timestamp}</span>
                  </div>
                  <p>{log.action}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="detail-muted">No recent activity available.</p>
          )}
        </section>

        <section className="detail-card">
          <h4>Assigned Groups</h4>

          {groups.length > 0 ? (
            <div className="chip-list">
              {groups.map((group) => (
                <span key={group} className="detail-chip">
                  {group}
                </span>
              ))}
            </div>
          ) : (
            <p className="detail-muted">No groups assigned.</p>
          )}

          <h4 className="subsection-title">Departments</h4>

          {departments.length > 0 ? (
            <div className="chip-list">
              {departments.map((department) => (
                <span key={department} className="detail-chip">
                  {department}
                </span>
              ))}
            </div>
          ) : (
            <p className="detail-muted">No departments assigned.</p>
          )}
        </section>

        <section className="detail-card">
          <h4>Security Settings</h4>

          <div className="security-list">
            <div className="security-row">
              <span>2FA Enabled</span>
              <strong>{security.twoFactorEnabled ? 'Yes' : 'No'}</strong>
            </div>

            <div className="security-row">
              <span>Password Age</span>
              <strong>{security.passwordAgeDays} days</strong>
            </div>

            <div className="security-row">
              <span>Login Alerts</span>
              <strong>{security.loginAlertsEnabled ? 'Enabled' : 'Disabled'}</strong>
            </div>

            <div className="security-row">
              <span>Last Password Update</span>
              <strong>{security.lastPasswordUpdate}</strong>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}