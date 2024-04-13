import type { Request, Response } from 'express';

export default (req: Request, res: Response): void => {
  res.status(404).json({ error: `Url not found: ${req.baseUrl}` });
};
