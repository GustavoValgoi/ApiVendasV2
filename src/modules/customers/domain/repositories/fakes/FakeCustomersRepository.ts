import { Repository, getRepository } from 'typeorm';
import Customer from '../entities/Customer';
import {
  ICustomerRepository,
  SearchParams,
} from '@modules/customers/domain/repositories/ICustomersRepository';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { ICustomerPaginate } from '@modules/customers/domain/models/ICustomerPaginate';

class CustomersRepository implements ICustomerRepository {
  private ormRepository: Repository<ICustomer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
  }

  public async create({ name, email }: ICreateCustomer): Promise<ICustomer> {}

  // public async save(customer: ICustomer): Promise<ICustomer> {}

  // public async delete(customer: ICustomer): Promise<void> {}

  // public async findAll({
  //   page,
  //   skip,
  //   take,
  // }: SearchParams): Promise<ICustomerPaginate> {}

  // public async findByName(name: string): Promise<ICustomer | undefined> {}

  // public async findById(id: string): Promise<ICustomer | undefined> {}

  // public async findByEmail(email: string): Promise<ICustomer | undefined> {}
}

export default CustomersRepository;
