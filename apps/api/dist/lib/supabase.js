"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load shared env variables from the root directory
if (process.env.NODE_ENV !== 'production') {
    dotenv_1.default.config({ path: path_1.default.resolve(__dirname, '../../../../../.env.shared') });
}
dotenv_1.default.config();
const supabaseUrl = process.env.ATLAS_SUPABASE_URL || '';
const supabaseKey = process.env.ATLAS_SUPABASE_SERVICE_ROLE_KEY || '';
if (!supabaseUrl || !supabaseKey) {
    console.warn('Warning: Missing Supabase URL or Service Role Key in environment variables');
}
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl || 'https://placeholder.supabase.co', supabaseKey || 'placeholder');
