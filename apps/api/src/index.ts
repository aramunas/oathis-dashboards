import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

// Load shared .env for local development
dotenv.config({ path: path.resolve(__dirname, '../../../../../.env.shared') });
dotenv.config();

import ecgRouter from "./routes/ecg";
import ouraRouter from "./routes/oura";
import "./workers/oura-sync";

const app = express();
const port = process.env.PORT || 3001;

// CORS configuration based on Phase 2 requirements
const allowedOrigins = [
  'https://demo-ha.oathis.com',
  'https://atlas.oathis.com'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin) || origin.startsWith('http://localhost:')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(express.json());

// Health endpoint (Task 1.4)
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", supabase: "connected", clerk: "configured" });
});

// API Routes
app.use("/api/ecg", ecgRouter);
app.use("/api/oura", ouraRouter);

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[OATHIS] Unhandled Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(Number(port), "0.0.0.0", () => {
  console.log(`[OATHIS] Railway Backend running on port ${port}`);
});
