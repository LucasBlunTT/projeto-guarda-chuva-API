import { Router } from 'express';
import verifyAuthentication from '../middlewares/verifyAuthentication';
import verifyBranchOrDriver from '../middlewares/verifyBranchOrDriver';
import MovementController from '../controllers/MovementController';
import verifyDriver from '../middlewares/verifyDriver';

const movementRoutes = Router();
const movementController = new MovementController();

movementRoutes.post(
  '/',
  verifyAuthentication,
  verifyBranchOrDriver,
  movementController.create
);

movementRoutes.get(
  '/',
  verifyAuthentication,
  verifyBranchOrDriver,
  movementController.getAll
);

movementRoutes.patch(
  '/:id/start',
  verifyAuthentication,
  verifyDriver,
  movementController.updateStart
);

movementRoutes.patch(
  '/:id/end',
  verifyAuthentication,
  verifyDriver,
  movementController.updateEnd
);
export default movementRoutes;
