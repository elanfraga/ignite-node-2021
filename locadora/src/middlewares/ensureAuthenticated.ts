import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { AppError } from '../erros/AppError';
import { UsersRepository } from '../modules/account/repositories/implementations/UsersRepository';

interface IPayload {
  sub: string;
}
export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(token, 'ceede8b535cec4194415335ea5a5b854') as IPayload;

    const userRepository = new UsersRepository();
    const user = userRepository.findById(user_id);
    if (!user) {
      throw new AppError('User does not exist', 401);
    }

    next();
  } catch (error) {
    throw new AppError('Invalid token', 401);
  }
}
