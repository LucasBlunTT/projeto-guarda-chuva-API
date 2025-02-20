import { AppDataSource } from '../database/data-source';
import { Product } from '../entities/Product';
import Branch from '../entities/Branch';

class ProductService {
  async create(data: any, userId: number) {
    const branchRepository = AppDataSource.getRepository(Branch);
    const productRepository = AppDataSource.getRepository(Product);

    const currentBranch = await branchRepository.findOne({
      where: { user_id: userId },
    });

    if (!currentBranch) {
      throw new Error('Filial não encontrada para o usuário');
    }

    const product = productRepository.create({
      branch: currentBranch,
      ...data,
    });

    return await productRepository.save(product);
  }
}

export default new ProductService();
