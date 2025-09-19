interface StatsCardProps {
  label: string;
  value: number;
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'caution';
}

const variantStyles = {
  default: {
    background: 'from-gray-50 to-gray-100',
    border: 'border-gray-200/50',
    text: 'text-gray-800',
    label: 'text-gray-600',
    icon: 'text-gray-400',
    hover: 'hover:from-gray-100 hover:to-gray-200',
    iconBg: 'bg-gray-100',
    iconRing: 'ring-gray-400/20'
  },
  success: {
    background: 'from-green-50 to-green-100',
    border: 'border-green-200/50',
    text: 'text-green-800',
    label: 'text-green-700',
    icon: 'text-green-500',
    hover: 'hover:from-green-100 hover:to-green-200',
    iconBg: 'bg-green-100',
    iconRing: 'ring-green-400/20'
  },
  danger: {
    background: 'from-red-50 to-red-100',
    border: 'border-red-200/50',
    text: 'text-red-800',
    label: 'text-red-700',
    icon: 'text-red-500',
    hover: 'hover:from-red-100 hover:to-red-200',
    iconBg: 'bg-red-100',
    iconRing: 'ring-red-400/20'
  },
  warning: {
    background: 'from-yellow-50 to-yellow-100',
    border: 'border-yellow-200/50',
    text: 'text-yellow-800',
    label: 'text-yellow-700',
    icon: 'text-yellow-500',
    hover: 'hover:from-yellow-100 hover:to-yellow-200',
    iconBg: 'bg-yellow-100',
    iconRing: 'ring-yellow-400/20'
  },
  caution: {
    background: 'from-orange-50 to-orange-100',
    border: 'border-orange-200/50',
    text: 'text-orange-800',
    label: 'text-orange-700',
    icon: 'text-orange-500',
    hover: 'hover:from-orange-100 hover:to-orange-200',
    iconBg: 'bg-orange-100',
    iconRing: 'ring-orange-400/20'
  }
};

const icons = {
  default: (className: string) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ),
  success: (className: string) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  danger: (className: string) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  warning: (className: string) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  caution: (className: string) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
  )
};

export default function StatsCard({ label, value, variant = 'default' }: StatsCardProps) {
  const styles = variantStyles[variant];
  const Icon = icons[variant];
  
  return (
    <div className={`group bg-gradient-to-br ${styles.background} p-5 rounded-xl border ${styles.border} shadow-sm hover:shadow-md ${styles.hover} transition-all duration-300 relative overflow-hidden`}>
      <div className="flex justify-between items-start mb-3">
        <p className={`text-sm font-medium ${styles.label}`}>{label}</p>
        <div className={`p-2 rounded-lg ${styles.iconBg} group-hover:ring-4 ${styles.iconRing} transition-all duration-300`}>
          {Icon(`h-5 w-5 ${styles.icon} transform group-hover:scale-110 transition-transform duration-300`)}
        </div>
      </div>
      <h3 className={`text-2xl font-bold ${styles.text} transform group-hover:scale-105 transition-transform duration-300 relative z-10`}>
        {value}
      </h3>
      <div className={`absolute inset-0 bg-gradient-to-r ${styles.background} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
    </div>
  );
}