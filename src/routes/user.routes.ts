import { Router } from 'express';
import UserController from '../controllers/UserController';
import verifyAuthentication from '../middlewares/verifyAuthentication';

const userController = new UserController();
const userRoutes = Router();

userRoutes.get('/', verifyAuthentication, userController.getAll);
userRoutes.get('/:id', verifyAuthentication, userController.getById);
userRoutes.post('/', verifyAuthentication, userController.create);

export default userRoutes;
