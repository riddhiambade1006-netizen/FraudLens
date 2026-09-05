import React from 'react';
import { AlertTriangle, CheckCircle, ShieldAlert, AlertCircle } from 'lucide-react';

export default function Badge({ level = 'Low', text, size = 'sm' }) {
  const norm = (level || 'Low').toLowerCase();

  let badgeClass = 'badge-emerald';
  let Icon = CheckCircle;

  if (norm.includes('high') || norm.includes('danger') || norm.includes('critical')) {
    badgeClass = 'badge-high';
    Icon = ShieldAlert;
  } else if (norm.includes('medium') || norm.includes('warning')) {
    badgeClass = 'badge-medium';
    Icon = AlertTriangle;
  } else if (norm.includes('info') || norm.includes('cyan')) {
    badgeClass = 'badge-cyan';
    Icon = AlertCircle;
  }

  return (
    <span className={`badge ${badgeClass}`} style={{ fontSize: size === 'md' ? '0.85rem' : '0.75rem' }}>
      <Icon size={size === 'md' ? 14 : 12} />
      <span>{text || level}</span>
    </span>
  );
}
