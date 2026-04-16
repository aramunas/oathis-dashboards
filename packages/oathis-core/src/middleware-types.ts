export interface OathisRequestContext {
  subjectId?: string;
  classification?: string;
  validationErrors?: any[];
  auditContext?: {
    action: string;
    resource: string;
    details: any;
  };
}
