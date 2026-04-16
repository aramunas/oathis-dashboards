import { Response, NextFunction, Request } from 'express';
import { OathisRequestContext } from '@oathis/oathis-core';

export interface OathisRequest extends Request, OathisRequestContext {}

export const auditLogger = (req: Request, res: Response, next: NextFunction) => {
  const oathisReq = req as OathisRequest;
  if (oathisReq.subjectId) {
    console.log(`[OATHIS] Audit Log: Subject ${oathisReq.subjectId} accessed ${req.method} ${req.path}`);
  }
  next();
};
