import Product from '@modules/products/infra/typeorm/entities/Product';

export interface IProductPaginate {
  per_page: number;
  total: number;
  current_page: number;
  data: Product[];
}
