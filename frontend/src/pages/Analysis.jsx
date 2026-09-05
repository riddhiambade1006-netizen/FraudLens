import React, { useState } from 'react';
import { 
  SearchCode, 
  Sparkles, 
  RotateCcw, 
  ShieldAlert, 
  ShieldCheck, 
  Copy, 
  AlertTriangle, 
  Check, 
  History,
  FileSearch,
  Zap
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { analyzeMessage } from '../services/analysisApi';
import RiskGauge from '../components/analysis/RiskGauge';
import RedFlagsList from '../components/analysis/RedFlagsList';
import RecommendationCard from '../components/analysis/RecommendationCard';
import Badge from '../components/common/Badge';

export default function Analysis() {
  const { addAnalysisRecord, analysisHistory } = useApp();

  const [inputMessage, setInputMessage] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const samplePresets = [
    {
      title: 'Urgent Bank KYC Link',
      text: 'Dear Customer, your HDFC Bank account will be deactivated within 12 hours. Update your PAN card and verify OTP immediately at https://hdfc-kyc-auth.cc/portal to avoid suspension.'
    },
    {
      title: 'YouTube / Telegram Job',
      text: 'Earn ₹12,000 daily from home! Watch and rate 5 videos per day. No experience needed. Pay ₹499 one-time refundable registration fee on UPI to get task access link.'
    },
    {
      title: 'Crypto 200% Profit',
      text: 'Guaranteed 200% profit in 48 hours! Zero risk crypto arbitrage bot. Join our exclusive WhatsApp syndicate and deposit 0.02 BTC to start earning passive income today.'
    },
    {
      title: 'Instant No-CIBIL Loan',
      text: 'Congratulations! Instant personal loan of ₹3,00,000 approved with 0% interest for 6 months. Pay documentation fee of ₹1,499 via UPI to disburse cash immediately.'
    },
    {
      title: 'Legitimate Electricity Bill',
      text: 'Your electricity bill for consumer account #98213824 has been paid. Amount: INR 2,140. Transaction Ref: TXN9281920. View your statement at official state power portal.'
    }
  ];

  const handleAnalyze = async (e) => {
    e?.preventDefault();
    if (!inputMessage.trim() || analyzing) return;

    setAnalyzing(true);
    setAnalysisResult(null);

    // Simulate scanning pass
    setTimeout(async () => {
      const res = await analyzeMessage(inputMessage);
      setAnalysisResult(res);
      setAnalyzing(false);

      if (res.success && res.analysis) {
        addAnalysisRecord({
          message: inputMessage,
          scamType: res.analysis.scam_type,
          riskLevel: res.analysis.risk_level,
          riskScore: res.analysis.risk_score,
          tactics: res.analysis.tactics
        });
      }
    }, 400);
  };

  const handleCopy = () => {
    if (!analysisResult) return;
    const summary = `FraudLens Analysis Report:
Scam Type: ${analysisResult.analysis?.scam_type}
Risk Score: ${analysisResult.analysis?.risk_score}% (${analysisResult.analysis?.risk_level} Risk)
Prediction: ${analysisResult.prediction?.prediction}
Recommended Action: ${analysisResult.analysis?.recommended_action}`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="page-container">
      <div className="container">
        {/* Title & Description */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div className="badge badge-cyan" style={{ marginBottom: '0.5rem' }}>
            <SearchCode size={12} />
            <span>Forensic Scam Detection</span>
          </div>
          <h1 style={{ fontSize: '2.25rem' }}>AI Message & URL Analyzer</h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
            Submit suspicious SMS, WhatsApp messages, emails, or job solicitations for instant multi-vector forensic scanning.
          </p>
        </div>

        {/* Preset quick buttons */}
        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, display: 'block', marginBottom: '0.6rem' }}>
            Test Known Scam Signatures:
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {samplePresets.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setInputMessage(preset.text);
                  setAnalysisResult(null);
                }}
                className="btn btn-outline"
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem', borderRadius: '10px' }}
              >
                <Zap size={13} color="var(--cyan)" />
                <span>{preset.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Analysis Form Card */}
        <div className="glass-card" style={{ padding: '2rem', marginBottom: '2.5rem' }}>
          <form onSubmit={handleAnalyze}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <label style={{ fontSize: '0.9rem', fontWeight: 600, color: '#f8fafc' }}>
                Paste Suspicious Text / Link
              </label>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                {inputMessage.length} characters
              </span>
            </div>

            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Paste any text message, email content, WhatsApp message, or payment request link here..."
              rows={5}
              style={{
                width: '100%',
                padding: '1.25rem',
                borderRadius: '14px',
                background: 'rgba(3, 7, 18, 0.7)',
                border: '1px solid var(--border-subtle)',
                color: '#ffffff',
                fontSize: '0.95rem',
                fontFamily: 'var(--font-sans)',
                resize: 'vertical',
                outline: 'none',
                lineHeight: 1.6,
                marginBottom: '1.25rem'
              }}
            />

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  type="button"
                  onClick={() => {
                    setInputMessage('');
                    setAnalysisResult(null);
                  }}
                  className="btn btn-outline"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
                >
                  <RotateCcw size={15} />
                  <span>Clear</span>
                </button>
              </div>

              <button
                type="submit"
                disabled={analyzing || !inputMessage.trim()}
                className="btn btn-primary"
                style={{ padding: '0.75rem 2rem', minWidth: '220px' }}
              >
                {analyzing ? (
                  <>
                    <span className="pulse-indicator pulse-live" />
                    <span>Analyzing Vectors...</span>
                  </>
                ) : (
                  <>
                    <SearchCode size={18} />
                    <span>Scan Message Now</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Forensic Results Section */}
        {analysisResult && analysisResult.analysis && (
          <div style={{ marginBottom: '3.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <FileSearch size={22} color="var(--cyan)" />
                <h2 style={{ fontSize: '1.5rem' }}>Forensic Scan Verdict</h2>
                <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>
                  {analysisResult.source === 'backend-api' ? 'Python AI Engine' : 'Client Heuristics'}
                </span>
              </div>

              <button
                onClick={handleCopy}
                className="btn btn-outline"
                style={{ padding: '0.45rem 0.85rem', fontSize: '0.8rem' }}
              >
                {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
                <span>{copied ? 'Copied Summary' : 'Copy Diagnosis'}</span>
              </button>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
              gap: '2rem',
              alignItems: 'start'
            }}>
              {/* Left Column: Risk Gauge & Classification */}
              <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ textAlign: 'center' }}>
                  <RiskGauge score={analysisResult.analysis.risk_score} size={200} />
                </div>

                <div style={{
                  padding: '1.25rem',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Classification</span>
                    <span style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>
                      {analysisResult.analysis.scam_type}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Severity Level</span>
                    <Badge level={analysisResult.analysis.risk_level} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Engine Confidence</span>
                    <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--cyan)', fontWeight: 700 }}>
                      {analysisResult.analysis.confidence}%
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Threat Prediction</span>
                    <span style={{ fontSize: '0.85rem', color: analysisResult.analysis.risk_level === 'High' ? '#fb7185' : '#34d399', fontWeight: 700 }}>
                      {analysisResult.prediction?.prediction || 'Evaluation Complete'}
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {analysisResult.analysis.explanation}
                </p>
              </div>

              {/* Right Column: Tactics, Red Flags & Recommendations */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="glass-card" style={{ padding: '1.75rem' }}>
                  <RedFlagsList
                    redFlags={analysisResult.analysis.red_flags}
                    tactics={analysisResult.analysis.tactics}
                  />
                </div>

                <RecommendationCard
                  recommendations={analysisResult.recommendations}
                  actionText={analysisResult.analysis.recommended_action}
                  riskLevel={analysisResult.analysis.risk_level}
                />
              </div>
            </div>
          </div>
        )}

        {/* Scan Audit History Section */}
        {analysisHistory && analysisHistory.length > 0 && (
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
              <History size={20} color="var(--cyan)" />
              <h3 style={{ fontSize: '1.2rem' }}>Recent Scans Log</h3>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="cyber-table">
                <thead>
                  <tr>
                    <th>Timestamp</th>
                    <th>Message Excerpt</th>
                    <th>Identified Type</th>
                    <th>Risk Score</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {analysisHistory.slice(0, 5).map((item) => (
                    <tr key={item.id}>
                      <td style={{ fontSize: '0.8rem', color: 'var(--text-dim)', whiteSpace: 'nowrap' }}>
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td style={{ maxWidth: '380px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.message}
                      </td>
                      <td>
                        <span style={{ fontWeight: 600 }}>{item.scamType}</span>
                      </td>
                      <td>
                        <Badge level={item.riskLevel} text={`${item.riskScore}% ${item.riskLevel}`} />
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            setInputMessage(item.message);
                            window.scrollTo({ top: 150, behavior: 'smooth' });
                          }}
                          className="btn btn-outline"
                          style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem' }}
                        >
                          Re-scan
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
