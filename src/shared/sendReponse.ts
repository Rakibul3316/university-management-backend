import { Response } from 'express';
import { IApiReponse } from '../interfaces/common';

const sendResponse = <T>(res: Response, data: IApiReponse<T>) => {
  const responseData: IApiReponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    data: data.data || null,
  };

  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
