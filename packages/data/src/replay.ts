import { supabase } from './supabase';

export class ECGReplayEngine {
  private sessionData: number[][] = [];
  private playbackIndex = 0;
  private interval: NodeJS.Timeout | null = null;

  async load(subjectId: string, sessionId?: string): Promise<void> {
    try {
      const response = await fetch(`/api/replay?subject_id=${subjectId}${sessionId ? `&session_id=${sessionId}` : ''}`);
      const result = await response.json();
      const data = result.data;
      
      if (data && data.length > 0) {
        this.sessionData = data.map((row: any) => row.samples);
        console.log(`[OATHIS] ReplayEngine loaded ${this.sessionData.length} batches for subject ${subjectId}`);
      } else {
        console.warn(`[OATHIS] ReplayEngine found no data for subject ${subjectId}, session ${sessionId}`);
      }
    } catch (error) {
      console.error('[OATHIS] ReplayEngine load error:', error);
    }
  }

  start(onBatch: (samples: number[]) => void): void {
    if (this.sessionData.length === 0) {
       console.warn('[OATHIS] ReplayEngine start called but no data loaded.');
       return;
    }
    
    // Every 1000ms, emit the next batch of 130 samples
    // Loop back to start when exhausted
    this.interval = setInterval(() => {
      onBatch(this.sessionData[this.playbackIndex % this.sessionData.length]);
      this.playbackIndex++;
    }, 1000);
  }

  stop(): void {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }
}
