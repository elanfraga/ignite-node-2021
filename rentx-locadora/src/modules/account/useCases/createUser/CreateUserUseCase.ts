import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@modules/account/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/account/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name, password, email, driver_license,
  }: ICreateUserDTO): Promise<void> {
    const passwordHash = await hash(password, 8);

    const userAlredyExists = await this.usersRepository.findByEmail(email);

    if (userAlredyExists) {
      throw new AppError('User already exists');
    }

    await this.usersRepository.create({
      name,
      password: passwordHash,
      email,
      driver_license,
    });
  }
}
export { CreateUserUseCase };
