import api from './api';

export const SCENARIO_DATABASE = [
  {
    id: 1,
    category: 'Banking / OTP',
    type: 'Bank Account Suspension OTP Scam',
    difficulty: 'Easy',
    sender: 'HDFC-ALERT / +91 98210-XXXXX',
    senderType: 'SMS',
    timestamp: 'Today, 11:42 AM',
    message: 'Dear Customer, your HDFC Bank account will be BLOCKED within 2 hours due to pending PAN KYC. Click http://hdfc-pan-update.cc immediately and submit the 6-digit OTP sent to your phone to prevent account deactivation.',
    isScam: true,
    correctActionId: 'action-2',
    explanation: 'Banks never send shortened or unofficial URLs (like .cc domains) or threaten immediate suspension demanding an OTP. OTPs are ONLY for authorizing transactions or password resets, never for identity verification.',
    redFlags: [
      'Urgency tactic ("BLOCKED within 2 hours")',
      'Unofficial domain (hdfc-pan-update.cc)',
      'Request to share OTP',
      'Generic greeting ("Dear Customer")'
    ],
    choices: [
      {
        id: 'action-1',
        text: 'Click the link and submit OTP right away to keep account active',
        isCorrect: false,
        feedback: 'Dangerous! You just handed your OTP and credentials to fraudsters who would instantly drain your funds.'
      },
      {
        id: 'action-2',
        text: 'Do not click; ignore SMS and verify status via the official HDFC Mobile App',
        isCorrect: true,
        feedback: 'Spot on! Legitimate banks never ask for OTPs via links. Checking directly on the official app is the gold standard.'
      },
      {
        id: 'action-3',
        text: 'Reply to the sender asking for their official employee ID number',
        isCorrect: false,
        feedback: 'Ineffective. Scammers easily forge employee credentials or use bots to fabricate badges.'
      }
    ]
  },
  {
    id: 2,
    category: 'UPI / Payments',
    type: 'UPI "Money Received" QR Code Trick',
    difficulty: 'Medium',
    sender: 'OLX Buyer / Unknown WhatsApp',
    senderType: 'WhatsApp',
    timestamp: 'Today, 02:15 PM',
    message: 'Hey, I am purchasing your furniture listing for ₹8,500. I have initiated payment through PhonePe. Kindly scan this QR code and punch in your 4-digit UPI PIN to receive the money directly into your bank.',
    isScam: true,
    correctActionId: 'action-2',
    explanation: 'Golden Rule of UPI: You NEVER need to scan a QR code or enter your UPI PIN to RECEIVE money. Entering your PIN ALWAYS transfers money OUT of your account.',
    redFlags: [
      'Claims entering UPI PIN is required to receive funds',
      'Sends QR code claiming it will credit your account',
      'Buyer rushing the transaction without inspecting item'
    ],
    choices: [
      {
        id: 'action-1',
        text: 'Scan QR code and enter UPI PIN so payment clears',
        isCorrect: false,
        feedback: 'Critical Mistake! Entering your PIN will instantly deduct ₹8,500 from your account and send it to the thief.'
      },
      {
        id: 'action-2',
        text: 'Decline and inform buyer that receiving UPI payments NEVER requires a PIN',
        isCorrect: true,
        feedback: 'Excellent defense! UPI PIN is solely for authenticating outgoing debit transactions.'
      },
      {
        id: 'action-3',
        text: 'Scan the QR code but enter a fake 4-digit PIN to test them',
        isCorrect: false,
        feedback: 'Risky! Scanning untrusted QR codes could trigger malicious intents or app exploits.'
      }
    ]
  },
  {
    id: 3,
    category: 'Employment',
    type: 'YouTube Video Liking Job Scam',
    difficulty: 'Easy',
    sender: 'Global HR Recruiter / Telegram',
    senderType: 'Telegram',
    timestamp: 'Yesterday, 04:30 PM',
    message: 'Greetings! We have part-time digital assistant openings. Earn ₹2,000 to ₹10,000 daily simply by watching and subscribing to YouTube clips. To assign your daily task sheet, a refundable security deposit of ₹750 is required.',
    isScam: true,
    correctActionId: 'action-2',
    explanation: 'Task-based job scams lure victims with initial small token payouts before demanding larger and larger "prepaid investments" or "gas fees", ultimately disappearing with all deposited money.',
    redFlags: [
      'Unrealistically high payout for menial tasks',
      'Demands advance fee / deposit before working',
      'Unsolicited offer via Telegram/WhatsApp'
    ],
    choices: [
      {
        id: 'action-1',
        text: 'Pay ₹750 deposit since it is refundable and start earning immediately',
        isCorrect: false,
        feedback: 'Scam Trapped! They will ask for ₹5,000 next, then ₹25,000, and you will never recover a single rupee.'
      },
      {
        id: 'action-2',
        text: 'Block sender and report account; legitimate employers never charge registration fees',
        isCorrect: true,
        feedback: 'Perfect! No genuine company ever asks candidates to pay fees for job offers.'
      },
      {
        id: 'action-3',
        text: 'Ask if they have an office in your city to do an in-person interview',
        isCorrect: false,
        feedback: 'They operate through disposable virtual numbers and will send fake registered office addresses.'
      }
    ]
  },
  {
    id: 4,
    category: 'Investments',
    type: 'High-Yield Crypto Algorithmic Bot',
    difficulty: 'Hard',
    sender: 'CryptoTrade VIP Club / Discord',
    senderType: 'Discord',
    timestamp: 'Today, 09:10 AM',
    message: 'Exclusive Insider Syndicate: Our AI arbitrage bot guarantees 25% weekly profit with 100% principal protection. Over 1,200 investors joined this month. Minimum deposit: $250. Withdraw anytime with zero lock-in period.',
    isScam: true,
    correctActionId: 'action-1',
    explanation: 'No financial market investment can ever guarantee 25% weekly returns with zero risk. This is a classic Ponzi scheme / Pig Butchering syndicate.',
    redFlags: [
      'Guaranteed high returns with "zero risk"',
      'Social proof claims ("1,200 investors joined")',
      'Unregulated crypto platform solicitation'
    ],
    choices: [
      {
        id: 'action-1',
        text: 'Identify as Investment Ponzi; report and ignore the solicitation',
        isCorrect: true,
        feedback: 'Masterful awareness! Any promise of guaranteed returns with no risk is fundamentally fraudulent.'
      },
      {
        id: 'action-2',
        text: 'Deposit minimum $250 to see if the first withdrawal actually works',
        isCorrect: false,
        feedback: 'Trap! They often allow the first $20 withdrawal to build false confidence, baiting you into depositing $5,000.'
      },
      {
        id: 'action-3',
        text: 'Ask for the company registration certificate to verify legality',
        isCorrect: false,
        feedback: 'Fraudsters routinely present forged UK/Dubai shell company certificates.'
      }
    ]
  },
  {
    id: 5,
    category: 'Coercion / Digital Arrest',
    type: 'FedEx Customs Parcel "Digital Arrest"',
    difficulty: 'Hard',
    sender: 'FedEx Enforcement / Police Desk',
    senderType: 'Phone Call / Video',
    timestamp: 'Today, 10:05 AM',
    message: 'A parcel registered with your Aadhaar containing illicit contraband and 5 fake passports has been detained at Mumbai Customs. The Cyber Crime branch has issued a non-bailable warrant. Stay on video call or transfer ₹45,000 to government escrow for clearance.',
    isScam: true,
    correctActionId: 'action-3',
    explanation: 'Digital Arrest is a widespread psychological extortion racket. Law enforcement agencies in India or globally never conduct judicial hearings over Skype/WhatsApp video or demand fund transfers to "verification accounts".',
    redFlags: [
      'Intimidation and threat of instant arrest',
      'Demand to stay on continuous video call',
      'Request to transfer money to a "safe government account"'
    ],
    choices: [
      {
        id: 'action-1',
        text: 'Immediately transfer ₹45,000 to the escrow account to avoid legal trouble',
        isCorrect: false,
        feedback: 'Extortion Trap! Government and police NEVER demand money transfers to personal bank accounts.'
      },
      {
        id: 'action-2',
        text: 'Stay on the video call and show your ID proofs to convince them you are innocent',
        isCorrect: false,
        feedback: 'Dangerous! Criminals wear fake police uniforms in simulated rooms and record your biometrics for further extortion.'
      },
      {
        id: 'action-3',
        text: 'Hang up immediately, report to National Cyber Crime Helpline 1930 and local police station',
        isCorrect: true,
        feedback: 'Brilliant! Breaking communication destroys their psychological control. Always report to 1930 immediately.'
      }
    ]
  },
  {
    id: 6,
    category: 'Legitimate Notification',
    type: 'Standard Credit Card E-Statement Alert',
    difficulty: 'Medium',
    sender: 'ICICI-BANK / Official Shortcode',
    senderType: 'SMS',
    timestamp: 'Yesterday, 07:00 PM',
    message: 'Your ICICI Bank Credit Card statement ending in XX4019 for the cycle ending 02-Sep-2026 is generated. Minimum Due: INR 0. Total Due: INR 4,320. Due Date: 22-Sep-2026. View details via iMobile app or NetBanking.',
    isScam: false,
    correctActionId: 'action-1',
    explanation: 'Notice how this genuine message includes your specific card ending digits, specific amounts, does NOT include any suspicious links, does not demand OTPs, and guides you to log in via the official app.',
    redFlags: [],
    choices: [
      {
        id: 'action-1',
        text: 'Recognize as legitimate bank notification; no suspicious requests or links present',
        isCorrect: true,
        feedback: 'Correct! Legitimate notifications are informative, reference your masked account details, and do not panic you into clicking links.'
      },
      {
        id: 'action-2',
        text: 'Flag as Scam and block the official ICICI bank sender SMS header',
        isCorrect: false,
        feedback: 'False Positive. Blocking your official bank shortcodes might prevent you from receiving vital real-time transaction alerts.'
      },
      {
        id: 'action-3',
        text: 'Send an email to ICICI claiming someone tried to scam you',
        isCorrect: false,
        feedback: 'Unnecessary. This is a routine monthly statement alert.'
      }
    ]
  }
];

