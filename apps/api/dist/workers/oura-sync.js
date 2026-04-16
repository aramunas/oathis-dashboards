"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const axios_1 = __importDefault(require("axios"));
const supabase_1 = require("../lib/supabase");
// Run every 5 minutes
node_cron_1.default.schedule('*/5 * * * *', async () => {
    console.log('[OATHIS] Running Oura sync worker...');
    try {
        // Fetch all Oura tokens from atlas_admin_config
        const { data: configs, error } = await supabase_1.supabase
            .from('atlas_admin_config')
            .select('*')
            .like('key', 'oura_token_%');
        if (error) {
            console.error('[OATHIS] Failed to fetch Oura tokens:', error);
            return;
        }
        if (!configs || configs.length === 0) {
            return;
        }
        // Calculate start and end dates (e.g., last 24 hours)
        const today = new Date();
        const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
        const end_date = today.toISOString().split('T')[0];
        const start_date = yesterday.toISOString().split('T')[0];
        for (const config of configs) {
            const subject_id = config.key.replace('oura_token_', '');
            // Decode simulated encryption
            const access_token = Buffer.from(config.value, 'base64').toString('utf-8');
            const headers = { 'Authorization': `Bearer ${access_token}` };
            const metrics = {
                subject_id,
                timestamp: new Date().toISOString()
            };
            try {
                // Fetch Heart Rate
                const hrRes = await axios_1.default.get('https://api.ouraring.com/v2/usercollection/heartrate', { headers });
                if (hrRes.data?.data?.length > 0) {
                    metrics.heart_rate = hrRes.data.data[hrRes.data.data.length - 1].bpm;
                }
                // Fetch Daily Sleep
                const sleepRes = await axios_1.default.get(`https://api.ouraring.com/v2/usercollection/daily_sleep?start_date=${start_date}&end_date=${end_date}`, { headers });
                if (sleepRes.data?.data?.length > 0) {
                    metrics.sleep_score = sleepRes.data.data[sleepRes.data.data.length - 1].score;
                }
                // Fetch Daily Readiness
                const readinessRes = await axios_1.default.get(`https://api.ouraring.com/v2/usercollection/daily_readiness?start_date=${start_date}&end_date=${end_date}`, { headers });
                if (readinessRes.data?.data?.length > 0) {
                    metrics.readiness = readinessRes.data.data[readinessRes.data.data.length - 1].score;
                }
                // Fetch Daily SpO2
                const spo2Res = await axios_1.default.get(`https://api.ouraring.com/v2/usercollection/daily_spo2?start_date=${start_date}&end_date=${end_date}`, { headers });
                if (spo2Res.data?.data?.length > 0) {
                    metrics.spo2 = spo2Res.data.data[spo2Res.data.data.length - 1].percentage?.average;
                }
                // Insert into atlas_wearable_metrics if any metric was found
                if (metrics.heart_rate || metrics.sleep_score || metrics.readiness || metrics.spo2) {
                    const { error: insertError } = await supabase_1.supabase
                        .from('atlas_wearable_metrics')
                        .insert(metrics);
                    if (insertError) {
                        console.error(`[OATHIS] Failed inserting Oura metrics for ${subject_id}:`, insertError);
                    }
                    else {
                        console.log(`[OATHIS] Inserted Oura metrics for ${subject_id}`);
                    }
                }
            }
            catch (reqErr) {
                console.error(`[OATHIS] Failed fetching Oura data for ${subject_id}:`, reqErr.response?.data || reqErr.message);
            }
        }
    }
    catch (err) {
        console.error('[OATHIS] Error in Oura sync worker:', err);
    }
});
console.log('[OATHIS] Oura sync worker initialized.');
