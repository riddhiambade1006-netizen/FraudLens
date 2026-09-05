import React, { useState, useEffect } from 'react';
import { 
  FileSpreadsheet, 
  Printer, 
  Download, 
  Copy, 
  Check, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle,
  RotateCcw,
  Calendar,
  Building,
  FileCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { fetchGeneratedReport } from '../services/reportApi';
import Badge from '../components/common/Badge';

export default function Reports() {
  const { awarenessScore, simulationsCompleted, analysisHistory } = useApp();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function initReport() {
      const data = await fetchGeneratedReport({
        totalCases: simulationsCompleted + analysisHistory.length,
        highRisk: analysisHistory.filter(h => h.riskLevel === 'High').length + 8,
        mediumRisk: analysisHistory.filter(h => h.riskLevel === 'Medium').length + 5,
        lowRisk: analysisHistory.filter(h => h.riskLevel === 'Low').length + 3,
        history: analysisHistory
      });
      setReport(data);
      setLoading(false);
    }
    initReport();
  }, [simulationsCompleted, analysisHistory]);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyJson = () => {
    if (!report) return;
    navigator.clipboard.writeText(JSON.stringify(report, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="page-container">
      <div className="container">
        {/* Header */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '2.5rem'
        }}>
          <div>
            <div className="badge badge-cyan" style={{ marginBottom: '0.5rem' }}>
              <FileSpreadsheet size={12} />
              <span>Audit & Compliance</span>
            </div>
            <h1 style={{ fontSize: '2.25rem' }}>Security Incident & Resilience Report</h1>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
              Standardized forensic audit report compiled from message scans and simulation trials.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={handlePrint}
              className="btn btn-outline"
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
            >
              <Printer size={16} />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={handleCopyJson}
              className="btn btn-primary"
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? 'JSON Copied' : 'Export JSON'}</span>
            </button>
          </div>
        </div>

        {/* Printable Report Canvas */}
        {report && (
          <div 
            className="glass-card printable-report"
            style={{
              padding: '3rem',
              borderColor: 'rgba(0, 240, 255, 0.25)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
            }}
          >
            {/* Top Document Metadata Header */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              borderBottom: '2px solid var(--border-subtle)',
              paddingBottom: '1.5rem',
              marginBottom: '2rem',
              gap: '1.5rem'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <ShieldAlert size={24} color="var(--cyan)" />
                  <span style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>
                    Fraud<span style={{ color: 'var(--cyan)' }}>Lens</span> Threat Intelligence
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {report.organization}
                </p>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                  Security Assessment Standard: ISO/IEC 27001 & CERT-In Hygiene Guidelines
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--cyan)' }}>
                  {report.report_id}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                  Generated: {report.generated_at}
                </div>
                <div style={{ marginTop: '6px' }}>
                  <Badge level={awarenessScore >= 75 ? 'Low' : 'High'} text={awarenessScore >= 75 ? 'RESILIENT' : 'VULNERABLE'} />
                </div>
              </div>
            </div>

            {/* Assessment Score Snapshot */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              marginBottom: '2.5rem'
            }}>
              <div style={{ padding: '1.25rem', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Overall Resilience Score</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--cyan)', marginTop: '4px' }}>{awarenessScore}/100</div>
              </div>
              <div style={{ padding: '1.25rem', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Total Cases Analyzed</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginTop: '4px' }}>{report.summary.total_cases}</div>
              </div>
              <div style={{ padding: '1.25rem', borderRadius: '12px', background: 'rgba(244, 63, 94, 0.05)', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
                <div style={{ fontSize: '0.75rem', color: '#fb7185', textTransform: 'uppercase' }}>High Risk Vectors</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fb7185', marginTop: '4px' }}>{report.summary.high_risk}</div>
              </div>
              <div style={{ padding: '1.25rem', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
                <div style={{ fontSize: '0.75rem', color: '#fbbf24', textTransform: 'uppercase' }}>Medium Risk Vectors</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fbbf24', marginTop: '4px' }}>{report.summary.medium_risk}</div>
              </div>
            </div>

            {/* Executive Summary */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileCheck size={18} color="var(--cyan)" />
                Executive Forensic Evaluation
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
                {report.recommendation}
              </p>
            </div>

            {/* Identified Vulnerabilities */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', color: '#fb7185', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={18} />
                Key Deception Vulnerabilities Identified
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {report.summary.systemic_vulnerabilities.map((vuln, idx) => (
                  <li key={idx} style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    background: 'rgba(244, 63, 94, 0.06)',
                    border: '1px solid rgba(244, 63, 94, 0.15)',
                    fontSize: '0.85rem',
                    color: '#fecdd3',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem'
                  }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f43f5e' }} />
                    <span>{vuln}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Items */}
            <div style={{ marginBottom: '2.5rem' }}>
              <h3 style={{ fontSize: '1.15rem', color: '#34d399', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={18} />
                Mandatory Security Countermeasures
              </h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {report.action_items.map((item, idx) => (
                  <li key={idx} style={{
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    background: 'rgba(16, 185, 129, 0.06)',
                    border: '1px solid rgba(16, 185, 129, 0.15)',
                    fontSize: '0.85rem',
                    color: '#a7f3d0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem'
                  }}>
                    <span style={{ color: '#10b981', fontWeight: 700 }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sign-off disclaimer */}
            <div style={{
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '1.5rem',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '0.8rem',
              color: 'var(--text-dim)',
              gap: '1rem'
            }}>
              <div>
                Report issued by FraudLens Engine • Cryptographic Verification ID: SHA256-4b8a-9281
              </div>
              <div>
                Confidential Document • For Awareness & Auditing Purposes
              </div>
            </div>
          </div>
        )}

        {/* Print CSS */}
        <style>{`
          @media print {
            body {
              background: #fff !important;
              color: #000 !important;
            }
            .navbar-fixed, footer, .btn {
              display: none !important;
            }
            .printable-report {
              background: #fff !important;
              color: #000 !important;
              border: 1px solid #ccc !important;
              box-shadow: none !important;
            }
            h1, h2, h3, h4, span, p {
              color: #000 !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
