import React from 'react';
import { Smartphone, Shield, AlertTriangle, MessageSquare, Clock } from 'lucide-react';
import Badge from '../common/Badge';

export default function ScenarioCard({ scenario }) {
  if (!scenario) return null;

  return (
    <div className="phone-mockup">
      {/* Top phone notch */}
      <div className="phone-notch">
        <div className="phone-speaker" />
        <div className="phone-camera" />
      </div>

      <div className="phone-screen">
        {/* Phone Top Status Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '0.75rem',
          marginBottom: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'rgba(0, 240, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--cyan)'
            }}>
              <MessageSquare size={16} />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>
                {scenario.sender}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Clock size={10} />
                <span>{scenario.timestamp}</span>
              </div>
            </div>
          </div>
          <Badge level={scenario.difficulty === 'Hard' ? 'High' : scenario.difficulty === 'Medium' ? 'Medium' : 'Low'} text={scenario.difficulty} />
        </div>

        {/* Category banner */}
        <div style={{
          fontSize: '0.75rem',
          color: 'var(--cyan)',
          fontFamily: 'var(--font-mono)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '0.5rem'
        }}>
          {scenario.category} • Scenario #{scenario.id}
        </div>

        <h4 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '1rem' }}>
          {scenario.type}
        </h4>

        {/* Message Bubble inside Phone */}
        <div className={`message-bubble ${scenario.isScam ? 'suspicious' : ''}`} style={{ flex: 1 }}>
          <div className="message-sender">
            <span>INCOMING ALERT</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Via {scenario.senderType}</span>
          </div>
          <p style={{ fontSize: '0.95rem', color: '#f1f5f9', whiteSpace: 'pre-line' }}>
            {scenario.message}
          </p>
        </div>

        {/* Phone Bottom prompt */}
        <div style={{
          marginTop: '1.5rem',
          padding: '0.75rem',
          borderRadius: '12px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px dashed rgba(255, 255, 255, 0.1)',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: 'var(--text-muted)'
        }}>
          How will you respond to this message? Choose your decision below.
        </div>
      </div>
    </div>
  );
}
