'use client';

import { ReactNode } from 'react';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  actions?: ReactNode;
  stats?: {
    icon: string;
    label: string;
    value: string | number;
    color?: string;
  }[];
}

export default function PageLayout({ 
  title, 
  subtitle, 
  children, 
  actions,
  stats 
}: PageLayoutProps) {
  return (
    <div className="page-container">
      <div className="page-header">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="page-title">{title}</h1>
            {subtitle && <p className="page-subtitle">{subtitle}</p>}
          </div>
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      </div>

      {stats && (
        <div className="dashboard-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-lg font-semibold text-gray-600">{stat.label}</div>
              <div className={`text-2xl font-bold ${stat.color || 'text-primary-dark'}`}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      )}

      {children}
    </div>
  );
}