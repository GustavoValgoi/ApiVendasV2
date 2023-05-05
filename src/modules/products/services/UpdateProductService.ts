import { inject, injectable } from 'tsyringe';
import { IUpdateProduct } from '../domain/models/IUpdateProduct';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IProduct } from '../domain/models/IProduct';
import AppError from '@shared/errors/AppError';
import redisCache from '@shared/cache/RedisCache';

@injectable()
class UpdateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    id,
    name,
    price,
    quantity,
  }: IUpdateProduct): Promise<IProduct> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    const productExists = await this.productsRepository.findByName(name);

    if (productExists && productExists.id !== id) {
      throw new AppError('There is already one product with this name.');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await this.productsRepository.save(product);

    await redisCache.invalidate(`api-vendas-PRODUCT-SHOW-${id}`);

    return product;
  }
}

export default UpdateProductService;
