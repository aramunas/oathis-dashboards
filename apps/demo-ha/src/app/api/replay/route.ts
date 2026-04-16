export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// We create a service-role client to bypass RLS for the demo replay fetching
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.ATLAS_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseKey || 'placeholder');

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const subjectId = searchParams.get('subject_id');
  const sessionId = searchParams.get('session_id');

  if (!subjectId) {
    return NextResponse.json({ error: 'Missing subject_id' }, { status: 400 });
  }

  let query = supabase
    .from('atlas_ecg_samples')
    .select('session_id, samples')
    .eq('subject_id', subjectId)
    .order('timestamp_ms', { ascending: true });
    
  if (sessionId) {
    query = query.eq('session_id', sessionId);
  } else {
    // Pick the first session_id we find to filter by
    const { data: sData } = await supabase
      .from('atlas_ecg_samples')
      .select('session_id')
      .eq('subject_id', subjectId)
      .limit(1);
    
    if (sData && sData.length > 0) {
      query = query.eq('session_id', sData[0].session_id);
    }
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}