export async function fetchScenarioList() {
  try {
    const res = await api.get('/simulation/scenarios');
    if (res.data && res.data.success && Array.isArray(res.data.scenarios) && res.data.scenarios.length > 0) {
      return res.data.scenarios;
    }
  } catch (err) {
    // fallback to local database
  }
  return SCENARIO_DATABASE;
}

export async function fetchNextScenario(scenarioId = null, currentIndex = 0) {
  try {
    const targetId = scenarioId || SCENARIO_DATABASE[currentIndex % SCENARIO_DATABASE.length].id;
    const res = await api.get(`/simulation/scenario?id=${targetId}`);
    if (res.data && res.data.id && Array.isArray(res.data.choices)) {
      return res.data;
    }
  } catch (err) {
    // Client-side rotation
  }
  const nextIdx = currentIndex % SCENARIO_DATABASE.length;
  return SCENARIO_DATABASE[nextIdx];
}

export async function submitScenarioAnswer(scenarioId, selectedChoiceId) {
  const localScenario = SCENARIO_DATABASE.find(s => s.id === scenarioId) || SCENARIO_DATABASE[0];
  const localChoice = localScenario.choices.find(c => c.id === selectedChoiceId);

  try {
    const res = await api.post('/simulation/submit', {
      scenario_id: scenarioId,
      choice_id: selectedChoiceId,
      answer: localChoice?.text || ''
    });

    if (res.data && typeof res.data.correct === 'boolean') {
      return {
        isCorrect: res.data.correct,
        score: res.data.score ?? (res.data.correct ? 100 : 0),
        feedback: res.data.feedback || (res.data.correct ? 'Correct identification!' : 'Incorrect choice.'),
        explanation: res.data.explanation || localScenario.explanation,
        redFlags: res.data.red_flags || localScenario.redFlags
      };
    }
  } catch (e) {
    // Ignore backend submission error, use local evaluation
  }

  const isCorrect = localChoice ? localChoice.isCorrect : false;
  return {
    isCorrect,
    score: isCorrect ? 100 : 0,
    feedback: localChoice ? localChoice.feedback : (isCorrect ? 'Correct identification!' : 'Incorrect choice.'),
    explanation: localScenario.explanation,
    redFlags: localScenario.redFlags
  };
}
