import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Award, 
  ShieldAlert, 
  CheckCircle2, 
  TrendingUp, 
  PieChart as PieIcon, 
  BarChart3, 
  Activity,
  Calendar,
  Layers
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  AreaChart, 
  Area,
  Legend 
} from 'recharts';
import { useApp } from '../context/AppContext';
import { fetchDashboardData } from '../services/dashboardApi';
import MetricCard from '../components/common/MetricCard';
import Badge from '../components/common/Badge';

export default function Dashboard() {
  const appState = useApp();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      const data = await fetchDashboardData(appState);
      setDashboardData(data);
      setLoading(false);
    }
    loadStats();
  }, [appState.awarenessScore, appState.simulationsCompleted]);

  const scamCategories = dashboardData?.scam_breakdown || [
    { name: 'Banking / OTP', count: 18, color: '#f43f5e' },
    { name: 'UPI Traps', count: 14, color: '#f59e0b' },
    { name: 'Fake Job Offers', count: 12, color: '#00f0ff' },
    { name: 'Investment Ponzi', count: 9, color: '#a855f7' },
    { name: 'Phishing URLs', count: 7, color: '#3b82f6' }
  ];

  const riskDistributionData = [
    { name: 'High Risk', count: dashboardData?.risk_distribution?.High || 14, fill: '#f43f5e' },
    { name: 'Medium Risk', count: dashboardData?.risk_distribution?.Medium || 8, fill: '#f59e0b' },
    { name: 'Low Risk', count: dashboardData?.risk_distribution?.Low || 5, fill: '#10b981' }
  ];

  const trendData = dashboardData?.trend_history || [
    { day: 'Mon', score: 65, accuracy: 60 },
    { day: 'Tue', score: 70, accuracy: 68 },
    { day: 'Wed', score: 74, accuracy: 72 },
    { day: 'Thu', score: 78, accuracy: 80 },
    { day: 'Fri', score: 82, accuracy: 85 },
    { day: 'Sat', score: 86, accuracy: 89 },
    { day: 'Sun', score: appState.awarenessScore, accuracy: appState.accuracyRate }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          background: 'rgba(3, 7, 18, 0.95)',
          border: '1px solid var(--border-glow)',
          padding: '0.75rem 1rem',
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
        }}>
          <p style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
            {label || payload[0].name}
          </p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color || entry.fill || 'var(--cyan)', fontSize: '0.8rem' }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="page-container">
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div className="badge badge-cyan" style={{ marginBottom: '0.5rem' }}>
            <LayoutDashboard size={12} />
            <span>Threat Intelligence</span>
          </div>
          <h1 style={{ fontSize: '2.25rem' }}>Security Analytics & Threat Radar</h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>
            Real-time analytics monitoring personal cyber resilience, simulation accuracy, and scam vector distributions.
          </p>
        </div>

        {/* 4 Metric Summary Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2.5rem'
        }}>
          <MetricCard
            title="Awareness Index"
            value={`${appState.awarenessScore}/100`}
            subtitle="Tier: Advanced Defender"
            trend="+5.2%"
            icon={Award}
            color="var(--cyan)"
          />
          <MetricCard
            title="Simulations Run"
            value={appState.simulationsCompleted}
            subtitle={`${appState.simulationsCorrect} attacks intercepted`}
            trend="+12 total"
            icon={Activity}
            color="#3b82f6"
          />
          <MetricCard
            title="Identification Accuracy"
            value={`${appState.accuracyRate}%`}
            subtitle="Benchmark: 70% average"
            trend="+8.4%"
            icon={CheckCircle2}
            color="#10b981"
          />
          <MetricCard
            title="Critical Scams Flagged"
            value={dashboardData?.risk_distribution?.High || 14}
            subtitle="High severity fraud attempts"
            trend="Active monitoring"
            icon={ShieldAlert}
            color="#f43f5e"
          />
        </div>

        {/* Charts Grid Row 1 */}
        <div className="grid-cards-2" style={{ marginBottom: '2.5rem' }}>
          {/* Chart 1: Awareness Progression Over Time */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem' }}>Awareness & Accuracy Trajectory</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Continuous progression across simulated attacks</p>
              </div>
              <span className="badge badge-cyan">Weekly Trend</span>
            </div>

            <div style={{ width: '100%', height: '280px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#00f0ff" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="accColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} domain={[0, 100]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area type="monotone" dataKey="score" name="Awareness Score" stroke="#00f0ff" strokeWidth={2.5} fillOpacity={1} fill="url(#scoreColor)" />
                  <Area type="monotone" dataKey="accuracy" name="Accuracy %" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#accColor)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Scam Vectors Distribution (Donut Chart) */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem' }}>Threat Vector Exposure</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Distribution of evaluated scam categories</p>
              </div>
              <span className="badge badge-rose">Top Vectors</span>
            </div>

            <div style={{ width: '100%', height: '280px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={scamCategories}
                    cx="50%"
                    cy="50%"
                    innerRadius={65}
                    outerRadius={95}
                    paddingAngle={5}
                    dataKey="count"
                  >
                    {scamCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Charts Grid Row 2 */}
        <div className="grid-cards-2" style={{ marginBottom: '2.5rem' }}>
          {/* Chart 3: Severity Breakdown */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem' }}>Threat Severity Breakdown</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Incidents segmented by risk severity tier</p>
              </div>
              <span className="badge badge-cyan">Severity Tier</span>
            </div>

            <div style={{ width: '100%', height: '260px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={riskDistributionData}>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="count" name="Case Count" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="glass-card" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.15rem' }}>Live Defense Log</h3>
              <span className="badge badge-emerald">Real-Time</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {appState.recentActivities.map((act) => (
                <div 
                  key={act.id}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '12px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'rgba(0, 240, 255, 0.1)',
                      color: 'var(--cyan)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Activity size={16} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff' }}>{act.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{act.result} • {act.time}</div>
                    </div>
                  </div>
                  <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#34d399' }}>
                    {act.xp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
