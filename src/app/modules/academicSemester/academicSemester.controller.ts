import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterServices } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendReponse';
import { IAcademicSemester } from './academicSemester.interface';
import httpStatus from 'http-status';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...semesterData } = req.body;
    const result = await AcademicSemesterServices.createSemesterToDB(
      semesterData
    );

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester is created successfully',
      data: result,
    });
    next();
  }
);

export const AcademeicSemesterControllers = {
  createAcademicSemester,
};
