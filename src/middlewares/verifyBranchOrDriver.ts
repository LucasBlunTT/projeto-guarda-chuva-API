import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { TokenPayload } from '../services/AuthService';

export default function verifyBranchOrDriver(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return res.status(500).json({ message: 'JWT secret não configurado' });
    }

    const decoded = jwt.verify(token, secret) as unknown as TokenPayload;
    req.userId = decoded.userId; // Adiciona o userId ao objeto req

    if (
      decoded.profile === 'BRANCH' ||
      (decoded.profile === 'DRIVER' && decoded.userId === Number(req.params.id))
    ) {
      next();
    } else {
      return res.status(403).json({
        message:
          'Acesso negado, você não é uma FILIAL ou dono destas informações',
      });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao verificar token', error });
  }
}
