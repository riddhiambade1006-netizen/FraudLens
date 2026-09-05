import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ShieldAlert, 
  Gamepad2, 
  SearchCode, 
  LayoutDashboard, 
  GraduationCap, 
  FileSpreadsheet, 
  Menu, 
  X, 
  Activity, 
  Award,
  Radio
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { awarenessScore, isBackendOnline } = useApp();

  const navLinks = [
    { path: '/', label: 'Home', icon: ShieldAlert },
    { path: '/simulator', label: 'Simulator Lab', icon: Gamepad2 },
    { path: '/analysis', label: 'AI Analyzer', icon: SearchCode },
    { path: '/dashboard', label: 'Threat Radar', icon: LayoutDashboard },
    { path: '/awareness', label: 'Academy', icon: GraduationCap },
    { path: '/reports', label: 'Audit Reports', icon: FileSpreadsheet },
  ];

  return (
    <header className="navbar-fixed">
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #00f0ff 0%, #3b82f6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.4)'
          }}>
            <ShieldAlert size={24} color="#030712" strokeWidth={2.5} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#ffffff' }}>
                Fraud<span style={{ color: 'var(--cyan)' }}>Lens</span>
              </span>
              <span className="badge badge-cyan" style={{ fontSize: '0.65rem', padding: '0.15rem 0.45rem' }}>
                v2.0
              </span>
            </div>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '-2px' }}>
              See Through The Scam
            </p>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav style={{ display: 'none', gap: '0.25rem' }} className="desktop-nav">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Status Indicators & Score */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Backend Status Pill */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.75rem',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.75rem',
              color: 'var(--text-muted)'
            }}
            title={isBackendOnline ? 'Connected to Python Backend Server (Port 5000)' : 'Running Client-Side AI Detection Engine'}
          >
            <span className={`pulse-indicator ${isBackendOnline ? 'pulse-live' : 'pulse-demo'}`} />
            <span style={{ fontFamily: 'var(--font-mono)' }}>
              {isBackendOnline ? 'BACKEND LIVE' : 'CLIENT AI'}
            </span>
          </div>

          {/* User Awareness Score Badge */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.85rem',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)',
              border: '1px solid rgba(0, 240, 255, 0.3)',
              boxShadow: '0 0 15px rgba(0, 240, 255, 0.15)'
            }}
          >
            <Award size={15} color="var(--cyan)" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--cyan)', fontFamily: 'var(--font-mono)' }}>
              {awarenessScore} <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>SCORE</span>
            </span>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#fff',
              cursor: 'pointer',
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            className="mobile-nav-toggle"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div 
          style={{
            background: 'rgba(3, 7, 18, 0.98)',
            borderBottom: '1px solid var(--border-subtle)',
            padding: '1rem 1.5rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}
        >
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`nav-link ${isActive ? 'active' : ''}`}
                style={{ padding: '0.75rem 1rem' }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      )}

      {/* Responsive media query helper styles */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-nav-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
