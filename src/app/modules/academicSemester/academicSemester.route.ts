import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademeicSemesterControllers } from './academicSemester.controller';
const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademeicSemesterControllers.createAcademicSemester
);

export const AcademicSemesterRoutes = router;
