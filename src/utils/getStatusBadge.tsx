import { CheckCircle2, XCircle } from "lucide-react";
import { AlertCircle } from "react-feather";

export const getStatusBadge = (status: string) => {
    const badges: { [key: string]: { icon: any; text: string; className: string } } = {
      approved: {
        icon: CheckCircle2,
        text: 'מאושר',
        className: 'bg-[#d1fae5] text-[#059669]'
      },
      rejected: {
        icon: XCircle,
        text: 'נדחה',
        className: 'bg-[#fee2e2] text-[#dc2626]'
      },
      pending: {
        icon: AlertCircle,
        text: 'ממתין',
        className: 'bg-[#fef3c7] text-[#d97706]'
      }
    };
    const badge = badges[status];
    const Icon = badge.icon;
    return (
      <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${badge.className}`}>
        <Icon className="w-3 h-3" />
        {badge.text}
      </div>
    );
  };