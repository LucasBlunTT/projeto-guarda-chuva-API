import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getAll();
      res.status(200).json(users);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Erro ao buscar usuarios', error: error.message });
    }
  }

  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, profile, email, password } = req.body;

      if (!name || !profile || !email || !password) {
        res.status(400).json({ message: 'Campos obrigatórios faltando' });
        return;
      }

      const savedUser = await UserService.create(req.body);
      res.status(201).json(savedUser);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Erro ao criar usuario', error: error.message });
    }
  }
}
