import { Router } from 'express';
import verifyAuthentication from '../middlewares/verifyAuthentication';
import verifyAdminOrDriver from '../middlewares/verifyAdminOrDriver';
import ProductController from '../controllers/ProductController';

const router = Router();
const productController = new ProductController();

router.post(
  '/products',
  verifyAuthentication,
  verifyAdminOrDriver,
  productController.create
);

export default router;
