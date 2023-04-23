import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import UsersRepository from '../infra/typeorm/repositories/UserRepository';

class ListUserService {
  public async execute(): Promise<User[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = usersRepository.find();

    if (!users) {
      throw new AppError('Users not found.', 404);
    }

    return users;
  }
}

export default ListUserService;
