import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { AcademicSemesterServices } from './academicSemester.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendReponse';
import { IAcademicSemester } from './academicSemester.interface';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';

const createAcademicSemester = catchAsync(
  async (req: Request, res: Response) => {
    const { ...semesterData } = req.body;
    const result = await AcademicSemesterServices.createSemesterToDB(
      semesterData
    );

    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic semester is created successfully',
      meta: null,
      data: result,
    });
  }
);

const getAllSemesters = catchAsync(async (req: Request, res: Response) => {
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicSemesterServices.getAllSemestersFromDB(
    paginationOptions
  );

  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrived semester data',
    meta: result.meta,
    data: result.data,
  });
});

export const AcademeicSemesterControllers = {
  createAcademicSemester,
  getAllSemesters,
};
