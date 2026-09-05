import React from 'react';
import { ShieldCheck, ArrowRight, ShieldAlert } from 'lucide-react';

export default function RecommendationCard({ recommendations = [], actionText = '', riskLevel = 'Low' }) {
  const isHigh = (riskLevel || '').toLowerCase().includes('high');

  return (
    <div className="glass-card" style={{ padding: '1.25rem', borderColor: isHigh ? 'rgba(244, 63, 94, 0.3)' : 'rgba(16, 185, 129, 0.3)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
        {isHigh ? <ShieldAlert size={18} color="#fb7185" /> : <ShieldCheck size={18} color="#34d399" />}
        <h4 style={{ fontSize: '0.95rem', color: isHigh ? '#fb7185' : '#34d399' }}>
          Recommended Protocol
        </h4>
      </div>

      {actionText && (
        <div style={{
          padding: '0.75rem',
          borderRadius: '8px',
          background: isHigh ? 'rgba(244, 63, 94, 0.12)' : 'rgba(16, 185, 129, 0.12)',
          color: '#ffffff',
          fontSize: '0.875rem',
          fontWeight: 600,
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <ArrowRight size={16} color={isHigh ? '#fb7185' : '#34d399'} />
          <span>{actionText}</span>
        </div>
      )}

      {recommendations && recommendations.length > 0 && (
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {recommendations.map((rec, idx) => (
            <li 
              key={idx}
              style={{
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
                lineHeight: '1.5'
              }}
            >
              <span style={{ color: 'var(--cyan)', fontWeight: 'bold' }}>•</span>
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
