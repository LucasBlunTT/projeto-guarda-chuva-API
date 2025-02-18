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

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const user = await UserService.getById(id);

      if (!user) {
        res.status(404).json({ message: 'Usuario não encontrado' });
        return;
      }

      res.status(200).json(user);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Erro ao buscar usuario', error: error.message });
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

  async update(req: Request, res: Response): Promise<void> {
    try {
      const id = parseInt(req.params.id, 10);
      const body = req.body;

      if (body.id || body.status || body.created_at || body.updated_at) {
        res
          .status(400)
          .json({
            message: 'Não é permitido atualizar as informações fornecidas',
          });
        return;
      }

      const updatedAuthor = await UserService.update(id, body);
      res.status(200).json(updatedAuthor);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Erro ao atualizar autor', error: error.message });
    }
  }
}
