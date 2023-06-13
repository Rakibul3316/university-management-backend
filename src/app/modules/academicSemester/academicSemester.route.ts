import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademeicSemesterControllers } from './academicSemester.controller';
const router = express.Router();

router.post(
  '/create',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademeicSemesterControllers.createAcademicSemester
);

router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademeicSemesterControllers.updateSemester
);

router.get('/:id', AcademeicSemesterControllers.getSingleSemester);

router.delete('/:id', AcademeicSemesterControllers.deleteSemester);

router.get('/', AcademeicSemesterControllers.getAllSemesters);

export const AcademicSemesterRoutes = router;
