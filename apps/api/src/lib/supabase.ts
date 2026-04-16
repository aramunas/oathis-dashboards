import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load shared env variables from the root directory
dotenv.config({ path: path.resolve(__dirname, '../../../../../.env.shared') });
dotenv.config();

const supabaseUrl = process.env.ATLAS_SUPABASE_URL || '';
const supabaseKey = process.env.ATLAS_SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseKey) {
  console.warn('Warning: Missing Supabase URL or Service Role Key in environment variables');
}

export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseKey || 'placeholder');
