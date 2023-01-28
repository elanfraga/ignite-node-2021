import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '../dtos/ICreateUserDTO';
import { UsersRepository } from '../repositories/implementations/UsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    name, password, email, driver_license,
  }: ICreateUserDTO): Promise<void> {
    const passwordHash = await hash(password, 8);

    const userAlredyExists = await this.usersRepository.findByEmail(email);

    if (userAlredyExists) {
      throw new Error('User already exists');
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