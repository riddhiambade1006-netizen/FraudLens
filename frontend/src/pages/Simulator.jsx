import React, { useState, useEffect } from 'react';
import { 
  Gamepad2, 
  RotateCcw, 
  Award, 
  Flame, 
  CheckCircle, 
  AlertTriangle, 
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { fetchScenarioList, submitScenarioAnswer, SCENARIO_DATABASE } from '../services/simulationApi';
import ScenarioCard from '../components/simulator/ScenarioCard';
import DecisionButtons from '../components/simulator/DecisionButtons';
import ResultCard from '../components/simulator/ResultCard';

export default function Simulator() {
  const { awarenessScore, recordSimulationResult } = useApp();

  const [scenarios, setScenarios] = useState(SCENARIO_DATABASE);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState(null);
  const [result, setResult] = useState(null);
  const [streak, setStreak] = useState(3);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function loadScenarios() {
      const list = await fetchScenarioList();
      if (list && list.length > 0) {
        setScenarios(list);
      }
    }
    loadScenarios();
  }, []);

  const scenario = scenarios[currentIndex] || scenarios[0];

  const handleSelectChoice = async (choiceId) => {
    if (result || submitting) return;
    setSelectedChoiceId(choiceId);
    setSubmitting(true);

    const outcome = await submitScenarioAnswer(scenario.id, choiceId);
    setResult(outcome);
    setSubmitting(false);

    // Record in global context
    recordSimulationResult(scenario, outcome.isCorrect);

    if (outcome.isCorrect) {
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNext = () => {
    setSelectedChoiceId(null);
    setResult(null);
    setCurrentIndex((prev) => (prev + 1) % SCENARIO_DATABASE.length);
  };

  const handleRetry = () => {
    setSelectedChoiceId(null);
    setResult(null);
  };

  return (
    <div className="page-container">
      <div className="container">
        {/* Header bar */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div>
            <div className="badge badge-cyan" style={{ marginBottom: '0.5rem' }}>
              <Gamepad2 size={12} />
              <span>Interactive Training Lab</span>
            </div>
            <h1 style={{ fontSize: '2.25rem' }}>Scam Simulator</h1>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Face real-world social engineering traps. Can you spot the fraud without giving away credentials?
            </p>
          </div>

          {/* Player stats bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Streak Counter */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              borderRadius: '12px',
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.3)'
            }}>
              <Flame size={18} color="#f59e0b" />
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Streak</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: '#fbbf24', lineHeight: 1 }}>{streak} Correct</div>
              </div>
            </div>

            {/* Score */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              borderRadius: '12px',
              background: 'rgba(0, 240, 255, 0.1)',
              border: '1px solid rgba(0, 240, 255, 0.3)'
            }}>
              <Award size={18} color="var(--cyan)" />
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Awareness</div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--cyan)', lineHeight: 1 }}>{awarenessScore}%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scenario Progress Tabs */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          overflowX: 'auto',
          paddingBottom: '1rem',
          marginBottom: '2rem'
        }}>
          {scenarios.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => {
                if (idx !== currentIndex) {
                  setCurrentIndex(idx);
                  setSelectedChoiceId(null);
                  setResult(null);
                }
              }}
              className={`tab-pill ${idx === currentIndex ? 'active' : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}
            >
              <span style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: idx === currentIndex ? 'var(--cyan)' : 'rgba(255, 255, 255, 0.1)',
                color: idx === currentIndex ? '#000' : '#fff',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.75rem',
                fontWeight: 700
              }}>
                {idx + 1}
              </span>
              <span>{s.category}</span>
            </button>
          ))}
        </div>

        {/* Simulation Workspace Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '2.5rem',
          alignItems: 'start'
        }}>
          {/* Left: Phone Mockup with simulated message */}
          <div>
            <ScenarioCard scenario={scenario} />
          </div>

          {/* Right: Interaction Panel & Decisions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="glass-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span className="badge badge-cyan">Tactical Drill #{currentIndex + 1}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
                  {currentIndex + 1} of {scenarios.length} Scenarios
                </span>
              </div>

              <h2 style={{ fontSize: '1.35rem', marginBottom: '0.75rem', color: '#ffffff' }}>
                {scenario.type}
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                Carefully evaluate the incoming notification. Pay close attention to domain names, requests for authorization codes, and psychological pressure.
              </p>
            </div>

            {/* Decision choices */}
            {!result ? (
              <div className="glass-card" style={{ padding: '1.5rem' }}>
                <DecisionButtons
                  choices={scenario.choices}
                  onSelect={handleSelectChoice}
                  selectedId={selectedChoiceId}
                  disabled={submitting}
                />
              </div>
            ) : (
              /* Outcome result card */
              <ResultCard
                result={result}
                onNext={handleNext}
                onRetry={handleRetry}
              />
            )}

            {/* Quick Navigation Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <button
                onClick={() => {
                  setCurrentIndex((prev) => (prev - 1 + scenarios.length) % scenarios.length);
                  setSelectedChoiceId(null);
                  setResult(null);
                }}
                className="btn btn-outline"
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              >
                <ChevronLeft size={16} /> Previous
              </button>

              <button
                onClick={handleNext}
                className="btn btn-outline"
                style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
              >
                Skip / Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
