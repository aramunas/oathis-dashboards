import { Router, Request, Response, RequestHandler } from 'express';
import { createHash } from 'crypto';
import { supabase } from '../lib/supabase';
import { oathisStack } from '../middleware/oathis';
import { OathisRequestContext } from '../types';

export interface OathisRequest extends Request, OathisRequestContext {}

const router = Router();

// POST /api/ecg/ingest
router.post('/ingest', oathisStack as unknown as RequestHandler[], async (req: Request, res: Response) => {
  try {
    const oathisReq = req as OathisRequest;
    const { session_id, timestamp_ms, samples, sample_rate_hz, device_serial, batch_hash } = req.body;

    const subjectId = oathisReq.subjectId;
    if (!subjectId) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    // 3. Verify SHA-256
    if (!samples || !Array.isArray(samples)) {
      res.status(400).json({ error: 'Invalid payload: samples array missing' });
      return;
    }
    const computedHash = createHash('sha256').update(JSON.stringify(samples)).digest('hex');
    if (computedHash !== batch_hash) {
      res.status(400).json({ error: 'Hash mismatch: data integrity validation failed' });
      return;
    }

    // 4. INSERT into atlas_ecg_samples
    const { error: insertError } = await supabase.from('atlas_ecg_samples').insert({
      session_id,
      timestamp_ms,
      samples,
      sample_rate_hz,
      device_serial,
      subject_id: subjectId
    });

    if (insertError) {
      console.error('[OATHIS] Error inserting ECG samples:', insertError);
      res.status(500).json({ error: 'Database error during insertion' });
      return;
    }

    // 5. INSERT into audit_log
    const { error: auditError } = await supabase.from('audit_log').insert({
      actor_id: subjectId,
      action: 'INGEST_ECG',
      resource: 'atlas_ecg_samples',
      details: { session_id, sample_count: samples.length, device_serial },
      timestamp: new Date().toISOString()
    });

    if (auditError) {
      console.error('[OATHIS] Error inserting audit log:', auditError);
      // Non-fatal, we still accepted the data, but logging failure is critical for Oathis compliance
    }

    // 6. Return success
    res.status(200).json({ received: true, sample_count: samples.length });
    return;
  } catch (error) {
    console.error('[OATHIS] API Error in /ecg/ingest:', error);
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
});

export default router;
