import { Router } from 'express';
import axios from 'axios';
import { supabase } from '../lib/supabase';

const router = Router();

const OURA_CLIENT_ID = process.env.OURA_CLIENT_ID || '';
const OURA_CLIENT_SECRET = process.env.OURA_CLIENT_SECRET || '';
const REDIRECT_URI = 'https://demo-ha.oathis.com/api/oura/callback';

router.get('/authorize', (req, res) => {
  const { subject_id } = req.query;
  if (!subject_id) {
    return res.status(400).json({ error: 'Missing subject_id' });
  }
  
  // Oura auth url with required scopes
  const scope = 'daily email heartrate personal session';
  const url = `https://cloud.ouraring.com/oauth/authorize?response_type=code&client_id=${OURA_CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${subject_id}&scope=${encodeURIComponent(scope)}`;
  
  res.redirect(url);
});

router.get('/callback', async (req, res) => {
  const { code, state: subject_id, error } = req.query;
  
  if (error) {
    return res.status(400).json({ error });
  }
  
  if (!code || !subject_id) {
    return res.status(400).json({ error: 'Missing code or state' });
  }

  try {
    const tokenResponse = await axios.post('https://api.ouraring.com/oauth/token', new URLSearchParams({
      grant_type: 'authorization_code',
      code: code as string,
      client_id: OURA_CLIENT_ID,
      client_secret: OURA_CLIENT_SECRET,
      redirect_uri: REDIRECT_URI
    }).toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const { access_token } = tokenResponse.data;

    // Simulate encryption by base64 encoding (as specified for the demo without a key)
    const encryptedToken = Buffer.from(access_token).toString('base64');
    
    // Store in admin_config
    const { error: dbError } = await supabase
      .from('atlas_admin_config')
      .upsert({
        key: `oura_token_${subject_id}`,
        value: encryptedToken
      }, { onConflict: 'key' });
      
    if (dbError) {
      console.error('Database error storing token:', dbError);
      return res.status(500).json({ error: 'Failed to store token' });
    }

    res.send('Successfully connected Oura! You can close this window.');

  } catch (err: any) {
    console.error('Oura callback error:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to complete OAuth flow' });
  }
});

export default router;
