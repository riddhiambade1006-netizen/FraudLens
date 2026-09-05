import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [awarenessScore, setAwarenessScore] = useState(() => {
    const saved = localStorage.getItem('fraudlens_score');
    return saved ? parseInt(saved, 10) : 82;
  });

  const [simulationsCompleted, setSimulationsCompleted] = useState(() => {
    const saved = localStorage.getItem('fraudlens_sim_count');
    return saved ? parseInt(saved, 10) : 12;
  });

  const [simulationsCorrect, setSimulationsCorrect] = useState(() => {
    const saved = localStorage.getItem('fraudlens_sim_correct');
    return saved ? parseInt(saved, 10) : 10;
  });

  const [isBackendOnline, setIsBackendOnline] = useState(false);

  const [analysisHistory, setAnalysisHistory] = useState(() => {
    const saved = localStorage.getItem('fraudlens_history');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        id: 'scan-1',
        timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
        message: 'Your bank account will be suspended within 2 hours. Click to verify identity: http://secure-bank-verify.cc',
        scamType: 'Phishing',
        riskLevel: 'High',
        riskScore: 92,
        tactics: ['Urgency', 'Impersonation', 'Suspicious URL']
      },
      {
        id: 'scan-2',
        timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
        message: 'Earn ₹15,000/day by liking YouTube videos. Deposit ₹500 refundable security fee to activate tasks.',
        scamType: 'Job Scam',
        riskLevel: 'High',
        riskScore: 88,
        tactics: ['Advance Fee', 'Unrealistic Earnings']
      },
      {
        id: 'scan-3',
        timestamp: new Date(Date.now() - 1000 * 60 * 360).toISOString(),
        message: 'Your monthly electricity bill receipt for INR 1,420 is generated. View on your official consumer dashboard.',
        scamType: 'Legitimate',
        riskLevel: 'Low',
        riskScore: 10,
        tactics: []
      }
    ];
  });

  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      type: 'SIMULATION',
      title: 'Completed OTP Scam Simulation',
      result: 'Identified Correctly',
      xp: '+20 XP',
      time: '15 mins ago'
    },
    {
      id: 2,
      type: 'SCAN',
      title: 'Scanned Suspicious Telegram Job SMS',
      result: 'Flagged High Risk (88%)',
      xp: '+10 XP',
      time: '2 hours ago'
    },
    {
      id: 3,
      type: 'AWARENESS',
      title: 'Reviewed UPI Fraud Prevention Guide',
      result: 'Completed Academy Unit',
      xp: '+15 XP',
      time: 'Yesterday'
    }
  ]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('fraudlens_score', awarenessScore.toString());
  }, [awarenessScore]);

  useEffect(() => {
    localStorage.setItem('fraudlens_sim_count', simulationsCompleted.toString());
    localStorage.setItem('fraudlens_sim_correct', simulationsCorrect.toString());
  }, [simulationsCompleted, simulationsCorrect]);

  useEffect(() => {
    localStorage.setItem('fraudlens_history', JSON.stringify(analysisHistory));
  }, [analysisHistory]);

  // Check backend health periodically
  const checkBackendHealth = async () => {
    try {
      const res = await axios.get('/api/health', { timeout: 2500 });
      if (res.status === 200) {
        setIsBackendOnline(true);
        return true;
      }
    } catch (err) {
      setIsBackendOnline(false);
      return false;
    }
  };

  useEffect(() => {
    checkBackendHealth();
    const interval = setInterval(checkBackendHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  const addAnalysisRecord = (item) => {
    const newItem = {
      id: `scan-${Date.now()}`,
      timestamp: new Date().toISOString(),
      ...item
    };
    setAnalysisHistory(prev => [newItem, ...prev.slice(0, 19)]);

    // Update awareness score slightly when testing messages
    setAwarenessScore(prev => Math.min(100, Math.max(0, prev + 1)));

    setRecentActivities(prev => [
      {
        id: Date.now(),
        type: 'SCAN',
        title: `Scanned message: ${item.scamType}`,
        result: `Risk: ${item.riskLevel} (${item.riskScore}%)`,
        xp: '+10 XP',
        time: 'Just now'
      },
      ...prev.slice(0, 5)
    ]);
  };

  const recordSimulationResult = (scenario, isCorrect) => {
    setSimulationsCompleted(prev => prev + 1);
    if (isCorrect) {
      setSimulationsCorrect(prev => prev + 1);
      setAwarenessScore(prev => Math.min(100, prev + 3));
    } else {
      setAwarenessScore(prev => Math.max(10, prev - 2));
    }

    setRecentActivities(prev => [
      {
        id: Date.now(),
        type: 'SIMULATION',
        title: `Simulated: ${scenario.type || scenario.title}`,
        result: isCorrect ? 'Identified Correctly' : 'Fell for Scam',
        xp: isCorrect ? '+25 XP' : '0 XP',
        time: 'Just now'
      },
      ...prev.slice(0, 5)
    ]);
  };

  return (
    <AppContext.Provider
      value={{
        awarenessScore,
        simulationsCompleted,
        simulationsCorrect,
        accuracyRate: simulationsCompleted > 0 ? Math.round((simulationsCorrect / simulationsCompleted) * 100) : 0,
        analysisHistory,
        recentActivities,
        isBackendOnline,
        checkBackendHealth,
        addAnalysisRecord,
        recordSimulationResult
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
