import { Router } from 'express';
import verifyAuthentication from '../middlewares/verifyAuthentication';
import verifyBranch from '../middlewares/verifyBranch';
import MovementController from '../controllers/MovementController';

const movementRoutes = Router();
const movementController = new MovementController();

movementRoutes.post(
  '/',
  verifyAuthentication,
  verifyBranch,
  movementController.create
);

movementRoutes.get(
  '/',
  verifyAuthentication,
  verifyBranch,
  movementController.getAll
);

export default movementRoutes;
