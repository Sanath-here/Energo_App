import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DialogueBox from '../components/DialogueBox';

interface ConservationSimProps {
  onComplete: () => void;
}

const scenarios = [
  {
    name: 'Water Dam',
    from: 'Kinetic (Water)',
    to: 'Electrical',
    desc: 'Falling water turns a turbine to make electricity!',
    options: ['Electrical', 'Heat', 'Mechanical (Motion)'],
  },
  {
    name: 'Toaster',
    from: 'Electrical',
    to: 'Heat',
    desc: 'Electricity warms up the wires to toast your bread!',
    options: ['Heat', 'Light', 'Chemical (Fuel)'],
  },
  {
    name: 'Car',
    from: 'Chemical (Fuel)',
    to: 'Mechanical (Motion)',
    desc: 'Fuel burns to push the car forward!',
    options: ['Mechanical (Motion)', 'Light', 'Electrical'],
  },
];

const ConservationSim: React.FC<ConservationSimProps> = ({ onComplete }) => {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [choice, setChoice] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const current = scenarios[scenarioIndex];

  const selectChoice = (value: string) => {
    setChoice(value);
    setIsCorrect(value === current.to);
  };

  const goNext = () => {
    setChoice(null);
    setIsCorrect(null);
    if (scenarioIndex < scenarios.length - 1) {
      setScenarioIndex(scenarioIndex + 1);
    } else {
      onComplete();
    }
  };

  return (
    <motion.div
      className="conservation-sim h-full flex flex-col items-center justify-between py-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-xl font-bold">Conservation of Energy</h2>

      <div className="w-full max-w-xl space-y-6 px-6">
        <div className="glass p-4 text-center">
          <h3 className="text-lg font-bold text-yellow-400">{current.name}</h3>
          <p className="text-sm text-gray-300 mt-2">{current.desc}</p>
        </div>

        <div className="glass p-4 rounded-lg border border-gray-600">
          <p className="text-sm text-gray-300 mb-4">
            {current.from} changes into which energy form?
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {current.options.map((option) => {
              const emojiMap: Record<string, string> = {
                Electrical: '⚡',
                Heat: '🔥',
                'Mechanical (Motion)': '⚙️',
                Light: '💡',
                'Chemical (Fuel)': '🧪',
              };
              const selected = choice === option;
              const stateClass = selected
                ? isCorrect
                  ? 'border-green-400 bg-green-500/10'
                  : 'border-red-400 bg-red-500/10'
                : 'border-gray-600 bg-white-10';

              return (
                <motion.button
                  key={option}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => selectChoice(option)}
                  className={`flex items-center gap-3 p-4 rounded-2xl border ${stateClass} shadow-md transition-transform`}
                  style={{ minHeight: 64, alignItems: 'center', color: 'white' }}
                >
                  <div style={{ fontSize: 22, width: 36, textAlign: 'center', color: 'white' }}>{emojiMap[option] ?? '🔹'}</div>
                  <div className="flex-1 text-sm">
                    <div className="font-semibold text-white">{option}</div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center gap-2">
          {scenarios.map((_, i) => (
            <button
              key={i}
              className={`w-3 h-3 rounded-full ${i === scenarioIndex ? 'bg-yellow-400' : 'bg-gray-600'}`}
              onClick={() => {
                setScenarioIndex(i);
                setChoice(null);
                setIsCorrect(null);
              }}
            />
          ))}
        </div>
      </div>

      <DialogueBox
        text={
          isCorrect === null
            ? 'Choose the correct energy form to see how energy keeps moving and changing.'
            : isCorrect
            ? 'Correct! Energy changes form but never disappears. Great observation.'
            : 'Not quite yet. Try another option and watch the energy flow.'
        }
        onNext={goNext}
        showNext={isCorrect === true}
        nextLabel={scenarioIndex === scenarios.length - 1 ? 'Back to Menu' : 'Next'}
        style={{ position: 'static', marginTop: '1rem' }}
      />
    </motion.div>
  );
};

export default ConservationSim;
