import React from 'react';
import { motion } from 'framer-motion';

interface EnergoCharacterProps {
  emotion?: 'happy' | 'thinking' | 'excited' | 'surprised' | 'idle';
}

const EnergoCharacter: React.FC<EnergoCharacterProps> = ({ emotion = 'idle' }) => {
  const getImagePath = () => {
    switch (emotion) {
      case 'thinking': return '/energo_thinking.png';
      case 'excited': return '/energo_excited.png';
      case 'surprised': return '/energo_surprised.png';
      default: return '/energo.png';
    }
  };

  return (
    <motion.div 
      key={emotion}
      className="energo-container floating"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1' }}>
        <img 
          src={getImagePath()} 
          alt="Energo" 
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        />
      </div>
    </motion.div>
  );
};

export default EnergoCharacter;
