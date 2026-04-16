import { useEffect, useState, useRef } from 'react';
import { supabase } from './supabase';
import { CircularBuffer } from '@oathis/ui';

export function useECGStream(subjectId: string) {
  const [isConnected, setIsConnected] = useState(false);
  const bufferRef = useRef(new CircularBuffer()); 

  useEffect(() => {
    const channel = supabase
      .channel(`ecg:${subjectId}`)
      .on('broadcast', { event: 'ecg_data' }, (payload) => {
        if (payload.payload && payload.payload.samples) {
          bufferRef.current.push(payload.payload.samples);
        }
      })
      .subscribe((status) => {
        setIsConnected(status === 'SUBSCRIBED');
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [subjectId]);

  return { buffer: bufferRef, isConnected };
}
