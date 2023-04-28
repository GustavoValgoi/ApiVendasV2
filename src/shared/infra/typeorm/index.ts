import { DataSource } from 'typeorm';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import OrdersProducts from '@modules/orders/infra/typeorm/entities/OrderProducts';
import Product from '@modules/products/infra/typeorm/entities/Product';
import User from '@modules/users/infra/typeorm/entities/User';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

import { CreateProducts1676092066269 } from './migrations/1676092066269-CreateProducts';
import { CreateUsers1677113516383 } from './migrations/1677113516383-CreateUsers';
import { CreateUserTokens1677460287375 } from './migrations/1677460287375-CreateUserTokens';
import { CreateCustomers1678928147715 } from './migrations/1678928147715-CreateCustomers';
import { CreateOrdersOk1679018656969 } from './migrations/1679018656969-CreateOrdersOk';
import { AddCustomerIdtoOrders1679018710578 } from './migrations/1679018710578-AddCustomerIdtoOrders';
import { CreateOrdersProducts1679018843115 } from './migrations/1679018843115-CreateOrdersProducts';
import { AddOrdersIdToOrdersProducts1679019001838 } from './migrations/1679019001838-AddOrdersIdToOrdersProducts';
import { AddProductIdToOrdersProducts1679019279628 } from './migrations/1679019279628-AddProductIdToOrdersProducts';
import { AddOrderFieldtoOrders1682384988427 } from './migrations/1682384988427-AddOrderFieldtoOrders';

export const dataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 32768,
  username: 'postgres',
  password: 'postgrespw',
  database: 'api_vendas',
  entities: [User, UserToken, Customer, Order, OrdersProducts, Product],
  migrations: [
    CreateProducts1676092066269,
    CreateUsers1677113516383,
    CreateUserTokens1677460287375,
    CreateCustomers1678928147715,
    CreateOrdersOk1679018656969,
    AddCustomerIdtoOrders1679018710578,
    CreateOrdersProducts1679018843115,
    AddOrdersIdToOrdersProducts1679019001838,
    AddProductIdToOrdersProducts1679019279628,
    AddOrderFieldtoOrders1682384988427,
  ],
});
