import { Request, Response } from 'express';
import ResetPasswordService from '../../../services/ResetPasswordService';
import { container } from 'tsyringe';

class ResetPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { password, token } = req.body;
    const resetPassword = container.resolve(ResetPasswordService);

    await resetPassword.execute({ password, token });

    return res.status(200).json();
  }
}

export default ResetPasswordController;
