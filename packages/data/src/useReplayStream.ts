import { useEffect, useState, useRef } from 'react';
import { CircularBuffer } from '@oathis/ui';
import { ECGReplayEngine } from './replay';

export function useReplayStream(subjectId: string, sessionId?: string) {
  const [isConnected, setIsConnected] = useState(false);
  const bufferRef = useRef(new CircularBuffer()); 
  const engineRef = useRef<ECGReplayEngine | null>(null);

  useEffect(() => {
    let active = true;

    async function startReplay() {
      const engine = new ECGReplayEngine();
      engineRef.current = engine;
      
      await engine.load(subjectId, sessionId);
      
      if (!active) return;
      
      engine.start((samples) => {
        bufferRef.current.push(samples);
      });
      setIsConnected(true);
    }
    
    startReplay();

    return () => {
      active = false;
      if (engineRef.current) {
        engineRef.current.stop();
      }
      setIsConnected(false);
    };
  }, [subjectId, sessionId]);

  return { buffer: bufferRef, isConnected };
}
