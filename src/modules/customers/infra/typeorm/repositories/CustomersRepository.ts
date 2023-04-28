import { Repository } from 'typeorm';
import Customer from '../entities/Customer';
import {
  ICustomerRepository,
  SearchParams,
} from '@modules/customers/domain/repositories/ICustomersRepository';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { ICustomerPaginate } from '@modules/customers/domain/models/ICustomerPaginate';
import { dataSource } from '@shared/infra/typeorm';

class CustomersRepository implements ICustomerRepository {
  private ormRepository: Repository<ICustomer>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Customer);
  }

  public async create({ name, email }: ICreateCustomer): Promise<ICustomer> {
    const customer = this.ormRepository.create({ name, email });
    await this.ormRepository.save(customer);
    return customer;
  }

  public async save(customer: ICustomer): Promise<ICustomer> {
    await this.ormRepository.save(customer);
    return customer;
  }

  public async delete(customer: ICustomer): Promise<void> {
    await this.ormRepository.remove(customer);
  }

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<ICustomerPaginate> {
    const [customers, count] = await this.ormRepository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount();

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: customers,
    };

    return result;
  }

  public async findByName(name: string): Promise<ICustomer | null> {
    const customer = await this.ormRepository.findOneBy({
      name,
    });

    return customer;
  }

  public async findById(id: string): Promise<ICustomer | null> {
    const customer = await this.ormRepository.findOneBy({
      id,
    });

    return customer;
  }

  public async findByEmail(email: string): Promise<ICustomer | null> {
    const customer = await this.ormRepository.findOneBy({
      email,
    });

    return customer;
  }
}

export default CustomersRepository;
