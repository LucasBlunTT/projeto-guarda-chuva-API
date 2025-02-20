import { Router } from 'express';
import verifyAuthentication from '../middlewares/verifyAuthentication';
import verifyAdminOrDriver from '../middlewares/verifyAdminOrDriver';
import ProductController from '../controllers/ProductController';
import verifyBranch from '../middlewares/verifyBranch';

const productRoutes = Router();
const productController = new ProductController();

productRoutes.post(
  '/',
  verifyAuthentication,
  verifyBranch,
  productController.create
);

productRoutes.get(
  '/',
  verifyAuthentication,
  verifyBranch,
  productController.getAll
);

export default productRoutes;
