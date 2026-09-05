import React from 'react';

export default function MetricCard({ title, value, subtitle, icon: Icon, trend, color = 'var(--cyan)' }) {
  return (
    <div className="glass-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {title}
        </span>
        {Icon && (
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: `rgba(255, 255, 255, 0.05)`,
            border: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: color
          }}>
            <Icon size={20} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
        <span style={{ fontSize: '2rem', fontWeight: 800, fontFamily: 'var(--font-heading)', color: '#ffffff' }}>
          {value}
        </span>
        {trend && (
          <span style={{ fontSize: '0.8rem', color: trend.startsWith('+') ? '#10b981' : '#f43f5e', fontWeight: 600 }}>
            {trend}
          </span>
        )}
      </div>

      {subtitle && (
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {subtitle}
        </span>
      )}
    </div>
  );
}
