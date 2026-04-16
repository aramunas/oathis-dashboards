import { useState, useEffect } from 'react';

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
      try {
        const response = await fetch('/api/subjects');
        const result = await response.json();
        
        if (result.data && result.data.length > 0) {
          setSubjects(result.data);
        } else {
          throw new Error('No data');
        }
      } catch (error) {
        console.warn('[OATHIS] Failed to fetch subjects or empty, using fallbacks', error);
        setSubjects([
          { id: 'a98e7af2-7e6c-4607-b8a0-0fb05127eb56', subject_code: 'SUBJ-001', display_name: 'John Ramunas' },
          { id: '02bce308-c74c-4d96-b814-eb2a6546ed24', subject_code: 'SUBJ-002', display_name: 'Alan Ramunas' },
          { id: '981c61af-074e-45ef-b96c-9c9590f45eb6', subject_code: 'SUBJ-003', display_name: 'Joshua Badshah' }
        ]);
      }
      setLoading(false);
    }
    fetchSubjects();
  }, []);

  return { subjects, loading };
}
