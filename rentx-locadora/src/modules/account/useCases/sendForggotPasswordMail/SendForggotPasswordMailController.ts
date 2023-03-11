import { Request, response, Response } from 'express';
import { container } from 'tsyringe';

import { SendForggotPasswordMailUseCase } from './SendForggotPasswordMailUseCase';

class SendForggotPasswordMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForggotPasswordMailUseCase = container.resolve(SendForggotPasswordMailUseCase);

    await sendForggotPasswordMailUseCase.execute(email);
    return response.send();
  }
}

export { SendForggotPasswordMailController };
