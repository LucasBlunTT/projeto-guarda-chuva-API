import { AppDataSource } from '../database/data-source';
import User from '../entities/User';
import bcrypt from 'bcrypt';

class UserService {
  async getAll() {
    return await AppDataSource.getRepository(User).find({
      where: { status: true },
    });
  }

  async getById(id: number) {
    return await AppDataSource.getRepository(User).findOne({
      where: { id, status: true },
    });
  }

  async create(data: any) {
    const { name, profile, email, password } = data;

    const salt = bcrypt.genSaltSync(10);
    const senhaCriptografada = await bcrypt.hash(password, salt);

    const user = new User();
    user.name = name;
    user.profile = profile;
    user.email = email;
    user.password_hash = senhaCriptografada;
    user.created_at = new Date();
    user.updated_at = new Date();

    return await AppDataSource.getRepository(User).save(user);
  }

  async update(id: number, body: any) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error('Usuario não encontrado');
    }

    Object.assign(user, body);
    user.updated_at = new Date();

    return await userRepository.save(user);
  }
}

export default new UserService();
