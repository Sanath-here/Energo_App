import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import DialogueBox from '../components/DialogueBox';

interface HeatTaskProps {
  onComplete: () => void;
}

const HeatTask: React.FC<HeatTaskProps> = ({ onComplete }) => {
  const [showIntro, setShowIntro] = useState(true);
  const [heatLevel, setHeatLevel] = useState(0);
  const [taskComplete, setTaskComplete] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [motionLevel, setMotionLevel] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const previousFrameRef = useRef<ImageData | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const tryInitCamera = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setCameraError('Camera is not supported in this browser. Use the manual rub button instead.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraActive(true);
      setCameraError(null);
    } catch (error) {
      setCameraError('Camera access was denied. Use the manual rub option instead.');
    }
  };

  useEffect(() => {
    if (!showIntro) {
      tryInitCamera();
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [showIntro]);

  useEffect(() => {
    if (!cameraActive) return;

    const processFrame = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) {
        animationFrameRef.current = requestAnimationFrame(processFrame);
        return;
      }

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        animationFrameRef.current = requestAnimationFrame(processFrame);
        return;
      }

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const currentFrame = ctx.getImageData(0, 0, canvas.width, canvas.height);

      if (previousFrameRef.current) {
        let totalDiff = 0;
        const length = currentFrame.data.length;
        for (let i = 0; i < length; i += 4) {
          totalDiff += Math.abs(currentFrame.data[i] - previousFrameRef.current.data[i]);
          totalDiff += Math.abs(currentFrame.data[i + 1] - previousFrameRef.current.data[i + 1]);
          totalDiff += Math.abs(currentFrame.data[i + 2] - previousFrameRef.current.data[i + 2]);
        }

        const motion = Math.min(100, (totalDiff / (length / 4) / 255) * 200);
        setMotionLevel(motion);

        if (motion > 14) {
          setHeatLevel(prev => Math.min(100, prev + 6));
        }
      }

      previousFrameRef.current = currentFrame;
      animationFrameRef.current = requestAnimationFrame(processFrame);
    };

    animationFrameRef.current = requestAnimationFrame(processFrame);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [cameraActive]);

  useEffect(() => {
    if (heatLevel >= 100) {
      setTaskComplete(true);
    }
  }, [heatLevel]);

  const rubHands = () => {
    if (heatLevel < 100) {
      setHeatLevel(prev => Math.min(100, prev + 14));
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
                You can use your camera to show how your hands move. If the camera is unavailable, you can still rub hands with the button.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full max-w-md mt-auto">
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
        className="h-full flex flex-col items-center justify-start py-6 pb-28 overflow-y-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-xl font-bold">Heat (Thermal) Energy</h2>
        
        <div className="w-full max-w-xl flex flex-col items-center gap-6 px-6 pb-6">
          <div className="glass relative w-full h-44 rounded-xl border border-gray-600 overflow-hidden flex items-center justify-center">
            <video ref={videoRef} className="absolute inset-0 h-full w-full object-cover opacity-80" playsInline muted />
            <canvas ref={canvasRef} width={160} height={120} className="hidden" />

            <div className="relative z-10 text-center px-4">
              <p className="text-sm text-gray-300 mb-2">
                {cameraActive && !cameraError
                  ? 'Camera active. Move your hands close to the lens to show rubbing motion.'
                  : cameraError
                  ? cameraError
                  : 'Allow camera access to detect your hand motion automatically.'}
              </p>
              <p className="text-xs text-gray-400">
                Motion strength: {Math.round(motionLevel)}%
              </p>
            </div>
          </div>

          <div className="w-full bg-gray-700 h-8 rounded-full overflow-hidden border border-gray-500">
            <motion.div
              className="h-full bg-gradient-heat"
              animate={{ width: `${heatLevel}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>

          <div className="w-full max-w-md grid grid-cols-1 gap-3 sm:grid-cols-2">
            <motion.button
              className="btn btn-primary"
              whileTap={{ scale: 0.96 }}
              onClick={rubHands}
              disabled={heatLevel >= 100}
            >
              {heatLevel >= 100 ? 'Warm!' : 'Rub Hands! 👏'}
            </motion.button>
            {cameraError ? null : (
              <button
                className="btn btn-secondary"
                onClick={tryInitCamera}
                disabled={cameraActive}
              >
                {cameraActive ? 'Camera Ready' : 'Enable Camera'}
              </button>
            )}
          </div>

        </div>
      </motion.div>

      <div className="absolute left-0 right-0 bottom-8 px-4">
        <DialogueBox
          text={heatLevel >= 100 ? 'Nice work! Friction from rubbing turns movement into Heat Energy.' : 'Grip the hands and rub them together to feel how heat is made by friction.'}
          onNext={onComplete}
          showNext={taskComplete}
          nextLabel="Back to Menu"
        />
      </div>
    </div>
  );
};

export default HeatTask;
