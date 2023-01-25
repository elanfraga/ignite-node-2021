import { Router } from 'express';

import { createSpecificationController } from '../modules/cars/useCases/createSpecificationController';

const specificationsRoutes = Router();

specificationsRoutes.post('/', (request, response) => createSpecificationController.handle(request, response));

export { specificationsRoutes };
