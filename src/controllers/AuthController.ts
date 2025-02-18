import { Request, Response } from 'express';
import AuthService from '../services/AuthService';

class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ message: 'Campos obrigatórios faltando' });
        return;
      }

      const result = await AuthService.login(email, password);
      res.status(200).json(result);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Erro ao fazer login', error: error.message });
    }
  }
}

export default AuthController;
