import { ICreateUserDTO } from '@modules/account/dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '@modules/account/repositories/in-memory/UsersRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

describe('Authenticate User', () => {
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let userRepositoryInMemory: UsersRepositoryInMemory;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    userRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory);
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
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'false@email.com',
        password: '123',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with incorrect password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '99999',
        email: 'user@user.com',
        password: '1234',
        name: 'User Test Error',
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorretPassword',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
