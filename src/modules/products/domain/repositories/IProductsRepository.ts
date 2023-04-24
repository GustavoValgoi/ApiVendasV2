import { IProduct } from '../models/IProduct';
import { IFindProducts } from '../models/IFindProducts';
import { ICreateProduct } from '../models/ICreateProduct';
import { IUpdateStockProduct } from '../models/IUpdateStockProduct';
import { IProductPaginate } from '../models/IProductPaginate';
import Product from '@modules/products/infra/typeorm/entities/Product';

type SearchParams = {
  page: number;
  skip: number;
  take: number;
};

export interface IProductsRepository {
  findByName(name: string): Promise<Product | null>;
  findById(id: string): Promise<Product | null>;
  findAll({ page, skip, take }: SearchParams): Promise<IProductPaginate>;
  findAllByIds(products: IFindProducts[]): Promise<Product[]>;
  create(data: ICreateProduct): Promise<Product>;
  save(product: Product): Promise<Product>;
  updateStock(products: IUpdateStockProduct[]): Promise<void>;
  remove(product: Product): Promise<void>;
}
