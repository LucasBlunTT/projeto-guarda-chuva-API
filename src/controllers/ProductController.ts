import { Request, Response } from 'express';
import ProductService from '../services/ProductService';

export default class ProductController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { name, amount, description, url_cover } = req.body;
      const userId = req.userId as number;

      console.log(req.body);
      if (!name || !amount || !description) {
        res.status(400).json({ message: 'Campos obrigatórios faltando' });
        return;
      }

      const product = await ProductService.create(
        { name, amount, description, url_cover },
        userId
      );

      res.status(201).json(product);
    } catch (error: any) {
      res
        .status(500)
        .json({ message: 'Erro ao criar produto', error: error.message });
    }
  }
}
