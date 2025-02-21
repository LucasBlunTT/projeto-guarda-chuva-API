import { AppDataSource } from '../database/data-source';
import { Movement } from '../entities/Movement';
import Product from '../entities/Product';

class MovementService {
  async create(data: any) {
    const movementRepository = AppDataSource.getRepository(Movement);
    const productRepository = AppDataSource.getRepository(Product);

    const { destination_branch_id, product_id, quantity } = data;

    // Verificar se o produto existe e obter informações do produto
    const product = await productRepository.findOne({
      where: { id: product_id },
      relations: ['branch'],
    });

    if (!product) {
      throw new Error('Produto não encontrado');
    }

    // Verificar se a quantidade solicitada é inferior ou igual ao estoque disponível
    if (quantity > product.amount) {
      throw new Error('Estoque insuficiente para essa movimentação');
    }

    // Verificar se o destination_branch_id é diferente do branch_id do produto
    if (destination_branch_id === product.branch.id) {
      throw new Error(
        'A filial de origem não pode ser a mesma que a filial de destino'
      );
    }

    // Atualizar o estoque do produto na filial de origem
    product.amount -= quantity;
    await productRepository.save(product);

    // Criar a nova movimentação com status 'PENDING'
    const movement = movementRepository.create({
      ...data,
      status: 'PENDING',
    });

    return await movementRepository.save(movement);
  }

  async getAll(userId: number) {
    const movementRepository = AppDataSource.getRepository(Movement);

    return await movementRepository.find({
      where: { destination_branch_id: userId },
      relations: ['destinationBranch', 'product'], // Inclui as relações com a filial e o produto
    });
  }
}

export default new MovementService();
