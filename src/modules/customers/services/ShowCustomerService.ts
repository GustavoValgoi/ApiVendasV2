import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { ICustomerRepository } from '../domain/repositories/ICustomersRepository';
import { ICustomer } from '../domain/models/ICustomer';
import { IShowCustomer } from '../domain/models/IShowCustomer';
import redisCache from '@shared/cache/RedisCache';

@injectable()
class ShowCustomerService {

  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomerRepository,
  ) {}

  public async execute({ id }: IShowCustomer): Promise<ICustomer> {

    let customer = await redisCache.recover<ICustomer>(`api-vendas-CUSTOMER-SHOW-${id}`);
    
    if (!customer) {
      
      customer = await this.customersRepository.findById(id);
      
      if (!customer) {
        throw new AppError('Customer not found.', 404);
      }

      await redisCache.save(`api-vendas-CUSTOMER-SHOW-${id}`, customer);

    }

    return customer;
  }
}

export default ShowCustomerService;
