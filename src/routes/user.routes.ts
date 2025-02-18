import { Router } from 'express';
import UserController from '../controllers/UserController';

const userController = new UserController();
const userRoutes = Router();

userRoutes.get('/', userController.getAll);
userRoutes.get('/:id', userController.getById);
userRoutes.post('/', userController.create);


export default userRoutes;
