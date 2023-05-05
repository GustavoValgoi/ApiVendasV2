import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IShowProduct } from '../domain/models/IShowProduct';
import { IProduct } from '../domain/models/IProduct';
import AppError from '@shared/errors/AppError';
import redisCache from '@shared/cache/RedisCache';

@injectable()
class ShowProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ id }: IShowProduct): Promise<IProduct> {
    let product = await redisCache.recover<IProduct>(`api-vendas-PRODUCT-SHOW-${id}`);
    
    if (!product) {
      product = await this.productsRepository.findById(id);

      if (!product) {
        throw new AppError('Product not found.');
      }

      await redisCache.save(`api-vendas-PRODUCT-SHOW-${id}`, product);
    }

    return product;
  }
}

export default ShowProductService;
