import React from 'react';

export default function RiskGauge({ score = 0, size = 180 }) {
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const safeScore = Math.min(100, Math.max(0, score));
  const strokeDashoffset = circumference - (safeScore / 100) * circumference;

  let strokeColor = '#10b981';
  let glowColor = 'rgba(16, 185, 129, 0.4)';
  let riskLabel = 'LOW RISK';

  if (safeScore >= 75) {
    strokeColor = '#f43f5e';
    glowColor = 'rgba(244, 63, 94, 0.4)';
    riskLabel = 'HIGH RISK';
  } else if (safeScore >= 45) {
    strokeColor = '#f59e0b';
    glowColor = 'rgba(245, 158, 11, 0.4)';
    riskLabel = 'MEDIUM RISK';
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Animated Progress Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          style={{
            transition: 'stroke-dashoffset 1s ease-in-out, stroke 0.5s ease',
            filter: `drop-shadow(0 0 10px ${glowColor})`
          }}
        />
      </svg>

      {/* Center Label */}
      <div style={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <span style={{
          fontSize: '2.5rem',
          fontWeight: 800,
          fontFamily: 'var(--font-heading)',
          color: strokeColor,
          lineHeight: 1
        }}>
          {safeScore}%
        </span>
        <span style={{
          fontSize: '0.75rem',
          fontWeight: 700,
          letterSpacing: '0.05em',
          color: 'var(--text-muted)',
          marginTop: '6px'
        }}>
          {riskLabel}
        </span>
      </div>
    </div>
  );
}
