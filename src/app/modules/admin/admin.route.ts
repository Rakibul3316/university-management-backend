import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminControllers } from './admin.controller';
import { AdminValidation } from './admin.validation';
const router = express.Router();

router.get('/:id', AdminControllers.getSingleAdmin);
router.get('/', AdminControllers.getAllAdmins);

router.delete('/:id', AdminControllers.deleteAdmin);

router.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdmin),
  AdminControllers.updateAdmin
);

export const AdminRoutes = router;
