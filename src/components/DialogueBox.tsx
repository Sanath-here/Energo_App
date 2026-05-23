import React from 'react';
import { motion } from 'framer-motion';

interface DialogueBoxProps {
  text: string;
  details?: string;
  onNext?: () => void;
  showNext?: boolean;
  nextLabel?: string;
  style?: React.CSSProperties;
}

const DialogueBox: React.FC<DialogueBoxProps> = ({ text, details, onNext, showNext = true, nextLabel, style }) => {
  return (
    <motion.div
      className="dialogue-box glass"
      style={{ display: 'flex', flexDirection: 'column', ...style }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'var(--text)', padding: '0 0.5rem' }}>
          {text}
        </p>
        {details && (
          <p style={{ fontSize: '0.875rem', lineHeight: 1.55, color: '#d1d5db', padding: '0 0.5rem' }}>
            {details}
          </p>
        )}
      </div>
      {showNext && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.65rem' }}>
  <button className="btn btn-primary" onClick={onNext}>
    {nextLabel || 'Next'}
  </button>
</div>
      )}
    </motion.div>
  );
};

export default DialogueBox;