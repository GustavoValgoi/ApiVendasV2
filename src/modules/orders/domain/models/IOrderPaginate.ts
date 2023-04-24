import Order from '@modules/orders/infra/typeorm/entities/Order';

export interface IOrderPaginate {
  per_page: number;
  total: number;
  current_page: number;
  data: Order[];
}
