import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ManagementDepartmentControllers } from './managementDepartment.controller';
import { ManagementDepartmentValidation } from './managementDepartment.validation';

const router = express.Router();

router.post(
  '/create',
  validateRequest(
    ManagementDepartmentValidation.createManagementDepartmentZodSchema
  ),
  ManagementDepartmentControllers.createDepartment
);

router.get('/:id', ManagementDepartmentControllers.getSingleDepartment);

router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDepartmentZodSchema
  ),
  ManagementDepartmentControllers.updateDepartment
);

router.delete('/:id', ManagementDepartmentControllers.deleteDepartment);

router.get('/', ManagementDepartmentControllers.getAllDepartments);

export const ManagementDepartmentRoutes = router;
