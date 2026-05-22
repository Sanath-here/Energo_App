import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FinalQuizProps {
  onComplete: () => void;
}

const questions = [
  { q: "What energy is in a moving ball?", a: ["Mechanical", "Chemical", "Electrical"], c: 0 },
  { q: "Energy from the sun is mainly...", a: ["Mechanical", "Light & Heat", "Sound"], c: 1 },
  { q: "Rubbing hands creates...", a: ["Heat", "Light", "Chemical"], c: 0 },
  { q: "Batteries store...", a: ["Chemical Energy", "Heat Energy", "Light Energy"], c: 0 },
  { q: "Can energy be destroyed?", a: ["Yes", "No", "Only on Sundays"], c: 1 },
  { q: "A toaster changes Electrical to...", a: ["Sound", "Heat", "Mechanical"], c: 1 },
  { q: "A dam turns water flow into...", a: ["Food", "Electrical Energy", "Heat"], c: 1 },
  { q: "Energy is the ability to do...", a: ["Sleep", "Work", "Nothing"], c: 1 },
  { q: "Plants use ______ energy to grow.", a: ["Electrical", "Light", "Sound"], c: 1 },
  { q: "A car uses fuel which is ______ energy.", a: ["Heat", "Mechanical", "Chemical"], c: 2 }
];

const FinalQuiz: React.FC<FinalQuizProps> = ({ onComplete }) => {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  const emojiBank = ['✨','🚀','🔥','🌟','⚡','🎉','💡','🌈','🍳','🔋'];

  const handleAnswer = (idx: number) => {
    if (selected !== null) return; // prevent double-click
    setSelected(idx);

    const correct = idx === questions[currentQ].c;
    if (correct) setScore((s) => s + 1);

    // show feedback then advance
    setTimeout(() => {
      setSelected(null);
      if (currentQ < questions.length - 1) {
        setCurrentQ((i) => i + 1);
      } else {
        setIsFinished(true);
      }
    }, 700);
  };

  if (isFinished) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-bold mb-4">Quiz Complete!</h2>
        <div className="text-5xl font-bold text-yellow-400 mb-6"> {score} / {questions.length} </div>
        <p className="mb-8">Excellent effort! You learned a lot about energy today.</p>
        <button className="btn btn-primary" onClick={onComplete}>Finish Game</button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center justify-between py-10">
      <div className="text-center px-4 w-full max-w-md">
        <p className="text-sm text-gray-400 mb-2">Question {currentQ + 1} of {questions.length}</p>
        <h2 className="final-quiz-question font-extrabold mb-6">{emojiBank[currentQ % emojiBank.length]} {questions[currentQ].q}</h2>
        <div className="space-y-3">
          {questions[currentQ].a.map((opt, i) => {
            const isSelected = selected === i;
            const correct = i === questions[currentQ].c;
            const cls = `final-quiz-option ${isSelected ? (correct ? 'correct' : 'wrong') : ''}`;
            return (
              <motion.button 
                key={i}
                className={cls}
                whileHover={selected === null ? { scale: 1.02 } : undefined}
                whileTap={{ scale: 0.985 }}
                onClick={() => handleAnswer(i)}
                disabled={selected !== null}
              >
                <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                  <span style={{fontSize: '1.25rem'}}>{['🔵','🟡','🟣'][i % 3]}</span>
                  <span>{opt}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FinalQuiz;
