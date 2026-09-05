import React from 'react';
import { Shield, PhoneCall, ExternalLink, Lock, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(180deg, rgba(3, 7, 18, 0.4) 0%, #02040a 100%)',
      borderTop: '1px solid var(--border-subtle)',
      paddingTop: '3rem',
      paddingBottom: '2rem',
      marginTop: 'auto'
    }}>
      <div className="container">
        {/* Urgent Helpline Banner */}
        <div 
          className="glass-card" 
          style={{
            padding: '1.25rem 1.75rem',
            marginBottom: '3rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            borderColor: 'rgba(244, 63, 94, 0.3)',
            background: 'linear-gradient(90deg, rgba(244, 63, 94, 0.08) 0%, rgba(15, 23, 42, 0.6) 100%)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'rgba(244, 63, 94, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fb7185'
            }}>
              <PhoneCall size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '1rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Fell Victim to Financial Fraud? Act Fast!
                <span className="badge badge-rose" style={{ fontSize: '0.65rem' }}>GOLDEN HOUR</span>
              </h4>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                Dial <strong style={{ color: '#00f0ff' }}>1930</strong> immediately to freeze funds before mule routing, or report at <strong style={{ color: '#fff' }}>cybercrime.gov.in</strong>
              </p>
            </div>
          </div>
          <a
            href="https://cybercrime.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-danger"
            style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}
          >
            Report Cyber Fraud <ExternalLink size={14} />
          </a>
        </div>

        {/* Footer Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem'
        }}>
          {/* Col 1 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Shield size={22} color="var(--cyan)" />
              <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>FraudLens</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1rem' }}>
              Next-generation AI financial scam simulation and awareness engine. Educating individuals and enterprise teams to see through high-tech fraud before it strikes.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              <Lock size={14} />
              <span>Zero data harvesting. Safe sandbox analysis.</span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h5 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--cyan)', marginBottom: '1rem' }}>
              Platform Modules
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem' }}>
              <li><Link to="/simulator" style={{ color: 'var(--text-muted)', transition: '0.2s' }}>Scam Simulator Lab</Link></li>
              <li><Link to="/analysis" style={{ color: 'var(--text-muted)', transition: '0.2s' }}>AI Message & URL Analyzer</Link></li>
              <li><Link to="/dashboard" style={{ color: 'var(--text-muted)', transition: '0.2s' }}>Threat Radar & Metrics</Link></li>
              <li><Link to="/awareness" style={{ color: 'var(--text-muted)', transition: '0.2s' }}>Fraud Taxonomy Academy</Link></li>
              <li><Link to="/reports" style={{ color: 'var(--text-muted)', transition: '0.2s' }}>Audit Report Generator</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h5 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--cyan)', marginBottom: '1rem' }}>
              Scam Vectors Covered
            </h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              <li>Banking OTP & KYC Suspension Phishing</li>
              <li>UPI QR Code Reverse Payment Traps</li>
              <li>Prepaid Part-Time Video Liking Frauds</li>
              <li>Cryptocurrency Pig-Butchering Syndicates</li>
              <li>Fake Law Enforcement "Digital Arrests"</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h5 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--cyan)', marginBottom: '1rem' }}>
              Emergency Safety
            </h5>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem', lineHeight: '1.6' }}>
              If you accidentally entered your banking credentials or shared an OTP, immediately lock your debit card via your mobile banking app or SMS block service.
            </p>
            <div style={{
              padding: '0.75rem',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.8rem',
              color: 'var(--text-dim)'
            }}>
              <AlertTriangle size={14} color="#f59e0b" style={{ display: 'inline', marginRight: '6px' }} />
              Educational sandbox only. Never input actual bank passwords or credit card numbers.
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          paddingTop: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.8rem',
          color: 'var(--text-dim)'
        }}>
          <div>
            &copy; {new Date().getFullYear()} FraudLens Security Platform. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span>Built for Cyber Resilience & Public Awareness</span>
            <span style={{ color: 'var(--cyan)' }}>v2.0 Stable</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
