import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { ICustomerRepository } from '../domain/repositories/ICustomersRepository';
interface IRequest {
  id: string;
}
@injectable()
class DeleteCustomerService {
  constructor(
    @inject('CustomersRepository')
    private customersRepository: ICustomerRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found.', 404);
    }

    await this.customersRepository.delete(customer);
  }
}

export default DeleteCustomerService;
