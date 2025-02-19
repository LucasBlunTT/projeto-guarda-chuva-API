import { NextFunction, Request, Response } from 'express';
import { TokenPayload } from '../services/AuthService';
import jwt from 'jsonwebtoken';

export default function verifyAdminOrDriver(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const params = req.params.id;

    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return res.status(500).json({ message: 'JWT secret não configurado' });
    }

    const decoded = jwt.verify(token, secret) as unknown as TokenPayload;

    if (decoded.profile == 'ADMIN') {
      next();
      return;
    }

    if (decoded.profile == 'DRIVER' && decoded.userId == Number(params)) {
      next();
      return;
    }

    return res.status(403).json({ message: 'Acesso negado, você não é ADMIN ou DONO DA INFORMAÇÃO' });
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao verificar token', error });
  }
}
