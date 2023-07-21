import { Response } from "express";

export enum SUCCESS_CODE {
  OK = "OK",
  CREATED = "CREATED",
  NO_CONTENT = "NO_CONTENT",
}

export enum ERROR_CODE {
  BAD_REQUEST = "BAD_REQUEST",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  NOT_FOUND = "NOT_FOUND",
  INTERNAL_ERROR = "INTERNAL_ERROR",
}

export const ResponseCode = {
  success: {
    [SUCCESS_CODE.OK]: 200,
    [SUCCESS_CODE.CREATED]: 201,
    [SUCCESS_CODE.NO_CONTENT]: 204,
  },
  error: {
    [ERROR_CODE.BAD_REQUEST]: 400,
    [ERROR_CODE.UNAUTHORIZED]: 401,
    [ERROR_CODE.FORBIDDEN]: 403,
    [ERROR_CODE.NOT_FOUND]: 404,
    [ERROR_CODE.INTERNAL_ERROR]: 500,
  },
};

export const respondError = (
  res: Response,
  errorCode: ERROR_CODE,
  message: string
): Response =>
  res.status(ResponseCode.error[errorCode]).json({
    error: {
      code: ResponseCode.error[errorCode],
      statusCode: ResponseCode.error[errorCode],
      message,
    },
  });

export const respondSuccess = (
  res: Response,
  successCode: SUCCESS_CODE,
  responsePayload: any
): Response =>
  res.status(ResponseCode.success[successCode]).json(responsePayload);
