import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import FindOrderService from '@modules/orders/services/FindOrderService';

export default class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const findService = container.resolve(FindOrderService);

    const order = await findService.execute({ id });

    return response.json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { customer_id, products } = request.body;

      const createService = container.resolve(CreateOrderService);

      const order = await createService.execute({ customer_id, products });

      return response.json(order);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
