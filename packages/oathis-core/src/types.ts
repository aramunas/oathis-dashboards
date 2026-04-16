export type DataClassification = 'PHI' | 'PII' | 'PUBLIC' | 'INTERNAL' | 'CONFIDENTIAL';

export interface AuditEntry {
  id: string;
  actor_id: string;
  action: string;
  resource: string;
  details: Record<string, any>;
  timestamp: string;
}
