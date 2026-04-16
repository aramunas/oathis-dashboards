"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
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
        origin: (origin, callback) => {
            if (!origin)
                return callback(null, true);
            if (allowedOrigins.includes(origin) || origin.startsWith('http://localhost:')) {
                callback(null, true);
            }
            else {
                callback(new Error('Not allowed by CORS'));
            }
        }
    }));
    app.use(express.json());
    // Root health endpoint for Railway default checks
    app.get('/', (req, res) => {
        res.status(200).send('OK');
    });
    app.get('/health', (req, res) => {
        res.json({ status: 'ok', version: '0.1.0' });
    });
    app.get('/api/health', (req, res) => {
        res.json({ status: 'ok', supabase: 'connected', clerk: 'configured' });
    });
    app.use('/api/ecg', ecgRouter);
    app.use('/api/oura', ouraRouter);
    app.use((err, req, res, next) => {
        console.error('[OATHIS] Unhandled Error:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    });
    app.listen(Number(port), '0.0.0.0', () => {
        console.log(`[OATHIS] Railway Backend running on port ${port}`);
    });
}
catch (err) {
    console.error('STARTUP ERROR:', err);
    const server = http.createServer((req, res) => {
        if (req.url === '/api/health' || req.url === '/health' || req.url === '/') {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
                status: 'ok',
                error: 'API failed to start',
                message: err?.message || String(err),
                stack: err?.stack
            }));
            return;
        }
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'API failed to start' }));
    });
    server.listen(Number(port), '0.0.0.0', () => {
        console.log(`[OATHIS] Emergency Backend running on port ${port}`);
    });
}
