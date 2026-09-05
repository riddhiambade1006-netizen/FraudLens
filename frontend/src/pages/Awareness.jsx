import React, { useState } from 'react';
import { 
  GraduationCap, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  PhoneCall, 
  ExternalLink, 
  FileText, 
  Lock, 
  ArrowRight,
  BookOpen,
  PlayCircle,
  HelpCircle,
  Clock
} from 'lucide-react';
import Badge from '../components/common/Badge';

export default function Awareness() {
  const [activeTab, setActiveTab] = useState('otp');

  const scamTaxonomy = [
    {
      id: 'otp',
      name: 'Banking & OTP Frauds',
      risk: 'High',
      tagline: 'Phishing URLs & Impersonated Bank KYC Alerts',
      modus: 'Fraudsters impersonate bank security or RBI officials via SMS or WhatsApp, warning of impending account deactivation. They provide a cloned portal link requesting internet banking passwords and OTPs.',
      redFlags: [
        'Urgency: Threats to freeze accounts within 2 to 24 hours.',
        'Shortened or spoofed URLs ending with .cc, .xyz, or .top.',
        'Requests for 2FA one-time passwords or ATM PINs.',
        'Calls from standard 10-digit mobile numbers claiming to be "Head Office".'
      ],
      countermeasures: [
        'Banks never ask for OTPs or PINs over telephone, email, or messaging.',
        'Never click on links received via SMS to update KYC or PAN.',
        'Access your bank only via official bookmarked portals or verified mobile apps.'
      ]
    },
    {
      id: 'upi',
      name: 'UPI Reverse Payment / QR Traps',
      risk: 'High',
      tagline: 'Deceptive QR Codes & Collect Requests',
      modus: 'Scammers pose as buyers on OLX/Marketplace or claim to issue refunds. They send a QR code or initiate a "Collect Request", instructing the victim to enter their UPI PIN to "receive payment".',
      redFlags: [
        'Claims that scanning a QR code is mandatory to receive money into your bank.',
        'Instructs you to enter your 4-digit or 6-digit UPI PIN to "verify" or "accept" funds.',
        'High pressure from the buyer urging you to confirm immediately.'
      ],
      countermeasures: [
        'Entering your UPI PIN ALWAYS debits money from your account. PIN is NEVER required to receive money.',
        'Never scan any QR code sent by a buyer or stranger.',
        'Decline any unexpected UPI collect requests immediately.'
      ]
    },
    {
      id: 'job',
      name: 'Part-Time Task & Telegram Job Scams',
      risk: 'Medium',
      tagline: 'Paid Video Ratings & Prepaid Crypto Task Traps',
      modus: 'Victims are recruited via WhatsApp/Telegram with promises of ₹5,000–₹15,000/day for liking YouTube videos, rating Google Maps listings, or reviewing hotels. After small initial payouts, victims are pressured into depositing large sums for "VIP tasks".',
      redFlags: [
        'Unsolicited job offers from international country codes (+62, +84, etc.).',
        'Abnormally high compensation for basic menial digital tasks.',
        'Requirement to deposit "security money" or "prepaid recharge" before withdrawals.'
      ],
      countermeasures: [
        'Legitimate corporations never recruit via Telegram or charge candidates for work assignments.',
        'Any demand to deposit money in order to withdraw earnings is 100% fraud.',
        'Block and report the contact immediately.'
      ]
    },
    {
      id: 'digital_arrest',
      name: 'Digital Arrest & Law Enforcement Impersonation',
      risk: 'High',
      tagline: 'Fake Police Video Calls & Customs Extortion',
      modus: 'Scammers impersonate FedEx, Mumbai Police, or CBI officials. They allege a parcel registered with the victim’s Aadhaar contains illicit drugs. They subject the victim to simulated Skype/WhatsApp video interrogations and demand fund transfers to "escrow" accounts.',
      redFlags: [
        'Demands to remain on continuous video call or "digital arrest".',
        'Official-looking fake police badges, logos, and staged background courtrooms.',
        'Direct requests to transfer funds to personal or "government audit" bank accounts.'
      ],
      countermeasures: [
        'Indian law enforcement agencies NEVER arrest or interrogate citizens over video call.',
        'No government agency has "RBI verification accounts" that accept private wire transfers.',
        'Immediately disconnect the call and dial 1930.'
      ]
    },
    {
      id: 'crypto',
      name: 'Pig Butchering & Fake Investment Bots',
      risk: 'High',
      tagline: 'Guaranteed Returns & Rigged Trading Portals',
      modus: 'Syndicates build romantic or friendly rapport over weeks before introducing an "insider algorithmic trading bot" promising 20%–50% weekly returns. The platform displays fabricated profits until the victim attempts withdrawal, at which point exorbitant taxes are demanded.',
      redFlags: [
        'Unsolicited financial advice from online acquaintances.',
        'Promises of guaranteed returns with "zero market risk".',
        'Trading occurs exclusively on unverified APK apps or obscure domains.'
      ],
      countermeasures: [
        'Never invest funds through platforms recommended by unknown social media contacts.',
        'Check SEBI / regulatory registers before depositing with any brokerage.',
        'Remember: High returns inherently mean high risk. Guaranteed returns are fraudulent.'
      ]
    }
  ];

  const currentScam = scamTaxonomy.find(s => s.id === activeTab) || scamTaxonomy[0];

  const goldenRules = [
    {
      title: 'The PIN Secrecy Rule',
      desc: 'Your UPI PIN is solely for transferring money OUT. You never enter a PIN to receive money or refunds.'
    },
    {
      title: 'Zero-Trust Communication',
      desc: 'Never click links sent via SMS claiming your account is blocked. Verify independently via the bank mobile app.'
    },
    {
      title: 'The Golden Two-Hour Window',
      desc: 'If unauthorized transactions occur, report immediately to 1930. Funds can be frozen before mule withdrawal.'
    },
    {
      title: 'No Advance Employment Fees',
      desc: 'No genuine company asks prospective employees to pay registration deposits or task activation fees.'
    },
    {
      title: 'No Remote Control Apps',
      desc: 'Never install AnyDesk, TeamViewer, or QuickSupport on instructions from customer care callers.'
    },
    {
      title: 'Official Helpline Verification',
      desc: 'Never google customer care numbers (often poisoned with SEO scam ads). Use numbers on your physical card.'
    }
  ];

  return (
    <div className="page-container">
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div className="badge badge-cyan" style={{ marginBottom: '0.5rem' }}>
            <GraduationCap size={12} />
            <span>Fraud Taxonomy & Playbooks</span>
          </div>
          <h1 style={{ fontSize: '2.25rem' }}>Scam Awareness Academy</h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
            Equip yourself with forensic awareness of contemporary cyber scams and tactical emergency response checklists.
          </p>
        </div>

        {/* Golden Rules Grid */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <BookOpen size={20} color="var(--cyan)" />
            <h2 style={{ fontSize: '1.4rem' }}>6 Golden Rules of Financial Cyber Defense</h2>
          </div>

          <div className="grid-cards-3">
            {goldenRules.map((rule, idx) => (
              <div key={idx} className="glass-card" style={{ padding: '1.5rem' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(0, 240, 255, 0.1)',
                  color: 'var(--cyan)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-mono)',
                  marginBottom: '0.75rem'
                }}>
                  0{idx + 1}
                </div>
                <h3 style={{ fontSize: '1.05rem', marginBottom: '0.5rem', color: '#fff' }}>
                  {rule.title}
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {rule.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scam Taxonomy Deep-Dive Tabs */}
        <div style={{ marginBottom: '3.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <ShieldAlert size={20} color="var(--cyan)" />
            <h2 style={{ fontSize: '1.4rem' }}>Scam Vector Encyclopedia</h2>
          </div>

          {/* Tab Selector */}
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
            paddingBottom: '0.75rem',
            marginBottom: '1.5rem'
          }}>
            {scamTaxonomy.map((scam) => (
              <button
                key={scam.id}
                onClick={() => setActiveTab(scam.id)}
                className={`tab-pill ${activeTab === scam.id ? 'active' : ''}`}
                style={{ whiteSpace: 'nowrap' }}
              >
                {scam.name}
              </button>
            ))}
          </div>

          {/* Active Scam Vector Card */}
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.6rem', color: '#ffffff' }}>{currentScam.name}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--cyan)', fontFamily: 'var(--font-mono)' }}>{currentScam.tagline}</p>
              </div>
              <Badge level={currentScam.risk} size="md" />
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{ fontSize: '0.85rem', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                Modus Operandi
              </h4>
              <p style={{ fontSize: '0.95rem', color: '#e2e8f0', lineHeight: 1.7 }}>
                {currentScam.modus}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              {/* Red Flags */}
              <div style={{
                padding: '1.5rem',
                borderRadius: '14px',
                background: 'rgba(244, 63, 94, 0.05)',
                border: '1px solid rgba(244, 63, 94, 0.2)'
              }}>
                <h4 style={{ fontSize: '0.95rem', color: '#fb7185', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <AlertTriangle size={16} />
                  Signature Red Flags
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {currentScam.redFlags.map((flag, idx) => (
                    <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', lineHeight: 1.5 }}>
                      <span style={{ color: '#f43f5e', fontWeight: 700 }}>•</span>
                      <span>{flag}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Countermeasures */}
              <div style={{
                padding: '1.5rem',
                borderRadius: '14px',
                background: 'rgba(16, 185, 129, 0.05)',
                border: '1px solid rgba(16, 185, 129, 0.2)'
              }}>
                <h4 style={{ fontSize: '0.95rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <CheckCircle2 size={16} />
                  Defensive Countermeasures
                </h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {currentScam.countermeasures.map((cm, idx) => (
                    <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'flex-start', gap: '0.5rem', lineHeight: 1.5 }}>
                      <span style={{ color: '#10b981', fontWeight: 700 }}>✓</span>
                      <span>{cm}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Response Playbook */}
        <div className="glass-card" style={{ padding: '2.5rem', borderColor: 'rgba(0, 240, 255, 0.3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(0, 240, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--cyan)'
            }}>
              <PhoneCall size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.4rem' }}>Victim Emergency Response Protocol</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Step-by-step containment instructions if money was debited or credentials leaked.
              </p>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {/* Step 1 */}
            <div style={{ padding: '1.25rem', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--cyan)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>STEP 1: MINUTES 0-15</div>
              <h4 style={{ fontSize: '1rem', margin: '0.5rem 0', color: '#fff' }}>Freeze Bank Account</h4>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Open your bank app, instantly lock all debit/credit cards, and block netbanking access via SMS shortcode.
              </p>
            </div>

            {/* Step 2 */}
            <div style={{ padding: '1.25rem', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', color: '#fb7185', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>STEP 2: WITHIN 2 HOURS</div>
              <h4 style={{ fontSize: '1rem', margin: '0.5rem 0', color: '#fff' }}>Call Helpline 1930</h4>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Dial national toll-free helpline 1930. Provide transaction ID, debit time, and beneficiary account to trigger mule freeze.
              </p>
            </div>

            {/* Step 3 */}
            <div style={{ padding: '1.25rem', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--cyan)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>STEP 3: WITHIN 24 HOURS</div>
              <h4 style={{ fontSize: '1rem', margin: '0.5rem 0', color: '#fff' }}>File Incident on Portal</h4>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Submit full screenshots, SMS transcripts, and transaction receipts at cybercrime.gov.in to obtain formal FIR acknowledgement.
              </p>
            </div>

            {/* Step 4 */}
            <div style={{ padding: '1.25rem', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--cyan)', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>STEP 4: DEVICE CLEANUP</div>
              <h4 style={{ fontSize: '1rem', margin: '0.5rem 0', color: '#fff' }}>Audit Remote Software</h4>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Uninstall any remote screen-sharing tools (AnyDesk, TeamViewer) and run an antivirus scan for malicious sideloaded APKs.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Official Portal: Ministry of Home Affairs, Indian Cybercrime Coordination Centre (I4C)
            </span>
            <a
              href="https://cybercrime.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ padding: '0.65rem 1.5rem', fontSize: '0.85rem' }}
            >
              <span>Visit cybercrime.gov.in</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
