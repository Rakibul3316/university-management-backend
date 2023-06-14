import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendReponse';
import { IAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartmentServices } from './academicDepartment.service';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { academicDepartmentFilterableFields } from './academicDepartment.constant';

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...departmentData } = req.body;

  const result = await AcademicDepartmentServices.createDepartmentToDB(
    departmentData
  );

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic department is created successfully',
    meta: null,
    data: result,
  });
});

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicDepartmentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicDepartmentServices.getAllDepartmentsFromDB(
    filters,
    paginationOptions
  );

  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Retrived Department data',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicDepartmentServices.getSingleDepartmentFromDB(id);

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Find specific department',
    meta: null,
    data: result,
  });
});

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;

  const result = await AcademicDepartmentServices.updateDepartmentToDB(
    id,
    updateData
  );

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department updated successfully',
    meta: null,
    data: result,
  });
});

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicDepartmentServices.deleteDepartmentFromDB(id);

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department deleted successfully',
    meta: null,
    data: result,
  });
});

export const AcademicDepartmentControllers = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
