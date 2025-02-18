import { Router } from 'express';
import UserController from '../controllers/UserController';

const userController = new UserController();
const userRoutes = Router();

userRoutes.post('/', userController.create);
userRoutes.get('/', userController.getAll);

export default userRoutes;
