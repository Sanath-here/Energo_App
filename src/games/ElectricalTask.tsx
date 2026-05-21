import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DialogueBox from '../components/DialogueBox';

interface ElectricalTaskProps {
  onComplete: () => void;
}

const clamp = (v: number, a = 0, b = 100) => Math.max(a, Math.min(b, v));

const ElectricalTask: React.FC<ElectricalTaskProps> = ({ onComplete }) => {
  const [wireConnected, setWireConnected] = useState(false);
  const [batteryCharge, setBatteryCharge] = useState(0);
  const [isCharging, setIsCharging] = useState(false);

  const handleCharge = () => {
    if (batteryCharge >= 100) return;
    setIsCharging(true);
    setBatteryCharge((c) => clamp(c + 20));
    window.setTimeout(() => setIsCharging(false), 300);
  };

  const onConnectorDragEnd = (_: any, info: { offset: { x: number } }) => {
    if (info.offset.x > 104) {
      setWireConnected(true);
    }
  };

  const bulbLit = wireConnected && batteryCharge >= 50;

  return (
    <motion.div
      className="h-full flex flex-col items-center justify-between py-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-xl font-bold">Electrical Energy</h2>

      <div className="w-full max-w-xl flex flex-col items-center gap-6 px-6">
        <div className="relative w-full h-36 rounded-lg bg-white-10 border border-gray-600 p-4 flex items-center gap-4">
          <div className="flex flex-col items-center gap-2" style={{ width: 90 }}>
            <div className="w-20 h-12 rounded-md bg-gray-800 border border-gray-600 flex items-center justify-center text-xs font-bold">BATTERY</div>
            <div className="w-20 h-6 bg-gray-700 rounded-full overflow-hidden border border-gray-600">
              <motion.div className="h-full bg-green-400" animate={{ width: `${batteryCharge}%` }} transition={{ duration: 0.25 }} />
            </div>
            <div className="text-xs text-gray-300">{batteryCharge}%</div>
          </div>

          <div className="relative flex-1 h-4 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full bg-blue-400 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: wireConnected ? '100%' : `${batteryCharge}%` }}
              transition={{ duration: 0.35 }}
            />

            {!wireConnected && (
              <motion.div
                className="absolute left-0 top-1/2 w-8 h-8 bg-blue-500 rounded-full cursor-grab"
                style={{ transform: 'translate(-50%, -50%)' }}
                drag="x"
                dragConstraints={{ left: 0, right: 140 }}
                dragElastic={0}
                onDragEnd={onConnectorDragEnd}
              />
            )}
          </div>

          <div className="w-28 h-28 flex items-center justify-center">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-shadow ${bulbLit ? 'shadow-xl' : ''}`}
              style={{ background: bulbLit ? 'radial-gradient(circle at center, #fff 0%, #ffd86b 40%, rgba(245,158,11,0.15) 100%)' : 'rgba(55,65,81,1)' }}
            >
              <div style={{ fontSize: 20 }}>{bulbLit ? '💡' : '💤'}</div>
            </div>
            {wireConnected && (
              <motion.div
                className="absolute right-6 top-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: bulbLit ? 1 : 0 }}
                transition={{ repeat: bulbLit ? Infinity : 0, duration: 0.8 }}
              >
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 12h20" stroke={bulbLit ? '#FBBF24' : '#6B7280'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M6 8l4 8" stroke={bulbLit ? '#FBBF24' : '#6B7280'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </motion.div>
            )}
          </div>
        </div>

        <div className="w-full flex gap-3">
          <button className="btn btn-primary flex-1" onClick={handleCharge} disabled={batteryCharge >= 100}>
            {isCharging ? 'Charging...' : batteryCharge >= 100 ? 'Full' : 'Charge Battery ⚡'}
          </button>
          {!wireConnected && (
            <button className="btn btn-secondary" onClick={() => setBatteryCharge((c) => clamp(c + 10))} disabled={batteryCharge >= 100}>
              Quick Tap +10
            </button>
          )}
        </div>

        <p className="text-sm text-center px-6">
          Charge the battery, then slide the connector to complete the circuit. If the battery is charged enough, the bulb lights brightly!
        </p>
      </div>

      <DialogueBox
        text={
          bulbLit
            ? 'Nice! The bulb glows because current is flowing from the charged battery.'
            : wireConnected
            ? 'Connected but battery is low. Charge it more to brighten the bulb.'
            : 'Electrical energy comes from moving electrons. Connect the wire and charge the battery!'
        }
        onNext={onComplete}
        showNext={bulbLit}
      />
    </motion.div>
  );
};

export default ElectricalTask;
