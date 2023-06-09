import express from 'express';
import { UserControllers } from './user.controller';
import { UserValidataion } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();

router.post(
  '/create-user',
  validateRequest(UserValidataion.createUserZodSchema),
  UserControllers.createUser
);

export const UserRoutes = router;
