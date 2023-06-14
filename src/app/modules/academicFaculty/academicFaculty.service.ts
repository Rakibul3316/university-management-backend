import { SortOrder } from 'mongoose';
import calculatePagination from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { academicFacultySearchFields } from './academicFaculty.constant';
import {
  IAcademicFaculty,
  IAcademicFacultyFilters,
} from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createFacultyToDB = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllFacultiesFromDB = async (
  filters: IAcademicFacultyFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  // Searching & filtering
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicFacultySearchFields.map(field => ({
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

  const result = await AcademicFaculty.find(whereCondition)
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

const getSingleFacultyFromDB = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findOne({ _id: id });
  return result;
};

const updateFacultyToDB = async (
  id: string,
  payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteFacultyFromDB = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
};

export const AcademicFacultyServices = {
  createFacultyToDB,
  getAllFacultiesFromDB,
  getSingleFacultyFromDB,
  updateFacultyToDB,
  deleteFacultyFromDB,
};
