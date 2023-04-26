import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../domain/repositories/fakes/FakeUsersRepositories';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateSessionsService from './CreatesSessionsService';

let fakeUsersRepository: FakeUsersRepository;
let createSessions: CreateSessionsService;
let hashProvider: FakeHashProvider;

describe('CreateSession', () => {
  beforeEach(() => {
    hashProvider = new FakeHashProvider();
    fakeUsersRepository = new FakeUsersRepository();
    createSessions = new CreateSessionsService(
      fakeUsersRepository,
      hashProvider,
    );
  });

  it('Should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Gustavo',
      email: 'guss.oitenta@gmail.com',
      password: '123456',
    });

    const res = await createSessions.execute({
      email: 'guss.oitenta@gmail.com',
      password: '123456',
    });

    expect(res).toHaveProperty('token');
    expect(res.user).toEqual(user);
  });

  it('Should not be able to authenticate with non existent user', async () => {
    expect(
      createSessions.execute({
        email: 'teste@gmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with wrong password', async () => {
    await fakeUsersRepository.create({
      name: 'Gustavo',
      email: 'guss.oitenta@gmail.com',
      password: '123456',
    });

    expect(
      createSessions.execute({
        email: 'guss.oitenta@gmail.com',
        password: '987654',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
