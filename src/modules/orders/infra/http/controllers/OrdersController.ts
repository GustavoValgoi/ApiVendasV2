import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateOrderService from '../../../services/CreateOrderService';
import ShowOrderService from '../../../services/ShowOrderService';
import ListOrderService from '@modules/orders/services/ListOrderService';

class OrdersController {

  public async index(req: Request, res: Response): Promise<Response> {
    const page = req.query.page ? Number(req.query.page) : 1;
    const limit = req.query.limit ? Number(req.query.limit) : 15;
    const listOrders = container.resolve(ListOrderService);

    const orders = await listOrders.execute({ page, limit });

    return res.status(200).json(orders);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showOrder = container.resolve(ShowOrderService);

    const order = await showOrder.execute({ id });

    return res.status(200).json(order);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { customer_id, products } = req.body;

    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({ customer_id, products });

    return res.status(201).json(order);
  }
}

export default OrdersController;
