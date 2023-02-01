import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSpecificationUseCase } from './CreateStecificationUseCase';

class CreateSpecificationController {
  async handle(request: Request, response:Response): Promise<Response> {
    const { name, description } = request.body;

    const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase);

    await createSpecificationUseCase.executte({ description, name });

    return response.status(201).send();
  }
}

export { CreateSpecificationController };
