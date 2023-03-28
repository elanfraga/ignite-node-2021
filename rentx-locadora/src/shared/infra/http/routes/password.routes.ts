import { Router } from 'express';

import { SendForgotPasswordMailController } from '@modules/account/useCases/sendForgotPasswordMail/SendForgotPasswordMailController';

const passwordRoutes = Router();

const sendforgotPasswordMailController = new SendForgotPasswordMailController();

passwordRoutes.post('/forgot', sendforgotPasswordMailController.handle);

export { passwordRoutes };
