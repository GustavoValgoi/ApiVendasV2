import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { IShowOrder } from '../domain/models/IShowOrder';
import { IOrdersRepository } from '../domain/repositories/IOrdersRepository';
import { IOrder } from '../domain/models/IOrder';
import redisCache from '@shared/cache/RedisCache';

@injectable()
class ShowOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({ id }: IShowOrder): Promise<IOrder> {
    
    let order = await redisCache.recover<IOrder>(`api-vendas-ORDER-SHOW-${id}`);
    
    if (!order) {
      order = await this.ordersRepository.findById(id);

      if (!order) {
        throw new AppError('Order not found.');
      }

      await redisCache.save(`api-vendas-ORDER-SHOW-${id}`, order);
    }

    return order;
  }
}

export default ShowOrderService;
