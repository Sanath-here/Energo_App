import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DialogueBox from '../components/DialogueBox';

interface ChemicalTaskProps {
  onComplete: () => void;
}

const foodItems = [
  { emoji: '🍎', name: 'Apple', energy: 28 },
  { emoji: '🍌', name: 'Banana', energy: 34 },
  { emoji: '🍗', name: 'Chicken', energy: 46 },
  { emoji: '🥕', name: 'Carrot', energy: 20 },
  { emoji: '🍫', name: 'Chocolate', energy: 40 },
];

const ChemicalTask: React.FC<ChemicalTaskProps> = ({ onComplete }) => {
  const [energyLevel, setEnergyLevel] = useState(0);
  const [lastFood, setLastFood] = useState('');
  const [usedIndex, setUsedIndex] = useState<number | null>(null);
  const [combo, setCombo] = useState<number>(0);

  const feedFood = (i: number) => {
    if (energyLevel >= 100) return;
    const item = foodItems[i];
    setUsedIndex(i);
    setLastFood(item.name);
    const added = Math.min(100 - energyLevel, item.energy + combo * 4);
    setEnergyLevel((e) => Math.min(100, e + added));
    setCombo((c) => (c >= 2 ? 0 : c + 1));
    window.setTimeout(() => setUsedIndex(null), 600);
  };

  const resetCombo = () => setCombo(0);

  return (
    <motion.div
      className="h-full flex flex-col items-center justify-between py-10"
      style={{ paddingBottom: '3.5rem', overflowY: 'auto' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-xl font-bold">Chemical Energy</h2>

      <div className="w-full max-w-xl flex flex-col items-center gap-6 px-6">
        <p className="text-sm text-gray-300 text-center">Feed the pot with ingredients to release chemical energy. Try combos for bonus energy!</p>

        <div className="w-full grid grid-cols-3 sm:grid-cols-5 gap-3">
          {foodItems.map((food, i) => (
            <motion.button
              key={food.name}
              className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-white-10 border border-gray-600 text-sm`}
              whileTap={{ scale: 0.95 }}
              onClick={() => feedFood(i)}
              disabled={energyLevel >= 100}
            >
              <div style={{ fontSize: 28 }} className={usedIndex === i ? 'animate-pop' : ''}>{food.emoji}</div>
              <div className="text-xs text-gray-300">{food.name}</div>
            </motion.button>
          ))}
        </div>

        <div className="w-full bg-gray-700 h-10 rounded-full overflow-hidden border border-gray-500">
          <motion.div
            className="h-full bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400"
            initial={{ width: '0%' }}
            animate={{ width: `${energyLevel}%` }}
            transition={{ duration: 0.35 }}
          />
        </div>

        <div className="w-full h-32 bg-white-10 border border-gray-600 rounded-lg flex items-center justify-center text-center px-4">
          <div>
            <p className="text-sm text-gray-300">Chemical energy is stored in food and released when it's used.</p>
            <p className="mt-2 font-semibold">{lastFood ? `You used ${lastFood}! Combo x${combo}` : 'Tap an ingredient to add it to the pot.'}</p>
            <button className="btn mt-3" onClick={resetCombo}>Reset Combo</button>
          </div>
        </div>
      </div>

      <DialogueBox
        text={energyLevel >= 100 ? 'Awesome! You released a lot of chemical energy — that could power muscles and machines.' : 'Chemical energy comes from food and fuel. Feed the pot to release energy!'}
        onNext={onComplete}
        showNext={energyLevel >= 100}
      />
    </motion.div>
  );
};

export default ChemicalTask;
