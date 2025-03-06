import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { TokenPayload } from '../services/AuthService';

export default async function verifyDriver(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token);

    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido' });
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return res.status(500).json({ message: 'JWT secret não configurado' });
    }

    const decoded = jwt.verify(token, secret) as unknown as TokenPayload;
    req.userId = decoded.userId;

    if (decoded.profile !== 'DRIVER') {
      return res.status(403).json({
        message:
          'Acesso negado, você não é um MOTORISTA. Somente motoristas podem realizar esta ação. Seu perfil é: ' +
          decoded.profile,
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao verificar token', error });
  }
}
