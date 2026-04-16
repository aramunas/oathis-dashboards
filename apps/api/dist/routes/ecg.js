"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crypto_1 = require("crypto");
const supabase_1 = require("../lib/supabase");
const oathis_1 = require("../middleware/oathis");
const router = (0, express_1.Router)();
// POST /api/ecg/ingest
router.post('/ingest', oathis_1.oathisStack, async (req, res) => {
    try {
        const oathisReq = req;
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
        const computedHash = (0, crypto_1.createHash)('sha256').update(JSON.stringify(samples)).digest('hex');
        if (computedHash !== batch_hash) {
            res.status(400).json({ error: 'Hash mismatch: data integrity validation failed' });
            return;
        }
        // 4. INSERT into atlas_ecg_samples
        const { error: insertError } = await supabase_1.supabase.from('atlas_ecg_samples').insert({
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
        const { error: auditError } = await supabase_1.supabase.from('audit_log').insert({
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
    }
    catch (error) {
        console.error('[OATHIS] API Error in /ecg/ingest:', error);
        res.status(500).json({ error: 'Internal server error' });
        return;
    }
});
exports.default = router;
