import AppError from '@shared/errors/AppError';
import { ICustomerRepository } from '../domain/repositories/ICustomersRepository';
import { injectable, inject } from 'tsyringe';
import { ICustomer } from '../domain/models/ICustomer';

@injectable()
class ListCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomerRepository,
  ) {}

  public async execute(): Promise<ICustomer[] | undefined> {
    const customers = await this.customersRepository.findAll();

    if (!customers) {
      throw new AppError('Customers not found.', 404);
    }

    return customers;
  }
}

export default ListCustomerService;
