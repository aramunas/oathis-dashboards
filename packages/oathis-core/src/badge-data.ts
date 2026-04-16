export interface OathisSecurityStatus {
  classification: string;
  encryption: string;
  policies: string[];
  auditLog: 'Recording' | 'Paused' | 'Error';
  version: string;
  activeSlots: string[];
}

export const getBadgeStatus = (): OathisSecurityStatus => {
  return {
    classification: 'PHI / CONFIDENTIAL',
    encryption: 'AES-256-GCM Active',
    policies: ['PP-1', 'PP-4'],
    auditLog: 'Recording',
    version: 'Fabric v0.1 — Foundation Layer',
    activeSlots: [
      'clerkJWTVerify',
      'resolveSubject',
      'rateLimiter',
      'dataClassifier',
      'schemaValidator',
      'auditLogger'
    ]
  };
};
