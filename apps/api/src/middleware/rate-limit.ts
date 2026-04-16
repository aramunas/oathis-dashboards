import rateLimit from 'express-rate-limit';
import { Request } from 'express';
import { OathisRequestContext } from '../types';

export interface OathisRequest extends Request, OathisRequestContext {}

export const rateLimiter = rateLimit({
  windowMs: 1000,
  max: 5,
  keyGenerator: (req: any) => {
    const oathisReq = req as OathisRequest;
    return oathisReq.subjectId || req.ip || 'unknown';
  },
  message: 'Too many requests, please try again later.',
});
