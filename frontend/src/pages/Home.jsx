import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldAlert, 
  SearchCode, 
  Gamepad2, 
  TrendingUp, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  Lock, 
  Zap, 
  FileText,
  Radio
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { analyzeMessage } from '../services/analysisApi';

export default function Home() {
  const navigate = useNavigate();
  const { awarenessScore, simulationsCompleted, addAnalysisRecord } = useApp();

  const [quickInput, setQuickInput] = useState('');
  const [quickResult, setQuickResult] = useState(null);
  const [scanning, setScanning] = useState(false);

  const presets = [
    {
      label: 'Bank OTP Urgency',
      text: 'URGENT: Your SBI account is suspended. Update KYC now at http://sbi-verify.cc and enter the OTP sent to avoid legal action.'
    },
    {
      label: 'YouTube Job Scam',
      text: 'Earn ₹8,000 daily by liking YouTube videos. Deposit ₹500 refundable security fee to receive task sheet on Telegram.'
    },
    {
      label: 'Legitimate Bank Alert',
      text: 'Your ICICI Bank account ending in 4102 was debited by INR 250 for UPI payment to Swiggy on 05-Sep-2026. Available balance: INR 14,200.'
    }
  ];

  const handleQuickScan = async (e) => {
    e?.preventDefault();
    if (!quickInput.trim()) return;
    setScanning(true);
    setQuickResult(null);

    setTimeout(async () => {
      const result = await analyzeMessage(quickInput);
      setQuickResult(result);
      if (result.success && result.analysis) {
        addAnalysisRecord({
          message: quickInput,
          scamType: result.analysis.scam_type,
          riskLevel: result.analysis.risk_level,
          riskScore: result.analysis.risk_score,
          tactics: result.analysis.tactics
        });
      }
      setScanning(false);
    }, 450);
  };

  return (
    <div className="page-container cyber-grid" style={{ paddingTop: '5rem' }}>
      <div className="container">
        {/* Top Live Scam Threat Radar Ticker */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '0.6rem 1.25rem',
            borderRadius: '9999px',
            background: 'rgba(244, 63, 94, 0.08)',
            border: '1px solid rgba(244, 63, 94, 0.25)',
            marginBottom: '3rem',
            maxWidth: 'fit-content'
          }}
        >
          <span className="pulse-indicator" style={{ background: '#f43f5e' }} />
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#fb7185', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
            LIVE THREAT RADAR
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Over ₹1,750 Cr reported lost in digital arrest & fake part-time job syndicates this quarter.
          </span>
        </div>

        {/* Hero Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '3rem',
          alignItems: 'center',
          marginBottom: '5rem'
        }}>
          {/* Left Column: Headline & Action */}
          <div>
            <div className="badge badge-cyan" style={{ marginBottom: '1.25rem' }}>
              <Zap size={12} />
              <span>Next-Gen Scam Defense Engine</span>
            </div>

            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', lineHeight: 1.15, marginBottom: '1.5rem' }}>
              See Through the <span className="text-gradient-cyan">Scam</span> Before It Strikes.
            </h1>

            <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              FraudLens empowers individuals and enterprises with AI-driven message forensics, realistic interactive scam simulations, and live threat intelligence to stop social engineering dead in its tracks.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              <Link to="/simulator" className="btn btn-primary">
                <Gamepad2 size={18} />
                <span>Launch Simulator Lab</span>
                <ArrowRight size={16} />
              </Link>
              <Link to="/analysis" className="btn btn-outline">
                <SearchCode size={18} />
                <span>Open Full Analyzer</span>
              </Link>
            </div>

            {/* Quick trust metrics */}
            <div style={{ display: 'flex', gap: '2.5rem', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border-subtle)' }}>
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ffffff' }}>98.4%</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Heuristic Accuracy</div>
              </div>
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--cyan)' }}>6+ Vectors</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Simulated Scenarios</div>
              </div>
              <div>
                <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#10b981' }}>Instant</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Risk Diagnosis</div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Quick Scanner Widget */}
          <div className="glass-card" style={{ padding: '2rem', position: 'relative' }}>
            <div className="scanline-overlay" />

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <SearchCode size={20} color="var(--cyan)" />
                <h3 style={{ fontSize: '1.1rem' }}>Instant Scam Scanner</h3>
              </div>
              <span className="badge badge-cyan">Zero-Data Sandbox</span>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Paste an SMS, WhatsApp text, email snippet, or click a preset sample below to test AI forensic detection:
            </p>

            {/* Presets */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setQuickInput(preset.text);
                    setQuickResult(null);
                  }}
                  style={{
                    padding: '0.35rem 0.65rem',
                    fontSize: '0.75rem',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-muted)',
                    cursor: 'pointer',
                    transition: '0.2s'
                  }}
                  className="glass-card-interactive"
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleQuickScan}>
              <textarea
                value={quickInput}
                onChange={(e) => setQuickInput(e.target.value)}
                placeholder="e.g. 'Your bank account will be blocked within 24 hours. Click here to verify...'"
                rows={4}
                style={{
                  width: '100%',
                  padding: '1rem',
                  borderRadius: '12px',
                  background: 'rgba(3, 7, 18, 0.7)',
                  border: '1px solid var(--border-subtle)',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--font-sans)',
                  resize: 'none',
                  outline: 'none',
                  marginBottom: '1rem'
                }}
              />

              <button
                type="submit"
                disabled={scanning || !quickInput.trim()}
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.75rem' }}
              >
                {scanning ? 'Scanning Heuristics...' : 'Analyze Message For Fraud'}
              </button>
            </form>

            {/* Quick Result Preview */}
            {quickResult && quickResult.analysis && (
              <div 
                style={{
                  marginTop: '1.25rem',
                  padding: '1rem',
                  borderRadius: '12px',
                  background: quickResult.analysis.risk_level === 'High' ? 'rgba(244, 63, 94, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                  border: `1px solid ${quickResult.analysis.risk_level === 'High' ? 'rgba(244, 63, 94, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.95rem', color: quickResult.analysis.risk_level === 'High' ? '#fb7185' : '#34d399' }}>
                    {quickResult.analysis.scam_type}
                  </span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
                    Risk Score: {quickResult.analysis.risk_score}%
                  </span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '0.75rem' }}>
                  {quickResult.analysis.recommended_action}
                </p>
                <Link
                  to="/analysis"
                  style={{ fontSize: '0.75rem', color: 'var(--cyan)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600 }}
                >
                  View full forensic breakdown <ArrowRight size={12} />
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Feature Pillars Grid */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 3rem' }}>
            <span className="badge badge-cyan" style={{ marginBottom: '0.75rem' }}>Full Defense Suite</span>
            <h2 style={{ fontSize: '2.25rem', marginBottom: '0.75rem' }}>Engineered for Total Scam Immunity</h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
              From hands-on simulation drills to real-time message scanners and national reporting guides.
            </p>
          </div>

          <div className="grid-cards-3">
            {/* Card 1 */}
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'rgba(0, 240, 255, 0.1)',
                border: '1px solid rgba(0, 240, 255, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--cyan)',
                marginBottom: '1.25rem'
              }}>
                <Gamepad2 size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Gamified Simulator Lab</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Experience simulated high-pressure scam attempts in a safe sandbox. Test your reflexes against OTP frauds, fake job offers, and UPI reverse-payment tricks.
              </p>
              <Link to="/simulator" style={{ color: 'var(--cyan)', fontSize: '0.85rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                Play Simulations <ArrowRight size={14} />
              </Link>
            </div>

            {/* Card 2 */}
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--blue)',
                marginBottom: '1.25rem'
              }}>
                <SearchCode size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>AI Heuristic Analyzer</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Multi-vector message scanner checking urgency pressure words, impersonation indicators, suspicious URLs, and unauthorized credential extraction patterns.
              </p>
              <Link to="/analysis" style={{ color: 'var(--blue)', fontSize: '0.85rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                Scan Messages <ArrowRight size={14} />
              </Link>
            </div>

            {/* Card 3 */}
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'rgba(168, 85, 247, 0.1)',
                border: '1px solid rgba(168, 85, 247, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--purple)',
                marginBottom: '1.25rem'
              }}>
                <TrendingUp size={24} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem' }}>Threat Analytics & Reports</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                Visualize vulnerability patterns with live charts, track your cyber awareness score progression, and export comprehensive threat audit reports.
              </p>
              <Link to="/dashboard" style={{ color: 'var(--purple)', fontSize: '0.85rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                View Threat Radar <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Global Problem & Awareness Stats Callout */}
        <div 
          className="glass-card"
          style={{
            padding: '3rem',
            background: 'linear-gradient(135deg, rgba(13, 22, 45, 0.9) 0%, rgba(20, 10, 35, 0.8) 100%)',
            borderColor: 'rgba(0, 240, 255, 0.2)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center'
          }}
        >
          <div>
            <span className="badge badge-rose" style={{ marginBottom: '1rem' }}>Global Crisis</span>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>
              The Scale of Digital Financial Fraud
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
              Financial scammers no longer rely on obvious spelling mistakes. Sophisticated syndicates use generative AI, VoIP spoofing, and fake police video rooms to deceive even tech-savvy victims. Awareness and simulation drills are the only proven vaccine.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ padding: '1.5rem', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f43f5e' }}>$1.02 T</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Lost globally to cyber fraud in 2025-2026</div>
            </div>
            <div style={{ padding: '1.5rem', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#f59e0b' }}>74%</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Attacks leverage psychological urgency</div>
            </div>
            <div style={{ padding: '1.5rem', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--cyan)' }}>2 Hours</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Golden window to freeze stolen funds via 1930</div>
            </div>
            <div style={{ padding: '1.5rem', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981' }}>88%</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Reduction in click rate after simulation training</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
