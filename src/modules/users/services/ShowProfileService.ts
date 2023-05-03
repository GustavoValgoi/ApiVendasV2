import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IShowUser } from '../domain/models/IShowUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUser } from '../domain/models/IUser';
import redisCache from '@shared/cache/RedisCache';

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IShowUser): Promise<IUser> {

    let user = await redisCache.recover<IUser>(`api-vendas-USER-PROFILE-${user_id}`);

    if (!user) {
      
      user = await this.usersRepository.findById(user_id);
      
      if (!user) {
        throw new AppError('User not found.');
      }
      
      await redisCache.save(`api-vendas-USER-PROFILE-${user_id}`, user);
    }    
    
    return user;
  }
}

export default ShowProfileService;
