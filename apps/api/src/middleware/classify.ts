import { Response, NextFunction } from 'express';
import { OathisRequestContext } from '../types';
import { Request } from 'express';

export interface OathisRequest extends Request, OathisRequestContext {}

export const dataClassifier = (req: Request, res: Response, next: NextFunction) => {
  const oathisReq = req as OathisRequest;
  oathisReq.classification = 'PHI';
  next();
};
