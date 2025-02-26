import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { TokenPayload } from '../services/AuthService';
import { AppDataSource } from '../database/data-source';
import { Movement } from '../entities/Movement';

export default async function verifyDriver(
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
    req.userId = decoded.userId;

    if (decoded.profile !== 'DRIVER') {
      return res.status(403).json({
        message:
          'Acesso negado, você não é um MOTORISTA. Somente motoristas podem realizar esta ação. Seu perfil é: ' +
          decoded.profile,
      });
    }

    const movementId = Number(req.params.id);
    const movementRepository = AppDataSource.getRepository(Movement);
    const movement = await movementRepository.findOne({
      where: { id: movementId },
      relations: ['driver'], // Adiciona a relação com o motorista
    });

    if (!movement) {
      return res.status(404).json({ message: 'Movimentação não encontrada' });
    }

    if (movement.driver?.id !== decoded.userId) {
      return res.status(403).json({
        message:
          'Acesso negado, você não é o MOTORISTA que iniciou esta movimentação',
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao verificar token', error });
  }
}
