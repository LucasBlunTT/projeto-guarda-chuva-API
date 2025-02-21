import { Request, Response } from 'express';
import MovementService from '../services/MovementService';

export default class MovementController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { destination_branch_id, product_id, quantity } = req.body;
      const userId = req.userId as number;

      if (!destination_branch_id || !product_id || !quantity) {
        res.status(400).json({ message: 'Campos obrigatórios faltando' });
        return;
      }

      const movement = await MovementService.create({
        destination_branch_id,
        product_id,
        quantity,
      });

      res.status(201).json(movement);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Erro ao criar movimento', error: error.message });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.userId as number;
      const movements = await MovementService.getAll(userId);

      res.status(200).json(movements);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Erro ao buscar movimentos', error: error.message });
    }
  }
}