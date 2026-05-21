import React, { useMemo, useState } from 'react';
import ThreeDCharacter from './components/ThreeDCharacter';
import Starfield from './components/Starfield';
import DialogueBox from './components/DialogueBox';
import MechanicalTask from './games/MechanicalTask';
import HeatTask from './games/HeatTask';
import LightTask from './games/LightTask';
import ElectricalTask from './games/ElectricalTask';
import ChemicalTask from './games/ChemicalTask';
import ConservationSim from './games/ConservationSim';
import FinalQuiz from './games/FinalQuiz';

type GameState =
  | 'ENERGY'
  | 'INTRO'
  | 'MECHANICAL'
  | 'HEAT'
  | 'LIGHT'
  | 'ELECTRICAL'
  | 'CHEMICAL'
  | 'CONSERVATION'
  | 'USES'
  | 'SUMMARY'
  | 'QUIZ'
  | 'END';

const states: GameState[] = [
  'ENERGY',
  'INTRO',
  'MECHANICAL',
  'HEAT',
  'LIGHT',
  'ELECTRICAL',
  'CHEMICAL',
  'CONSERVATION',
  'USES',
  'SUMMARY',
  'QUIZ',
  'END',
];

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('ENERGY');
  const currentIndex = useMemo(() => states.indexOf(gameState), [gameState]);

  const nextState = () => {
    if (currentIndex < states.length - 1) {
      setGameState(states[currentIndex + 1]);
    }
  };

  const renderContent = () => {
    switch (gameState) {
      case 'ENERGY':
        return (
          <div className="hero-card glass">
            <div className="hero-copy">
              <p className="eyebrow">Energy in action</p>
              <h2 className="hero-title">What is ENERGY?</h2>
              <p className="hero-text">
                Energy makes things move, shine, heat up, and change. Here are some everyday forms of energy.
              </p>
              <div className="energy-image-grid">
                <div className="energy-card">
                  <div className="energy-thumb">⚡</div>
                  <p>Electricity</p>
                </div>
                <div className="energy-card">
                  <div className="energy-thumb">🔥</div>
                  <p>Heat</p>
                </div>
                <div className="energy-card">
                  <div className="energy-thumb">💡</div>
                  <p>Light</p>
                </div>
                <div className="energy-card">
                  <div className="energy-thumb">🔋</div>
                  <p>Chemical</p>
                </div>
                <div className="energy-card">
                  <div className="energy-thumb">⚙️</div>
                  <p>Motion</p>
                </div>
              </div>
              <button className="btn btn-primary mt-6" onClick={nextState}>Meet Energo</button>
            </div>
          </div>
        );
      case 'INTRO':
        return (
          <div className="hero-card glass">
            <div className="hero-copy">
              <p className="eyebrow">Meet Energo</p>
              <h2 className="hero-title">A playful journey through energy.</h2>
              <p className="hero-text">
                Tap into the science behind motion, heat, light, electricity, and chemistry with fun challenges and a glowing companion.
              </p>
              <div className="hero-face">
                <ThreeDCharacter />
              </div>
              <DialogueBox
                text="Hello! I'm Energo. I'm here to teach you all about ENERGY! Energy is the ability to do work. Let's explore its different forms together." 
                onNext={nextState}
                style={{ position: 'static', marginTop: '1rem' }}
              />
            </div>
          </div>
        );
      case 'MECHANICAL':
        return <MechanicalTask onComplete={nextState} />;
      case 'HEAT':
        return <HeatTask onComplete={nextState} />;
      case 'LIGHT':
        return <LightTask onComplete={nextState} />;
      case 'ELECTRICAL':
        return <ElectricalTask onComplete={nextState} />;
      case 'CHEMICAL':
        return <ChemicalTask onComplete={nextState} />;
      case 'CONSERVATION':
        return <ConservationSim onComplete={nextState} />;
      case 'USES':
        return (
          <div className="section-card glass" style={{ paddingBottom: '5rem' }}>
            <div className="section-header">
              <h2>Energy Uses</h2>
              <p>Great work! Here are the real-world uses of the energy types you explored.</p>
            </div>
            <ul className="summary-list">
              <li><strong>Mechanical:</strong> Used in machines, elevators, roller coasters, wind turbines, and moving vehicles.</li>
              <li><strong>Heat:</strong> Used for cooking food, warming homes, steam power, manufacturing, and drying materials.</li>
              <li><strong>Light:</strong> Used in lighting, screens, plant growth, signaling, and photography.</li>
              <li><strong>Electrical:</strong> Used to power devices, lighting, motors, computers, and communication systems.</li>
              <li><strong>Chemical:</strong> Used in batteries, food energy, fuel for cars, and chemical reactions that release heat or light.</li>
              <li><strong>Conservation:</strong> Teaches how energy changes form without disappearing, which helps engineers save energy and design efficient systems.</li>
            </ul>
            <DialogueBox
              text={'Nice review! Ready to continue to the summary?'}
              onNext={nextState}
              style={{ position: 'static', marginTop: '1rem' }}
            />
          </div>
        );
      case 'SUMMARY':
        return (
          <div className="section-card glass">
            <div className="section-header">
              <h2>Energy Summary</h2>
              <p>Remember the six key energy ideas you unlocked.</p>
            </div>
            <ul className="summary-list">
              <li><strong>Mechanical:</strong> Energy of motion and position.</li>
              <li><strong>Heat:</strong> Energy that makes things warm.</li>
              <li><strong>Light:</strong> Energy that lets us see.</li>
              <li><strong>Electrical:</strong> Energy from moving electrons.</li>
              <li><strong>Chemical:</strong> Energy stored in food and fuel.</li>
              <li><strong>Conservation:</strong> Energy cannot be created or destroyed.</li>
            </ul>
            <button className="btn btn-primary mt-6" onClick={nextState}>Take the Final Quiz</button>
          </div>
        );
      case 'QUIZ':
        return <FinalQuiz onComplete={nextState} />;
      case 'END':
        return (
          <div className="section-card glass text-center">
            <h2>Great Job!</h2>
            <p className="hero-text">You are now an Energy Expert. Ready to play again?</p>
            <div className="final-scene">
              <ThreeDCharacter />
            </div>
            <button className="btn btn-primary mt-6" onClick={() => setGameState('INTRO')}>Play Again</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div id="root">
      <Starfield />
      <div className="app-shell">
        <header className="app-header glass">
          <div>
            <p className="eyebrow">Energo Academy</p>
            <h1>Energy Adventure</h1>
          </div>
          <div className="header-chip">Stage {currentIndex + 1} / {states.length}</div>
        </header>

        <main className="content-area"> {renderContent()} </main>
      </div>
    </div>
  );
};

export default App;
