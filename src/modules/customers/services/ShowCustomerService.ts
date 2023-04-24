import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { ICustomerRepository } from '../domain/repositories/ICustomersRepository';
import { ICustomer } from '../domain/models/ICustomer';
import { IShowCustomer } from '../domain/models/IShowCustomer';

@injectable()
class ShowCustomerService {

  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomerRepository,
  ) {}

  public async execute({ id }: IShowCustomer): Promise<ICustomer> {

    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.', 404);
    }

    return customer;
  }
}

export default ShowCustomerService;
