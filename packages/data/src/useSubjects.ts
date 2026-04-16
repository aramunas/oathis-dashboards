import { useState, useEffect } from 'react';
import { supabase } from './supabase';

export interface Subject {
  id: string;
  subject_code: string;
  display_name: string;
}

export function useSubjects() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSubjects() {
      // Fetch subjects from the database.
      // If RLS blocks anon, we'll fall back to hardcoded for the demo 
      // or the real data will load once authenticated.
      const { data, error } = await supabase
        .from('atlas_subjects')
        .select('id, subject_code, display_name')
        .order('subject_code', { ascending: true });

      if (error || !data || data.length === 0) {
        console.warn('[OATHIS] Failed to fetch subjects or empty, using fallbacks', error);
        setSubjects([
          { id: 'a98e7af2-7e6c-4607-b8a0-0fb05127eb56', subject_code: 'SUBJ-001', display_name: 'John Ramunas' },
          { id: '02bce308-c74c-4d96-b814-eb2a6546ed24', subject_code: 'SUBJ-002', display_name: 'Alan Ramunas' },
          { id: '981c61af-074e-45ef-b96c-9c9590f45eb6', subject_code: 'SUBJ-003', display_name: 'Joshua Badshah' }
        ]);
      } else {
        setSubjects(data);
      }
      setLoading(false);
    }
    fetchSubjects();
  }, []);

  return { subjects, loading };
}
