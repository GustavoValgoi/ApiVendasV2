import { v4 as uuidv4 } from 'uuid';
import { Repository, getRepository } from 'typeorm';
import {
  ICustomerRepository,
  SearchParams,
} from '@modules/customers/domain/repositories/ICustomersRepository';
import { ICreateCustomer } from '@modules/customers/domain/models/ICreateCustomer';
import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { ICustomerPaginate } from '@modules/customers/domain/models/ICustomerPaginate';
import Customer from '@modules/customers/infra/typeorm/entities/Customer';

class FakeCustomersRepository implements ICustomerRepository {
  private customers: Customer[] = [];

  public async create({ name, email }: ICreateCustomer): Promise<ICustomer> {
    const customer = new Customer();

    customer.id = uuidv4();
    customer.name = name;
    customer.email = email;

    this.customers.push(customer);

    return customer;
  }

  public async save(customer: ICustomer): Promise<ICustomer> {
    const findIndex = this.customers.findIndex(findCustomer => {
      findCustomer.id === customer.id;
    });

    this.customers[findIndex] = customer;

    return customer;
  }

  public async delete(customer: ICustomer): Promise<void> {}

  public async findAll({
    page,
    skip,
    take,
  }: SearchParams): Promise<ICustomerPaginate> {
    return undefined;
  }

  public async findByName(name: string): Promise<ICustomer | undefined> {
    const customer = this.customers.find(customer => customer.name === name);
    return customer;
  }

  public async findById(id: string): Promise<ICustomer | undefined> {
    const customer = this.customers.find(customer => customer.id === id);
    return customer;
  }

  public async findByEmail(email: string): Promise<ICustomer | undefined> {
    const customer = this.customers.find(customer => customer.email === email);
    return customer;
  }
}

export default FakeCustomersRepository;
