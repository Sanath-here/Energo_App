import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DialogueBox from '../components/DialogueBox';

interface MechanicalTaskProps {
  onComplete: () => void;
}

const MechanicalTask: React.FC<MechanicalTaskProps> = ({ onComplete }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [isComplete, setIsComplete] = useState(false);
  const [pullStrength, setPullStrength] = useState(0);
  const [activePhase, setActivePhase] = useState<'idle' | 'potential' | 'kinetic'>('idle');

  const handleRelease = (_: unknown, info: { offset: { x: number } }) => {
    const distance = info.offset.x;
    if (distance > 80) {
      setPullStrength(100);
      setIsComplete(true);
      setActivePhase('kinetic');
      window.setTimeout(() => setActivePhase('idle'), 800);
    } else {
      setPullStrength(0);
      setActivePhase('idle');
    }
  };

  if (showIntro) {
    return (
      <motion.div
  className="h-full flex flex-col items-center py-10 px-6"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>
  {/* Wrap everything above the button in flex-1 */}
  <div className="flex-1 flex flex-col items-center w-full">
    <h2 className="text-2xl font-bold">Mechanical Energy</h2>
    <p className="mt-4 text-center text-gray-300 max-w-md">
      Mechanical energy comes in two forms:
    </p>
    <div className="mt-6 w-full max-w-md space-y-4">
      <div className="glass p-4 rounded-2xl">
        <h3 className="font-semibold">1. Potential Energy</h3>
        <p className="text-sm text-gray-300 mt-2">Energy stored when an object is pulled back or raised up.</p>
      </div>
      <div className="glass p-4 rounded-2xl">
        <h3 className="font-semibold">2. Kinetic Energy</h3>
        <p className="text-sm text-gray-300 mt-2">Energy of motion when the object is released and moves.</p>
      </div>
    </div>
  </div>

  {/* Button naturally sits at the bottom */}
  <button className="btn btn-primary" onClick={() => setShowIntro(false)}>
    Start the challenge
  </button>
</motion.div>
    );
  }

  return (
    <motion.div
      className="h-full flex flex-col items-center justify-between py-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-xl font-bold">Mechanical Energy</h2>
      
      <div className="w-full max-w-xl flex flex-col items-center gap-4">
        <div className="w-full flex items-center justify-between text-sm text-gray-300">
          <span>
            {activePhase === 'potential'
              ? 'Potential Energy increasing'
              : activePhase === 'kinetic'
              ? 'Kinetic Energy released'
              : 'Ready to pull the gear'}
          </span>
          <span>{Math.floor(pullStrength)}%</span>
        </div>

        <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 transition-all" style={{ width: `${pullStrength}%` }} />
        </div>

        <div className="relative w-full h-32 bg-white-10 border border-gray-600 rounded-lg overflow-hidden">
          <div className="absolute right-0 top-1/2 h-20 bg-blue-400" style={{ width: '8px', transform: 'translateY(-50%)' }} />
          <motion.div
            className="absolute left-0 top-1/2 w-16 h-16 bg-blue-500 rounded-full shadow-lg flex items-center justify-center text-white font-bold cursor-grab"
            style={{ y: '-50%' }}
            drag="x"
            dragConstraints={{ left: 0, right: 300 }}
            dragElastic={0}
            dragMomentum={false}
            onDragStart={() => setActivePhase('potential')}
            onDrag={(_, info) => setPullStrength(Math.min(100, Math.max(0, (info.offset.x / 260) * 100)))}
            onDragEnd={handleRelease}
            animate={activePhase === 'kinetic' ? { x: 0 } : undefined}
            transition={{ type: 'spring', stiffness: 250, damping: 18 }}
          >
            ⚙️
          </motion.div>
        </div>

        <p className="text-sm text-center px-6">
          Pull the gear to the right to store <b>Potential Energy</b>, then release it to see the moving object gain <b>Kinetic Energy</b>.
        </p>
      </div>

      <DialogueBox 
        text={isComplete ? "Amazing! That was mechanical energy in motion. The stored potential energy became kinetic energy!" : "Mechanical energy is the energy of moving objects and stored energy. Pull the gear back and release it!"}
        onNext={onComplete}
        showNext={isComplete}
        nextLabel="Back to Menu"
      />
    </motion.div>
  );
};

export default MechanicalTask;
