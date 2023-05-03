import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { ICustomerRepository } from '../domain/repositories/ICustomersRepository';
import { IDeleteCustomer } from '../domain/models/IDeleteCustomer';
import redisCache from '@shared/cache/RedisCache';

@injectable()
class DeleteCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomerRepository,
  ) {}

  public async execute({ id }: IDeleteCustomer): Promise<void> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.', 404);
    }

    await redisCache.invalidate(`api-vendas-CUSTOMER-SHOW-${id}`);

    await this.customersRepository.delete(customer);
  }
}

export default DeleteCustomerService;
