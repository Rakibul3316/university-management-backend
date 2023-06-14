import express from 'express';
import { AcademicFacultyControllers } from './academicFaculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
const router = express.Router();

router.post(
  '/create',
  validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
  AcademicFacultyControllers.createFaculty
);

router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updateAcademicFacultyZodSchema),
  AcademicFacultyControllers.updateFaculty
);

router.get('/:id', AcademicFacultyControllers.getSingleFaculty);

router.delete('/:id', AcademicFacultyControllers.deleteFaculty);

router.get('/', AcademicFacultyControllers.getAllFaculties);

export const AcademicFacultyRoutes = router;
