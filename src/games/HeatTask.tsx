  import React, { useState } from 'react';
  import { motion } from 'framer-motion';
  import DialogueBox from '../components/DialogueBox';

  interface HeatTaskProps {
    onComplete: () => void;
  }

  const HeatTask: React.FC<HeatTaskProps> = ({ onComplete }) => {
    const [showIntro, setShowIntro] = useState(true);
    const [heatLevel, setHeatLevel] = useState(0);
    const [taskComplete, setTaskComplete] = useState(false);

    const rubHands = () => {
      if (heatLevel < 100) {
        const newLevel = Math.min(100, heatLevel + 14);
        setHeatLevel(newLevel);
        if (newLevel >= 100) {
          window.setTimeout(() => setTaskComplete(true), 0);
        }
      }
    };

    if (showIntro) {
      return (
        <motion.div
          className="relative h-full flex flex-col items-center justify-between py-10 px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-full flex flex-col items-center gap-6">
            <h2 className="text-2xl font-bold">Heat Energy</h2>
            <p className="mt-4 text-center text-gray-300 max-w-md">
              Heat energy is the energy of moving particles and friction. It is what makes things warm when we rub them together.
            </p>
            <div className="w-full max-w-md space-y-4">
              <div className="glass p-4 rounded-2xl">
                <h3 className="font-semibold">What is Heat Energy?</h3>
                <p className="text-sm text-gray-300 mt-2">
                  Heat comes from motion and friction. When two surfaces rub, particles move faster and energy is felt as warmth.
                </p>
              </div>
              <div className="glass p-4 rounded-2xl">
                <h3 className="font-semibold">What you will do</h3>
                <p className="text-sm text-gray-300 mt-2">
                  Tap the Rub Hands button repeatedly to simulate friction and build up heat energy!
                </p>
              </div>
            </div>
          </div>
          <div className="w-full max-w-md mt-auto pb-6">
            <button className="btn btn-primary w-full" onClick={() => setShowIntro(false)}>
              Start the Heat Task
            </button>
          </div>
        </motion.div>
      );
    }

    return (
      <div className="relative h-full">
        <motion.div
          className="h-full flex flex-col items-center justify-start py-6 pb-4 overflow-y-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-xl font-bold">Heat (Thermal) Energy</h2>

          <div className="w-full max-w-xl flex flex-col items-center gap-6 px-6 pb-6">
            <div className="w-full bg-gray-700 h-8 rounded-full overflow-hidden border border-gray-500">
              <motion.div
                className="h-full bg-gradient-heat"
                animate={{ width: `${heatLevel}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>

            <p className="text-sm text-gray-300 text-center">
              Heat level: {heatLevel}%
            </p>

            <motion.button
              className="btn btn-primary"
              whileTap={{ scale: 0.96 }}
              onClick={rubHands}
              disabled={heatLevel >= 100}
            >
              {heatLevel >= 100 ? 'Warm! 🔥' : 'Rub Hands! 👏'}
            </motion.button>
          </div>
        </motion.div>

        <div className="absolute left-0 right-0 bottom-2 px-4">
          <DialogueBox
            text={heatLevel >= 100 ? 'Nice work! Friction from rubbing turns movement into Heat Energy.' : 'Tap the Rub Hands button repeatedly to generate heat through friction!'}
            onNext={onComplete}
            showNext={taskComplete}
            nextLabel="Back to Menu"
          />
        </div>
      </div>
    );
  };

  export default HeatTask;