import React from 'react';
import { AlertCircle, Target, CheckCircle2 } from 'lucide-react';

export default function RedFlagsList({ redFlags = [], tactics = [] }) {
  const hasFlags = redFlags && redFlags.length > 0;
  const hasTactics = tactics && tactics.length > 0;

  if (!hasFlags && !hasTactics) {
    return (
      <div style={{
        padding: '1.25rem',
        borderRadius: '12px',
        background: 'rgba(16, 185, 129, 0.08)',
        border: '1px solid rgba(16, 185, 129, 0.25)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        color: '#34d399'
      }}>
        <CheckCircle2 size={20} />
        <span style={{ fontSize: '0.9rem' }}>
          No prominent psychological triggers, urgency coercion, or phishing patterns detected.
        </span>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Deception Tactics */}
      {hasTactics && (
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem' }}>
            <Target size={14} color="var(--cyan)" />
            Tactics Exploited
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {tactics.map((tactic, idx) => (
              <span 
                key={idx} 
                className="badge badge-rose" 
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
              >
                {tactic}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Red Flags List */}
      {hasFlags && (
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.6rem' }}>
            <AlertCircle size={14} color="#fb7185" />
            Detected Risk Vectors ({redFlags.length})
          </span>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {redFlags.map((flag, idx) => (
              <li 
                key={idx}
                style={{
                  padding: '0.6rem 0.85rem',
                  borderRadius: '8px',
                  background: 'rgba(244, 63, 94, 0.08)',
                  border: '1px solid rgba(244, 63, 94, 0.2)',
                  fontSize: '0.85rem',
                  color: '#fecdd3',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem'
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f43f5e' }} />
                <span>{flag}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
