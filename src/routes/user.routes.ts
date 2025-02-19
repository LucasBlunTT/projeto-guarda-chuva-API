import { Router } from 'express';
import UserController from '../controllers/UserController';
import verifyAuthentication from '../middlewares/verifyAuthentication';
import verifyAdminOrDriver from '../middlewares/verifyAdminOrDriver';

const userController = new UserController();
const userRoutes = Router();

userRoutes.get('/', verifyAuthentication, verifyAdminOrDriver, userController.getAll);
userRoutes.get('/:id', verifyAuthentication, verifyAdminOrDriver, userController.getById);
userRoutes.post('/', verifyAuthentication, verifyAdminOrDriver, userController.create);
userRoutes.put('/:id', verifyAuthentication, verifyAdminOrDriver, userController.update);

export default userRoutes;
