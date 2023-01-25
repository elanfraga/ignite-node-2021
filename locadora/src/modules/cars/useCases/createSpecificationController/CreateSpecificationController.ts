import { Request, Response } from 'express';

import { CreateSpecificationUseCase } from './CreateStecificationUseCase';

class CreateSpecificationController {
  constructor(private createSpecificationUseCase: CreateSpecificationUseCase) {

  }

  handle(request: Request, response:Response): Response {
    const { name, description } = request.body;

    this.createSpecificationUseCase.executte({ description, name });

    return response.status(201).send();
  }
}

export { CreateSpecificationController };
