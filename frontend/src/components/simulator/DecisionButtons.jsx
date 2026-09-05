import React from 'react';
import { ArrowRight, CheckCircle2, XCircle } from 'lucide-react';

export default function DecisionButtons({ choices = [], onSelect, selectedId, disabled = false }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
      <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
        Select Your Reaction:
      </span>
      {choices.map((choice, index) => {
        const isSelected = selectedId === choice.id;
        return (
          <button
            key={choice.id}
            disabled={disabled}
            onClick={() => onSelect(choice.id)}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '1rem',
              padding: '1.1rem 1.25rem',
              borderRadius: '14px',
              background: isSelected 
                ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)' 
                : 'var(--bg-card)',
              border: isSelected 
                ? '1px solid var(--cyan)' 
                : '1px solid var(--border-subtle)',
              boxShadow: isSelected ? '0 0 20px rgba(0, 240, 255, 0.2)' : 'none',
              cursor: disabled ? 'not-allowed' : 'pointer',
              color: '#ffffff',
              textAlign: 'left',
              transition: 'all 0.2s ease',
              width: '100%'
            }}
            className={!disabled ? 'glass-card-interactive' : ''}
          >
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              background: isSelected ? 'var(--cyan)' : 'rgba(255, 255, 255, 0.08)',
              color: isSelected ? '#030712' : 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.85rem',
              fontWeight: 700,
              flexShrink: 0
            }}>
              {String.fromCharCode(65 + index)}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '0.95rem', color: isSelected ? '#ffffff' : '#e2e8f0', lineHeight: 1.5 }}>
                {choice.text}
              </p>
            </div>
            <ArrowRight size={16} color={isSelected ? 'var(--cyan)' : 'var(--text-dim)'} style={{ flexShrink: 0, marginTop: '4px' }} />
          </button>
        );
      })}
    </div>
  );
}
