import { ICreateUserDTO } from '@modules/account/dtos/ICreateUserDTO';
import { User } from '@modules/account/entities/User';

import { IUsersRepository } from '../IUsersRepository';

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({
    driver_license, email, password, name,
  }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      driver_license,
      email,
      password,
      name,
    });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    return this.users.find((user) => user.email === email) as User;
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id) as User;
  }
}

export { UsersRepositoryInMemory };
