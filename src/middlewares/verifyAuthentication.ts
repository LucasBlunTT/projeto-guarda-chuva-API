import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { TokenPayload } from '../services/AuthService';

export default function verifyAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'JWT secret is not defined' });
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as unknown as TokenPayload;

    console.log(decoded);

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token Invalido' });
  }
}
