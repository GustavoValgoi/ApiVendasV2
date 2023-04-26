import 'reflect-metadata';
import CreateUserService from './CreateUserService';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../domain/repositories/fakes/FakeUsersRepositories';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let hashProvider: FakeHashProvider;

describe('Createuser', () => {
  beforeEach(() => {
    hashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    createUser = new CreateUserService(fakeUsersRepository, hashProvider);
  });

  it('Should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Gustavo',
      email: 'guss.oitenta@gmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('Should not be able to create two users with the same email', async () => {
    await createUser.execute({
      name: 'Gustavo',
      email: 'guss.oitenta@gmail.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'Gustavo',
        email: 'guss.oitenta@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
