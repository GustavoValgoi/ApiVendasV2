import { Repository, getRepository } from 'typeorm';
import Customer from '../entities/Customer';
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';

class CustomersRepository implements ICustomerRepository {
  private ormRepository: Repository<ICustomer>;

  constructor() {
    this.ormRepository = getRepository(Customer);
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
    await this.ormRepository.delete(customer);
  }

  public async findAll(): Promise<ICustomer[] | undefined> {
    const customers = await this.ormRepository.find();
    return customers;
  }

  public async findByName(name: string): Promise<ICustomer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return customer;
  }

  public async findById(id: string): Promise<ICustomer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return customer;
  }

  public async findByEmail(email: string): Promise<ICustomer | undefined> {
    const customer = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return customer;
  }
}

export default CustomersRepository;
