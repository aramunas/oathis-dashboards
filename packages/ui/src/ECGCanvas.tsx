"use client";

import React, { useEffect, useRef } from 'react';

const SAMPLE_RATE = 130;
const DISPLAY_SECONDS = 5;
const DISPLAY_SAMPLES = SAMPLE_RATE * DISPLAY_SECONDS; // 650
const BUFFER_SIZE = DISPLAY_SAMPLES * 4; // 20 seconds

export class CircularBuffer {
  samples: Float32Array;
  writeIdx: number = 0;
  readIdx: number = 0;
  lastDataTime: number = 0;

  constructor() {
    this.samples = new Float32Array(BUFFER_SIZE).fill(NaN);
  }

  push(newSamples: number[]) {
    const now = performance.now();
    
    // Handle gaps > 2 seconds
    if (this.lastDataTime > 0 && now - this.lastDataTime > 2000) {
      const gapSeconds = (now - this.lastDataTime) / 1000;
      const gapSamples = Math.min(Math.floor(gapSeconds * SAMPLE_RATE), BUFFER_SIZE);
      for (let i = 0; i < gapSamples; i++) {
        this.samples[this.writeIdx % BUFFER_SIZE] = NaN;
        this.writeIdx++;
      }
    }
    
    for (let i = 0; i < newSamples.length; i++) {
      this.samples[this.writeIdx % BUFFER_SIZE] = newSamples[i];
      this.writeIdx++;
    }
    
    this.lastDataTime = now;

    // Initialize or correct read pointer
    if (this.writeIdx === newSamples.length) {
      // First push
      this.readIdx = 0;
    } else if (this.writeIdx - this.readIdx > DISPLAY_SAMPLES + SAMPLE_RATE * 2) {
      // Catch up if read pointer is too far behind (e.g., > 2 seconds buffer backlog)
      this.readIdx = this.writeIdx - DISPLAY_SAMPLES;
    }
  }
}

export interface ECGCanvasProps {
  buffer: React.MutableRefObject<CircularBuffer>;
}

export function ECGCanvas({ buffer }: ECGCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = performance.now();
    let frameCount = 0;
    let lastFpsTime = performance.now();
    let fps = 0;

    const render = (time: number) => {
      const dt = time - lastTime;
      lastTime = time;
      
      frameCount++;
      if (time - lastFpsTime >= 1000) {
        fps = Math.round((frameCount * 1000) / (time - lastFpsTime));
        frameCount = 0;
        lastFpsTime = time;
      }

      const buf = buffer.current;
      const targetReadIdx = buf.writeIdx - SAMPLE_RATE * 0.5; // Target a 500ms delay to smooth out networking jitter
      
      if (buf.writeIdx > 0 && buf.readIdx < targetReadIdx) {
        buf.readIdx += (SAMPLE_RATE * dt) / 1000;
        
        // Speed up if falling behind, to maintain realtime
        if (targetReadIdx - buf.readIdx > SAMPLE_RATE * 1.5) {
           buf.readIdx += (SAMPLE_RATE * dt * 0.5) / 1000; // 50% faster
        }
      }

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      // Handle resize
      if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
      }

      const width = canvas.width;
      const height = canvas.height;

      // 1. Draw Background
      ctx.fillStyle = '#0A0E17'; // titanium-deep
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Static Grid
      ctx.lineWidth = 1 * dpr;
      const pixelsPerSample = width / DISPLAY_SAMPLES;
      const minorGridPixels = 5.2 * pixelsPerSample; // 40ms
      const majorGridPixels = 26 * pixelsPerSample;  // 200ms

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      for (let x = 0; x <= width; x += minorGridPixels) {
        ctx.moveTo(x, 0); ctx.lineTo(x, height);
      }
      for (let y = height / 2; y <= height; y += minorGridPixels) {
        ctx.moveTo(0, y); ctx.lineTo(width, y);
      }
      for (let y = height / 2; y >= 0; y -= minorGridPixels) {
        ctx.moveTo(0, y); ctx.lineTo(width, y);
      }
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      for (let x = 0; x <= width; x += majorGridPixels) {
        ctx.moveTo(x, 0); ctx.lineTo(x, height);
      }
      for (let y = height / 2; y <= height; y += majorGridPixels) {
        ctx.moveTo(0, y); ctx.lineTo(width, y);
      }
      for (let y = height / 2; y >= 0; y -= majorGridPixels) {
        ctx.moveTo(0, y); ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 3. Draw Waveform
      // Right-to-left sweep: oldest on the left, newest on the right.
      ctx.beginPath();
      ctx.strokeStyle = '#60C8A8'; // mint
      ctx.lineWidth = 1.5 * dpr;
      ctx.shadowColor = '#60C8A8';
      ctx.shadowBlur = 6 * dpr;
      ctx.lineJoin = 'round';
      ctx.lineCap = 'round';

      const centerY = height / 2;
      // Typical ECG range is ~ -2.5mV to +2.5mV.
      // Scaling assuming input is in microvolts (e.g. +/- 1000uV) to fit half height.
      const scaleY = (height / 2) / 1000; 

      let firstPoint = true;
      const startIdx = Math.max(0, buf.readIdx - DISPLAY_SAMPLES);
      
      for (let i = 0; i < DISPLAY_SAMPLES; i++) {
        const idx = Math.floor(startIdx + i);
        if (idx < 0 || idx >= buf.writeIdx) continue;
        
        const val = buf.samples[idx % BUFFER_SIZE];
        const x = i * pixelsPerSample;
        
        if (isNaN(val)) {
          firstPoint = true;
          continue;
        }

        // Invert Y because canvas Y grows downwards
        const y = centerY - (val * scaleY);

        if (firstPoint) {
          ctx.moveTo(x, y);
          firstPoint = false;
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      
      // Reset shadow before drawing text
      ctx.shadowBlur = 0;

      // 4. Draw FPS (Dev Only)
      if (process.env.NODE_ENV === 'development') {
        ctx.fillStyle = '#60C8A8';
        ctx.font = `${10 * dpr}px "JetBrains Mono", monospace`;
        ctx.fillText(`FPS: ${fps}`, 10 * dpr, 20 * dpr);
        ctx.fillText(`Delay: ${Math.round((buf.writeIdx - buf.readIdx) / SAMPLE_RATE * 1000)}ms`, 10 * dpr, 35 * dpr);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [buffer]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-[200px] block rounded-xl overflow-hidden" 
      style={{
        background: '#0A0E17',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    />
  );
}
