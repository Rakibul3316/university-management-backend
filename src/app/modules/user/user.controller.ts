import { Request, Response, NextFunction } from 'express';
import { UserServices } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendReponse';
import { IUser } from './user.interface';
import httpStatus from 'http-status';

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const result = await UserServices.createUserToDB(user);

    sendResponse<IUser>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User is created successfully',
      data: result,
    });
    next();
  }
);

export const UserControllers = {
  createUser,
};
