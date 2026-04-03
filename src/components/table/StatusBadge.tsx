import { UserStatus } from '../../types/user';

interface StatusBadgeProps {
  status: UserStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const className = `status-badge status-${status.toLowerCase()}`;

  return <span className={className}>{status}</span>;
}