import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import {
  academicSemesterSearchFields,
  academicSemesterTitleCodeMapper,
} from './acedemicSemester.constant';
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
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  // Searching & filtering
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filterData).length) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // Pagination & Sorting
  const { page, skip, limit, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const sortConditioins: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditioins[sortBy] = sortOrder;
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicSemester.find(whereCondition)
    .sort(sortConditioins)
    .skip(skip)
    .limit(limit);

  // const total = await AcademicSemester.countDocuments();
  const total = result.length;

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSemesterFromDB = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findOne({ _id: id });
  return result;
};

const updateSemesterToDB = async (
  id: string,
  payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester | null> => {
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid semester code.');
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteSemesterFromDB = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findByIdAndDelete(id);
  return result;
};

export const AcademicSemesterServices = {
  createSemesterToDB,
  getAllSemestersFromDB,
  getSingleSemesterFromDB,
  updateSemesterToDB,
  deleteSemesterFromDB,
};
