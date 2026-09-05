import React from 'react';
import { CheckCircle2, XCircle, Award, ArrowRight, RotateCcw, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function ResultCard({ result, onNext, onRetry }) {
  if (!result) return null;

  const isWin = result.isCorrect;

  return (
    <div 
      className="glass-card" 
      style={{
        padding: '1.75rem',
        borderColor: isWin ? 'rgba(16, 185, 129, 0.4)' : 'rgba(244, 63, 94, 0.4)',
        boxShadow: isWin ? '0 0 30px rgba(16, 185, 129, 0.2)' : '0 0 30px rgba(244, 63, 94, 0.2)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem'
      }}
    >
      {/* Result Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {isWin ? (
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: 'rgba(16, 185, 129, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#10b981'
            }}>
              <CheckCircle2 size={28} />
            </div>
          ) : (
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '50%',
              background: 'rgba(244, 63, 94, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#f43f5e'
            }}>
              <XCircle size={28} />
            </div>
          )}
          <div>
            <h3 style={{ fontSize: '1.35rem', color: isWin ? '#34d399' : '#fb7185' }}>
              {isWin ? 'Threat Neutralized!' : 'Scam Exploited!'}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {isWin ? 'You correctly identified the deceit vector.' : 'In real life, this action would compromise your assets.'}
            </p>
          </div>
        </div>

        {/* XP Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.4rem 0.85rem',
          borderRadius: '12px',
          background: isWin ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.05)',
          border: `1px solid ${isWin ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-subtle)'}`,
          color: isWin ? '#34d399' : 'var(--text-dim)',
          fontFamily: 'var(--font-mono)',
          fontWeight: 700,
          fontSize: '0.85rem'
        }}>
          <Award size={16} />
          <span>{isWin ? '+25 XP' : '0 XP'}</span>
        </div>
      </div>

      {/* Immediate Feedback Box */}
      <div style={{
        padding: '1rem',
        borderRadius: '12px',
        background: isWin ? 'rgba(16, 185, 129, 0.08)' : 'rgba(244, 63, 94, 0.08)',
        borderLeft: `4px solid ${isWin ? '#10b981' : '#f43f5e'}`,
        fontSize: '0.9rem',
        color: '#f8fafc',
        lineHeight: 1.5
      }}>
        {result.feedback}
      </div>

      {/* Forensic Breakdown / Explanation */}
      <div>
        <h4 style={{ fontSize: '0.9rem', color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <ShieldCheck size={16} />
          Forensic Explanation
        </h4>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          {result.explanation}
        </p>
      </div>

      {/* Red Flags review */}
      {result.redFlags && result.redFlags.length > 0 && (
        <div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
            <AlertTriangle size={14} color="#f59e0b" />
            Key Red Flags to Remember:
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {result.redFlags.map((flag, idx) => (
              <span key={idx} className="badge badge-amber" style={{ fontSize: '0.75rem' }}>
                {flag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
        <button
          onClick={onNext}
          className="btn btn-primary"
          style={{ flex: 1, padding: '0.85rem' }}
        >
          <span>Next Simulation Challenge</span>
          <ArrowRight size={18} />
        </button>

        {!isWin && onRetry && (
          <button
            onClick={onRetry}
            className="btn btn-outline"
            style={{ padding: '0.85rem 1.25rem' }}
          >
            <RotateCcw size={16} />
            <span>Retry</span>
          </button>
        )}
      </div>
    </div>
  );
}
