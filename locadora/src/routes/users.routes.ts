import { Router } from 'express';

import { CreateUserController } from '../modules/account/useCases/CreateUserController';

const usersRoutes = Router();

const createUserContoller = new CreateUserController();

usersRoutes.post('/', createUserContoller.handle);

export { usersRoutes };
