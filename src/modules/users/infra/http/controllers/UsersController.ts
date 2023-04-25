import { Request, Response } from 'express';
import CreateUserService from '../../../services/CreateUserService';
import ListUserService from '../../../services/ListUserService';
import { instanceToInstance } from 'class-transformer';
import { container } from 'tsyringe';

class UsersController {
  public async index(req: Request, res: Response): Promise<Response> {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 15;

    const listUser = container.resolve(ListUserService);

    const users = await listUser.execute({ page, limit });

    return res.status(200).json(instanceToInstance(users));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;
    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({ name, email, password });

    return res.status(201).json(instanceToInstance(user));
  }
}

export default UsersController;
