import { SortOrder } from 'mongoose';
import calculatePagination from '../../../helpers/paginationHelpers';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { academicDepartmentSearchFields } from './academicDepartment.constant';
import {
  IAcademicDeparmentFilters,
  IAcademicDepartment,
} from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createDepartmentToDB = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment> => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty'
  );
  return result;
};

const getAllDepartmentsFromDB = async (
  filters: IAcademicDeparmentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  // Searching & filtering
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: academicDepartmentSearchFields.map(field => ({
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

  const result = await AcademicDepartment.find(whereCondition)
    .sort(sortConditioins)
    .skip(skip)
    .limit(limit)
    .populate('academicDepartment');

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

const getSingleDepartmentFromDB = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findOne({ _id: id }).populate(
    'academicFaculty'
  );
  return result;
};

const updateDepartmentToDB = async (
  id: string,
  payload: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  ).populate('academicFaculty');
  return result;
};

const deleteDepartmentFromDB = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete(id).populate(
    'academicDepartment'
  );
  return result;
};

export const AcademicDepartmentServices = {
  createDepartmentToDB,
  getAllDepartmentsFromDB,
  getSingleDepartmentFromDB,
  updateDepartmentToDB,
  deleteDepartmentFromDB,
};
