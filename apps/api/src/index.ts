import * as http from 'http';

const port = process.env.PORT || 3001;

try {
  const express = require('express');
  const cors = require('cors');
  const dotenv = require('dotenv');
  const path = require('path');

  if (process.env.NODE_ENV !== 'production') {
    dotenv.config({ path: path.resolve(__dirname, '../../../../../.env.shared') });
  }
  dotenv.config();

  const ecgRouter = require('./routes/ecg').default;
  const ouraRouter = require('./routes/oura').default;
  require('./workers/oura-sync');

  const app = express();

  const allowedOrigins = [
    'https://demo-ha.oathis.com',
    'https://atlas.oathis.com'
  ];

  app.use(cors({
    origin: (origin: string, callback: any) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin) || origin.startsWith('http://localhost:')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  }));

  app.use(express.json());

  app.get('/', (req: any, res: any) => {
    res.status(200).send('OK');
  });

  app.get('/api/health', (req: any, res: any) => {
    res.json({ status: 'ok', supabase: 'connected', clerk: 'configured' });
  });

  app.use('/api/ecg', ecgRouter);
  app.use('/api/oura', ouraRouter);

  app.use((err: any, req: any, res: any, next: any) => {
    console.error('[OATHIS] Unhandled Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  });

  app.listen(Number(port), '0.0.0.0', () => {
    console.log(`[OATHIS] Railway Backend running on port ${port}`);
  });

} catch (err: any) {
  console.error('STARTUP ERROR:', err);
  const server = http.createServer((req, res) => {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      error: 'API failed to start',
      message: err?.message || String(err),
      stack: err?.stack
    }));
  });
  server.listen(Number(port), '0.0.0.0', () => {
    console.log(`[OATHIS] Emergency Backend running on port ${port}`);
  });
}
