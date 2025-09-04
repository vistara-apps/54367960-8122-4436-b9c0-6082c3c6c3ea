'use client';

import { Eye, MousePointer } from 'lucide-react';

interface MetricBadgeProps {
  variant: 'views' | 'clicks';
  value: number;
}

export function MetricBadge({ variant, value }: MetricBadgeProps) {
  const formatValue = (val: number) => {
    if (val >= 1000) {
      return `${(val / 1000).toFixed(1)}k`;
    }
    return val.toString();
  };

  const icon = variant === 'views' ? (
    <Eye className="w-3 h-3" />
  ) : (
    <MousePointer className="w-3 h-3" />
  );

  const bgColor = variant === 'views' 
    ? 'bg-blue-500/80' 
    : 'bg-green-500/80';

  return (
    <div className={`
      ${bgColor} text-white px-2 py-1 rounded-full text-xs font-medium
      flex items-center space-x-1 backdrop-blur-sm
    `}>
      {icon}
      <span>{formatValue(value)}</span>
    </div>
  );
}
