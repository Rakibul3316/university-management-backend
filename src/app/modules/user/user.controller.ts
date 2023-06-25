import { Request, Response } from 'express';
import { UserServices } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendReponse';
import { IUser } from './user.interface';
import httpStatus from 'http-status';

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...userData } = req.body;
  const result = await UserServices.createStudentToDB(student, userData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    meta: null,
    message: 'Student created successfully!',
    data: result,
  });
});

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { faculty, ...userData } = req.body;
  const result = await UserServices.createFacultyToDB(faculty, userData);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty created successfully!',
    meta: null,
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  createFaculty,
};
