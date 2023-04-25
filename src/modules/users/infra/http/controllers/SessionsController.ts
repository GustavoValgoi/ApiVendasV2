import { Request, Response } from 'express';
import { instanceToInstance } from 'class-transformer';
import CreateSessionsService from '../../../services/CreatesSessionsService';
import { container } from 'tsyringe';

class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const createSession = container.resolve(CreateSessionsService);

    const session = await createSession.execute({ email, password });

    return res.status(200).json(instanceToInstance(session));
  }
}

export default SessionsController;
