import { ICreateOrder } from '../models/ICreateOrder';
import { IOrderPaginate } from '../models/IOrderPaginate';
import { IOrder } from '../models/IOrder';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface IOrdersRepository {
  findById(id: string): Promise<IOrder | null>;
  findAll({ page, skip, take }: SearchParams): Promise<IOrderPaginate>;
  create(data: ICreateOrder): Promise<IOrder>;
}
