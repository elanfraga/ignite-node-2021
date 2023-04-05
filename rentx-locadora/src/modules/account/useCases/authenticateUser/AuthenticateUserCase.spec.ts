import { ICreateUserDTO } from '@modules/account/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/account/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/account/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

describe('Authenticate User', () => {
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let userRepositoryInMemory: UsersRepositoryInMemory;
  let usersTokensRepositoryInMemory : UsersTokensRepositoryInMemory;
  let createUserUseCase: CreateUserUseCase;
  let dateProvider: DayjsDateProvider;

  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      userRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
    );
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '000123',
      email: 'test@example.com',
      password: 'testpassword',
      name: 'testuser',
    };
    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate an nonexistent user', async () => {
    await expect(authenticateUserUseCase.execute({
      email: 'false@email.com',
      password: '123',
    })).rejects.toEqual(new AppError('Email or Password incorrect'));
  });

  it('should not be able to authenticate with incorrect password', async () => {
    const user: ICreateUserDTO = {
      driver_license: '99999',
      email: 'user@user.com',
      password: '1234',
      name: 'User Test Error',
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorretPassword',
      }),
    ).rejects.toEqual(new AppError('Email or Password incorrect'));
  });
});
