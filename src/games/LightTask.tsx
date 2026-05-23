import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DialogueBox from '../components/DialogueBox';

interface LightTaskProps {
  onComplete: () => void;
}

const LightTask: React.FC<LightTaskProps> = ({ onComplete }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [isLit, setIsLit] = useState(false);
  const [funMode, setFunMode] = useState(false);
  const [flashCount, setFlashCount] = useState(0);

  const toggleLight = () => {
    setIsLit((prev) => {
      if (prev) {
        setFunMode(false);
      }
      return !prev;
    });
  };

  const flashLight = () => {
    if (!isLit) return;
    setFunMode(true);
    setFlashCount((count) => count + 1);
    window.setTimeout(() => setFunMode(false), 500);
  };

  if (showIntro) {
    return (
      <motion.div
        className="h-full flex flex-col items-center justify-center py-10 px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-bold">Light Energy</h2>
        <p className="mt-4 text-center text-gray-300 max-w-md">
          Light energy helps us see the world around us. It travels in rays and makes objects glow.
        </p>
        <div className="mt-6 w-full max-w-md space-y-4">
          <div className="glass p-4 rounded-2xl">
            <h3 className="font-semibold">What is Light Energy?</h3>
            <p className="text-sm text-gray-300 mt-2">
              Light energy comes from sources like bulbs, the sun, and lasers. It moves through space and brightens everything it touches.
            </p>
          </div>
          <div className="glass p-4 rounded-2xl">
            <h3 className="font-semibold">Your fun task</h3>
            <p className="text-sm text-gray-300 mt-2">
              Turn the light on, then use the flash button to make it blink. Watch how light energy changes brightness with every flash.
            </p>
          </div>
          <div className="glass p-4 rounded-2xl">
            <h3 className="font-semibold">Fun Fact</h3>
            <p className="text-sm text-gray-300 mt-2">
              Light travels at about 300,000 kilometers per second, so it can circle Earth seven times in just one second.
            </p>
          </div>
        </div>
        <button className="btn btn-primary mt-8" onClick={() => setShowIntro(false)}>
          Start the Light Task
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
      <h2 className="text-xl font-bold">Light Energy</h2>

      <div className="w-full max-w-xl flex flex-col items-center gap-6 px-6">
        <div className="relative w-full h-56 rounded-lg bg-gray-900 border border-gray-600 overflow-hidden flex items-center justify-center">
          <motion.div
            className="absolute inset-0 bg-yellow-300/20"
            animate={{ opacity: isLit ? (funMode ? 0.7 : 0.45) : 0, scale: isLit ? 1 : 0.8 }}
            transition={{ duration: 0.2 }}
          />

          <motion.div
            className="relative z-10 w-24 h-24 rounded-full"
            style={{
              background: isLit ? 'rgba(248,250,152,1)' : 'rgba(51,65,85,1)',
              boxShadow: isLit
                ? funMode
                  ? '0 0 70px 32px rgba(253,224,71,0.55)'
                  : '0 0 40px 22px rgba(253,224,71,0.32)'
                : '0 0 0 0 transparent',
              border: isLit ? '1px solid rgba(255,255,255,0.5)' : '1px solid rgba(148,163,184,0.35)',
            }}
            animate={{ scale: isLit ? (funMode ? [1, 1.12, 1] : [1, 1.05, 1]) : 1 }}
            transition={{ duration: funMode ? 0.4 : 0.8 }}
          />

          <motion.div
            className="absolute bottom-0 left-1/2 rounded-full bg-yellow-300/10"
            style={{ width: 140, height: 140, transform: 'translateX(-50%)' }}
            animate={{ opacity: isLit ? (funMode ? 0.85 : 0.45) : 0 }}
            transition={{ duration: 0.2 }}
          />
        </div>

        <div className="w-full grid gap-3 sm:grid-cols-2">
          <button
            className={`btn ${isLit ? 'btn-primary' : 'btn-secondary'}`}
            onClick={toggleLight}
          >
            {isLit ? 'Turn Off' : 'Turn On'}
          </button>
          <button
            className={`btn ${isLit ? 'btn-secondary' : 'btn-tertiary'}`}
            onClick={flashLight}
            disabled={!isLit}
          >
            Flash Light! 🌟
          </button>
        </div>

        <p className="text-sm text-center px-6">
          {isLit
            ? funMode
              ? `Light is blinking! You flashed it ${flashCount} time${flashCount === 1 ? '' : 's'}.`
              : 'The bulb lights up, showing how light energy spreads from the source.'
            : 'Switch the bulb on to see light energy glow and then flash it for a fun effect.'}
        </p>
      </div>

      <DialogueBox
        text={isLit ? 'Great! Light energy helps us see and makes the world bright.' : 'Light energy comes from sources like bulbs and the sun. Turn the bulb on!'}
        onNext={onComplete}
        showNext={isLit}
        nextLabel="Back to Menu"
      />
    </motion.div>
  );
};

export default LightTask;