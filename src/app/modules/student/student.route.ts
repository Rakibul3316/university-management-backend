import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentControllers } from './student.controller';
import { StudentValidaion } from './student.validation';
const router = express.Router();

router.get('/:id', StudentControllers.getSingleStudent);
router.get('/', StudentControllers.getAllStudents);

router.delete('/:id', StudentControllers.deleteStudent);

router.patch(
  '/:id',
  validateRequest(StudentValidaion.updateStudentZodSchema),
  StudentControllers.updateStudent
);

export const StudentRoutes = router;
