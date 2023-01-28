import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import { UsersRepository } from '../repositories/implementations/UsersRepository';

interface IRequestOptions {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string,
    email: string
  }
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  async execute({ email, password }: IRequestOptions):Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new Error('Email or Password incorrect');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Email or Password incorrect');
    }

    const token = sign({}, 'ceede8b535cec4194415335ea5a5b854', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}

export { AuthenticateUserUseCase };
