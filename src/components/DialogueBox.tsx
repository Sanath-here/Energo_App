import React from 'react';
import { motion } from 'framer-motion';

interface DialogueBoxProps {
  text: string;
  details?: string;
  onNext?: () => void;
  showNext?: boolean;
}

const DialogueBox: React.FC<DialogueBoxProps> = ({ text, details, onNext, showNext = true }) => {
  return (
    <motion.div 
      className="dialogue-box glass"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <p className="dialogue-text" style={{ whiteSpace: 'pre-wrap' }}>{text}</p>
      {details && <p className="dialogue-text dialogue-details" style={{ whiteSpace: 'pre-wrap', marginTop: '0.75rem', color: '#d1d5db' }}>{details}</p>}
      {showNext && (
        <div className="dialogue-actions">
          <button className="btn btn-primary" onClick={onNext}>
            Next
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default DialogueBox;
