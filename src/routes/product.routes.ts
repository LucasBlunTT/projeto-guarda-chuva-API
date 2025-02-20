import { Router } from 'express';
import verifyAuthentication from '../middlewares/verifyAuthentication';
import verifyAdminOrDriver from '../middlewares/verifyAdminOrDriver';
import ProductController from '../controllers/ProductController';

const productRoutes = Router();
const productController = new ProductController();

productRoutes.post(
  '/',
  verifyAuthentication,
  verifyAdminOrDriver,
  productController.create
);

export default productRoutes;
