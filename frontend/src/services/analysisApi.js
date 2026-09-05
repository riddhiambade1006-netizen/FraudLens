import api from './api';

// Fallback client-side Scam Detection Engine matching backend/ai/detection.py
export function clientSideScamDetector(message) {
  if (!message || !message.trim()) {
    return {
      success: false,
      error: 'Empty message provided'
    };
  }

  const messageLower = message.toLowerCase();
  let detectedType = 'Unknown / Suspicious';
  let riskScore = 0;
  const redFlags = new Set();
  const tactics = new Set();

  const scamPatterns = {
    'Phishing': [
      'verify account',
      'click here',
      'login now',
      'update account',
      'suspicious activity',
      'kyc',
      'pan card',
      'verify identity'
    ],
    'OTP Scam': [
      'otp',
      'share code',
      'verification code',
      'one time password',
      'send otp'
    ],
    'UPI Scam': [
      'upi',
      'collect request',
      'payment request',
      'scan qr',
      'receive money',
      'enter upi pin',
      'gpay',
      'phonepe'
    ],
    'Investment Scam': [
      'guaranteed return',
      'double your money',
      '100% profit',
      'investment opportunity',
      'crypto trading',
      'daily return'
    ],
    'Loan Scam': [
      'instant loan',
      'loan approved',
      'processing fee',
      'quick loan',
      'no cibil required'
    ],
    'Job Scam': [
      'work from home',
      'earn daily',
      'easy income',
      'job offer',
      'part time job',
      'like videos',
      'telegram job'
    ],
    'Lottery Scam': [
      'congratulations',
      'lottery',
      'lucky draw',
      'won',
      'claim prize'
    ]
  };

  let maxMatches = 0;
  for (const [scamType, keywords] of Object.entries(scamPatterns)) {
    const matches = keywords.filter(keyword => messageLower.includes(keyword)).length;
    if (matches > 0) {
      if (matches > maxMatches) {
        maxMatches = matches;
        detectedType = scamType;
      }
      riskScore += matches * 15;
    }
  }

  // Urgency Detection
  const urgencyWords = ['urgent', 'immediately', 'now', 'within', 'limited time', 'expire', 'suspended', '24 hours', 'blocked'];
  if (urgencyWords.some(word => messageLower.includes(word))) {
    riskScore += 20;
    redFlags.add('Urgent / coercive language');
    tactics.add('Urgency Pressure');
  }

  // Link Detection
  if (/https?:\/\/|www\.|\.cc\/|\.xyz\/|\.top\/|\.link\//i.test(messageLower)) {
    riskScore += 20;
    redFlags.add('Suspicious external hyperlink');
    tactics.add('Redirection & Phishing Link');
  }

  // Sensitive Info Request
  const sensitiveKeywords = ['password', 'otp', 'pin', 'bank account', 'cvv', 'card number', 'atm pin'];
  if (sensitiveKeywords.some(word => messageLower.includes(word))) {
    riskScore += 25;
    redFlags.add('Requests sensitive financial credentials (OTP / PIN)');
    tactics.add('Credential Theft');
  }

  // Impersonation
  const impersonationWords = ['bank', 'support', 'customer care', 'government', 'rbi', 'income tax', 'fedex', 'customs'];
  if (impersonationWords.some(word => messageLower.includes(word))) {
    riskScore += 15;
    redFlags.add('Impersonates official authority / bank entity');
    tactics.add('Authority Impersonation');
  }

  // If no red flags matched and low score, consider Legitimate
  if (riskScore === 0) {
    detectedType = 'Legitimate / Neutral';
    riskScore = 5;
  }

  // Cap score
  riskScore = Math.min(riskScore, 98);

  let riskLevel = 'Low';
  if (riskScore >= 75) {
    riskLevel = 'High';
  } else if (riskScore >= 45) {
    riskLevel = 'Medium';
  }

  const confidence = Math.min(riskScore + 8, 99);

  const recommendations = {
    High: [
      'Do NOT click any embedded links or phone numbers.',
      'Never disclose OTPs, PINs, or banking passwords to anyone.',
      'Block and report the sender on your messaging app immediately.',
      'Call official bank customer care directly from the official mobile app or bank statement.'
    ],
    Medium: [
      'Proceed with extreme vigilance; verify the sender address or number.',
      'Confirm the transaction or request through a known secondary channel.',
      'Do not download unverified attachments or APK files.'
    ],
    Low: [
      'Standard message indicators appear benign.',
      'Always maintain cyber hygiene and verify unexpected payment links.'
    ]
  };

  const predictions = {
    High: { prediction: 'High Fraud Risk', action: 'Block and Report Immediately' },
    Medium: { prediction: 'Medium Fraud Risk', action: 'Verify Identity Before Proceeding' },
    Low: { prediction: 'Low Fraud Risk', action: 'Safe to Proceed with Caution' }
  };

  return {
    success: true,
    source: 'client-engine',
    analysis: {
      scam_type: detectedType,
      risk_level: riskLevel,
      risk_score: riskScore,
      confidence: confidence,
      red_flags: Array.from(redFlags),
      tactics: Array.from(tactics),
      explanation: 'Evaluated against multi-vector scam heuristics: heuristic keyword density, urgency triggers, spoofed authorities, and credential extraction signals.',
      recommended_action: riskLevel === 'High' ? 'Block sender and report to 1930 National Cyber Crime Portal.' : 'Verify independently.'
    },
    prediction: predictions[riskLevel],
    recommendations: recommendations[riskLevel]
  };
}

export async function analyzeMessage(message) {
  try {
    const response = await api.post('/analysis/analyze', { message });
    if (response.data && response.data.success) {
      return {
        ...response.data,
        source: 'backend-api'
      };
    }
  } catch (error) {
    // Graceful fallback to client detection
  }
  return clientSideScamDetector(message);
}
