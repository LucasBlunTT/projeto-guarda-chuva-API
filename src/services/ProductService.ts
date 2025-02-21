import { AppDataSource } from '../database/data-source';
import Product from '../entities/Product';
import Branch from '../entities/Branch';

class ProductService {
  async create(data: any, userId: number) {
    const productRepository = AppDataSource.getRepository(Product);

    const product = productRepository.create({
      ...data,
      branch: { user_id: userId } as Branch, // Relaciona o produto com a filial usando o user_id
    });

    return await productRepository.save(product);
  }

  async getAll(userId: number) {
    const productRepository = AppDataSource.getRepository(Product);

    return await productRepository.find({
      where: { branch: { user_id: userId } },
      relations: ['branch'], // Inclui a relação com a filial
    });
  }
}

export default new ProductService();
