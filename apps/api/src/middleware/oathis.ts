import { Response, NextFunction, Request } from 'express';
import { AuthObject, clerkMiddleware, requireAuth } from '@clerk/express';
import { OathisRequestContext } from '@oathis/oathis-core';
import { dataClassifier } from './classify';
import { schemaValidator } from './validate';
import { auditLogger } from './audit';
import { rateLimiter } from './rate-limit';

export interface OathisRequest extends Request, OathisRequestContext {}

export const clerkJWTVerify = [
  clerkMiddleware(),
  requireAuth()
];

export const resolveSubject = (req: any, res: Response, next: NextFunction) => {
  const auth = req.auth as AuthObject | undefined;
  const subjectId = (auth as any)?.userId || (auth as any)?.subject;
  if (!subjectId) {
    res.status(401).json({ error: 'Unauthorized: Missing user ID' });
    return;
  }
  (req as OathisRequest).subjectId = subjectId;
  next();
};

export const policyBinder = (req: Request, res: Response, next: NextFunction) => {
  console.log("[OATHIS] PP-1 slot: not yet implemented");
  next();
};

export const federationRouter = (req: Request, res: Response, next: NextFunction) => {
  console.log("[OATHIS] PP-4 slot: not yet implemented");
  next();
};

export const heartbeatVerifier = (req: Request, res: Response, next: NextFunction) => {
  console.log("[OATHIS] PP-5 slot: not yet implemented");
  next();
};

export const oathisStack = [
  ...clerkJWTVerify,
  resolveSubject,
  rateLimiter,
  dataClassifier,
  schemaValidator,
  auditLogger,
  policyBinder,
  federationRouter,
  heartbeatVerifier,
];
