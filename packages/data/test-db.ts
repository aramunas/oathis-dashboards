import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '../../../../.env.shared' });

const supabaseUrl = process.env.ATLAS_SUPABASE_URL;
const supabaseKey = process.env.ATLAS_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
  const { data, error } = await supabase.from('atlas_subjects').select('*');
  if (error) console.error(error);
  else console.log(JSON.stringify(data, null, 2));
}
main();