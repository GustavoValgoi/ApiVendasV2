import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { ICustomerRepository } from '../domain/repositories/ICustomersRepository';
import { ICustomer } from '../domain/models/ICustomer';
import { IUpdateCustomer } from '../domain/models/IUpdateCustomer';
@injectable()
class UpdateCustomerService {

  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomerRepository,
  ) {}

  public async execute({ id, name, email }: IUpdateCustomer): Promise<ICustomer> {

    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.', 404);
    }

    const customerExists = await this.customersRepository.findByEmail(email);

    if (customerExists && email !== customer.email) {
      throw new AppError('There is already one customer with this email.', 401);
    }

    customer.name = name;
    customer.email = email;

    await this.customersRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
