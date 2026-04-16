"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load shared .env for local development
if (process.env.NODE_ENV !== 'production') {
    dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../../../../.env.shared') });
}
dotenv_1.default.config();
const ecg_1 = __importDefault(require("./routes/ecg"));
const oura_1 = __importDefault(require("./routes/oura"));
require("./workers/oura-sync");
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
// CORS configuration based on Phase 2 requirements
const allowedOrigins = [
    'https://demo-ha.oathis.com',
    'https://atlas.oathis.com'
];
app.use((0, cors_1.default)({
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
app.use(express_1.default.json());
// Root health endpoint for Railway default checks
app.get("/", (req, res) => {
    res.status(200).send("OK");
});
// Health endpoint (Task 1.4)
app.get("/api/health", (req, res) => {
    res.json({ status: "ok", supabase: "connected", clerk: "configured" });
});
// API Routes
app.use("/api/ecg", ecg_1.default);
app.use("/api/oura", oura_1.default);
// Global Error Handler
app.use((err, req, res, next) => {
    console.error('[OATHIS] Unhandled Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});
app.listen(Number(port), "0.0.0.0", () => {
    console.log(`[OATHIS] Railway Backend running on port ${port}`);
});
