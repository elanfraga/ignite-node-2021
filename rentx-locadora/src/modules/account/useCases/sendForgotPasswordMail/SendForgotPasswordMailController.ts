import { Request, response, Response } from 'express';
import { container } from 'tsyringe';

import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';

class SendForgotPasswordMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForggotPasswordMailUseCase = container.resolve(SendForgotPasswordMailUseCase);

    await sendForggotPasswordMailUseCase.execute(email);
    return response.send();
  }
}

export { SendForgotPasswordMailController };
