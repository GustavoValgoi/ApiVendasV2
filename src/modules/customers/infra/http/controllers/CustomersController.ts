import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ShowCustomerService from '../../../services/ShowCustomerService';
import ListCustomerService from '../../../services/ListCustomerService';
import DeleteCustomerService from '../../../services/DeleteCustomerService';
import UpdateCustomerService from '../../../services/UpdateCustomerService';
import CreateCustomerService from '../../../services/CreateCustomerService';

class CustomersController {
  public async index(req: Request, res: Response): Promise<Response> {

    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 15;

    const listCustomers = container.resolve(ListCustomerService);

    const customers = await listCustomers.execute({ page, limit });

    return res.status(200).json(customers);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showCustomer = container.resolve(ShowCustomerService);

    const customer = await showCustomer.execute({ id });

    return res.status(200).json(customer);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;

    const createCustomer = container.resolve(CreateCustomerService);

    const customer = await createCustomer.execute({ name, email });

    return res.status(201).json(customer);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { name, email } = req.body;
    const { id } = req.params;

    const updateCustomer = container.resolve(UpdateCustomerService);

    const customer = await updateCustomer.execute({ id, name, email });

    return res.status(200).json(customer);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const deleteCustomer = container.resolve(DeleteCustomerService);

    await deleteCustomer.execute({ id });

    return res.status(200).json({ message: 'Customer deleted with success.' });
  }
}

export default CustomersController;
