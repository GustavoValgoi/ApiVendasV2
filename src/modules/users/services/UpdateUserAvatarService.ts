import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';
import { IUpdateUserAvatar } from '../domain/models/IUpdateUserAvatar';
import redisCache from '@shared/cache/RedisCache';

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    avatarFilename,
  }: IUpdateUserAvatar): Promise<User> {
    const storageProvider = new DiskStorageProvider();

    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    if (user.avatar) {
      await storageProvider.deleteFile(user.avatar);
    }

    const filename = await storageProvider.saveFile(avatarFilename);

    user.avatar = filename;

    await this.usersRepository.save(user);

    await redisCache.invalidate(`api-vendas-USER-PROFILE-${user_id}`);

    return user;
  }
}

export default UpdateUserAvatarService;
