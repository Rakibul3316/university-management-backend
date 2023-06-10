import { IGenericErrorMessage } from './error';

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IApiReponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  data?: T | null;
};
