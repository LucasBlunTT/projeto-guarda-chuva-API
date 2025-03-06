import { AppDataSource } from '../database/data-source';
import { Movement } from '../entities/Movement';
import Product from '../entities/Product';
import Branch from '../entities/Branch';
import User from '../entities/User';

class MovementService {
  async create(data: any) {
    const movementRepository = AppDataSource.getRepository(Movement);
    const productRepository = AppDataSource.getRepository(Product);
    const branchRepository = AppDataSource.getRepository(Branch);

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

    // Obter a filial de destino
    const branch = await branchRepository.findOne({
      where: { id: destination_branch_id },
    });

    if (!branch) {
      throw new Error('Filial de destino não encontrada');
    }

    // Criar a nova movimentação com status 'PENDING'
    const movement = movementRepository.create({
      ...data,
      status: 'PENDING',
      branch: branch,
      product: product,
    });

    return await movementRepository.save(movement);
  }

  async getAll() {
    const movementRepository = AppDataSource.getRepository(Movement);

    return await movementRepository.find({
      relations: ['branch', 'product', 'driver'], // Inclui as relações com a filial, produto e motorista
    });
  }

  async updateStart(id: number, userId: number) {
    const movementRepository = AppDataSource.getRepository(Movement);
    const userRepository = AppDataSource.getRepository(User);

    const movement = await movementRepository.findOne({
      where: { id: id },
      relations: ['product'],
    });

    if (!movement) {
      throw new Error('Movimentação não encontrada');
    }

    if (movement.status == 'IN_PROGRESS') {
      throw new Error('Movimentação já foi iniciada');
    }

    if (movement.status == 'FINISHED') {
      throw new Error('Movimentação já foi encerrada');
    }

    const driver = await userRepository.findOne({ where: { id: userId } });

    if (!driver) {
      throw new Error('Motorista não encontrado');
    }

    movement.status = 'IN_PROGRESS';
    movement.driver = driver;

    return await movementRepository.save(movement);
  }

  async updateEnd(id: number, userId: number) {
    const movementRepository = AppDataSource.getRepository(Movement);

    const movement = await movementRepository.findOne({
      where: { id: id },
      relations: ['product', 'driver'],
    });

    if (!movement) {
      throw new Error('Movimentação não encontrada');
    }

    if (movement.status == 'FINISHED') {
      throw new Error('Movimentação ja foi encerrada');
    }

    if (userId !== movement.driver.id) {
      throw new Error('Motorista não autorizado para encerrar a movimentação, pois não é o mesmo que iniciou');
    }

    movement.status = 'FINISHED';

    return await movementRepository.save(movement);
  }
}

export default new MovementService();
