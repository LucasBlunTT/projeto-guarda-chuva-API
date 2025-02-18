import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { TokenPayload } from '../services/AuthService';

export default function verifyAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: 'JWT secret is not defined' });
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    ) as unknown as TokenPayload;
    if (decoded.profile !== 'ADMIN') {
      return res
        .status(401)
        .json({ message: 'Acesso não autorizado, você não é um ADMIN' });
    }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token Invalido' });
  }
}
