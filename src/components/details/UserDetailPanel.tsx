import { UserDetails, UserActivityLog } from '../../types/user';
import { useState } from 'react';

interface UserDetailPanelProps {
  details: UserDetails;
}

function ActivityTypeBadge({ type }: { type: UserActivityLog['type'] }) {
  return <span className={`activity-badge activity-${type.toLowerCase()}`}>{type}</span>;
}

export default function UserDetailPanel({ details }: UserDetailPanelProps) {
  const { activityLogs, groups, departments, security } = details;
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

  // const toggleRow = (userId: string) => {
  //   setExpandedUserId((prev) => (prev === userId ? null : userId));
  // };

  // const isExpanded = expandedUserId === user.id;

  return (
    <div className="user-detail-panel">
      <div className="detail-grid">
        <section className="detail-card">
          <h4>Recent Activity Logs</h4>
          <div className="activity-list">
            {activityLogs.length > 0 ? (
              activityLogs.map((log) => (
                <div key={log.id} className="activity-item">
                  <div className="activity-item-top">
                    <ActivityTypeBadge type={log.type} />
                    <span className="detail-muted">{log.timestamp}</span>
                  </div>
                  <p>{log.action}</p>
                </div>
              ))
            ) : (
              <p className="detail-muted">No recent activity available.</p>
            )}
          </div>
        </section>

        <section className="detail-card">
          <h4>Assigned Groups</h4>
          <div className="chip-list">
            {groups.length > 0 ? (
              groups.map((group) => (
                <span key={group} className="detail-chip">
                  {group}
                </span>
              ))
            ) : (
              <p className="detail-muted">No groups assigned.</p>
            )}
          </div>

          <h4 className="subsection-title">Departments</h4>
          <div className="chip-list">
            {departments.length > 0 ? (
              departments.map((department) => (
                <span key={department} className="detail-chip">
                  {department}
                </span>
              ))
            ) : (
              <p className="detail-muted">No departments assigned.</p>
            )}
          </div>
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