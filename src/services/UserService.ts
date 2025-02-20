import { AppDataSource } from '../database/data-source';
import Branch from '../entities/Branch';
import Driver from '../entities/Driver';
import User from '../entities/User';
import bcrypt from 'bcrypt';

class UserService {
  async getAll(queryParam: string | null = null) {
    const validProfiles = ['DRIVER', 'BRANCH', 'ADMIN'];
    if (queryParam && validProfiles.includes(queryParam)) {
      return await AppDataSource.getRepository(User).find({
        where: {
          status: true,
          profile: queryParam as 'DRIVER' | 'BRANCH' | 'ADMIN',
        },
        order: { id: 'ASC' },
      });
    } else {
      return await AppDataSource.getRepository(User).find({
        where: { status: true },
        order: { id: 'ASC' },
      });
    }
  }

  async getById(id: number) {
    return await AppDataSource.getRepository(User).findOne({
      where: { id, status: true },
    });
  }

  async create(data: any) {
    const { name, profile, email, password, full_address, document } = data;

    const salt = bcrypt.genSaltSync(10);
    const senhaCriptografada = await bcrypt.hash(password, salt);

    const user = new User();
    user.name = name;
    user.profile = profile;
    user.email = email;
    user.password_hash = senhaCriptografada;
    user.created_at = new Date();
    user.updated_at = new Date();

    const userCreated = await AppDataSource.getRepository(User).save(user);

    if (profile === 'DRIVER') {
      const driver = new Driver();
      driver.full_address = full_address;
      driver.document = document;
      driver.user_id = userCreated.id;
      await AppDataSource.getRepository(Driver).save(driver);
    } else if (profile === 'BRANCH') {
      const branch = new Branch();
      branch.full_address = full_address;
      branch.document = document;
      branch.user_id = userCreated.id;
      await AppDataSource.getRepository(Branch).save(branch);
    }

    return userCreated;
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

  async disable(id: number) {
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { id } });

    if (!user) {
      throw new Error('Usuario não encontrado');
    }

    user.status = !user.status;

    return await userRepository.save(user);
  }
}

export default new UserService();
