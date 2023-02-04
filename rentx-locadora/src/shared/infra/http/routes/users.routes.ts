import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateUserController } from '@modules/account/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '@modules/account/useCases/updateUserAvatar/UpdateUserAvatarController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserContoller = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post('/', createUserContoller.handle);

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvatarController.handle,
);

export { usersRoutes };
