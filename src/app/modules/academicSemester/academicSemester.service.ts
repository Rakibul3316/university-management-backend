import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import { academicSemesterTitleCodeMapper } from './acedemicSemester.constant';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IGenericResponse } from '../../../interfaces/common';
import calculatePagination from '../../../helpers/paginationHelpers';
import { SortOrder } from 'mongoose';

const createSemesterToDB = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code.');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllSemestersFromDB = async (
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page, skip, limit, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const sortConditioins: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditioins[sortBy] = sortOrder;
  }

  const result = await AcademicSemester.find()
    .sort(sortConditioins)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const AcademicSemesterServices = {
  createSemesterToDB,
  getAllSemestersFromDB,
};
