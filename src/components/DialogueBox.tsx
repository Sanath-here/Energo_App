import React from 'react';
import { motion } from 'framer-motion';
import TextFit from './TextFit';

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
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', minHeight: 0, flex: 1 }}>
        <div className="dialogue-text dialogue-text-fit" style={{ width: '100%' }}>
          <TextFit
            text={text}
            minFontSize={12}
            maxFontSize={20}
            step={1}
            lineHeight={1.6}
            allowWrap={true}
            style={{ width: '100%', color: 'var(--text)' }}
          />
        </div>
        {details && (
          <div className="dialogue-text dialogue-details dialogue-text-fit" style={{ marginTop: '0.75rem', color: '#d1d5db' }}>
            <TextFit
              text={details}
              minFontSize={11}
              maxFontSize={16}
              step={1}
              lineHeight={1.55}
              allowWrap={true}
              style={{ width: '100%', color: '#d1d5db' }}
            />
          </div>
        )}
      </div>
      {showNext && (
        <div className="dialogue-actions" style={{ marginTop: '1rem' }}>
          <button className="btn btn-primary" onClick={onNext}>
            {nextLabel || 'Next'}
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default DialogueBox;