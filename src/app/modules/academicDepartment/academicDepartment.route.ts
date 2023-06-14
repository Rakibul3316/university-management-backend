import express from 'express';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
const router = express.Router();

router.post(
  '/create',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  AcademicDepartmentControllers.createDepartment
);

router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema
  ),
  AcademicDepartmentControllers.updateDepartment
);

router.get('/:id', AcademicDepartmentControllers.getSingleDepartment);

router.delete('/:id', AcademicDepartmentControllers.deleteDepartment);

router.get('/', AcademicDepartmentControllers.getAllDepartments);

export const AcademicDepartmentRouters = router;

// 6489853cc381588da7234d6e
