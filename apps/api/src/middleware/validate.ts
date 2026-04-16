import { Response, NextFunction, Request } from 'express';

export const schemaValidator = (req: Request, res: Response, next: NextFunction) => {
  // Demo validation, just pass through for now
  if (req.method === 'POST' && !req.body) {
    res.status(400).json({ error: 'Body required' });
    return;
  }
  next();
};
