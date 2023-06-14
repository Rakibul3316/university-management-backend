import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import { AcademicFacultyServices } from './academicFaculty.service';
import sendResponse from '../../../shared/sendReponse';
import { IAcademicFaculty } from './academicFaculty.interface';
import pick from '../../../shared/pick';
import { academicFacultyFilterableFields } from './academicFaculty.constant';
import { paginationFields } from '../../../constants/pagination';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...facultyData } = req.body;

  const result = await AcademicFacultyServices.createFacultyToDB(facultyData);

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic faculty is created successfully',
    meta: null,
    data: result,
  });
});

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicFacultyFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicFacultyServices.getAllFacultiesFromDB(
    filters,
    paginationOptions
  );

  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrived faculty data',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicFacultyServices.getSingleFacultyFromDB(id);

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Find specific faculty',
    meta: null,
    data: result,
  });
});

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await AcademicFacultyServices.updateFacultyToDB(
    id,
    updateData
  );

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty updated successfully',
    meta: null,
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicFacultyServices.deleteFacultyFromDB(id);

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty deleted successfully',
    meta: null,
    data: result,
  });
});

export const AcademicFacultyControllers = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
