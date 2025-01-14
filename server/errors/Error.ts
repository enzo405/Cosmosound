export interface ErrorParams {
  statusCode: HTTPStatusCode;
  statusMessage: string;
  error?: Error;
}

export class WebError extends Error {
  statusCode: HTTPStatusCode = HTTPStatusCode.InternalServerError;
  statusMessage: string = "Something went wrong.";

  constructor(errorParams: ErrorParams) {
    super(errorParams.statusMessage);
    this.statusCode = errorParams.statusCode;
    this.statusMessage = errorParams.statusMessage;
    this.stack = errorParams.error?.stack;
    this.cause = errorParams.error;
    this.name = this.constructor.name;
    this.message = errorParams?.error?.message ?? errorParams.statusMessage;
  }
}

export enum HTTPStatusCode {
  Ok = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,
  PartialContent = 206,
  MultipleChoices = 300,
  MovedPermanently = 301,
  Found = 302,
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  RequestTimeout = 408,
  Conflict = 409,
  Gone = 410,
  UnsupportedMediaType = 415,
  UnprocessableEntity = 422,
  TooManyRequests = 429,
  InternalServerError = 500,
  NotImplemented = 501,
  BadGateway = 502,
  ServiceUnavailable = 503,
  GatewayTiemout = 504,
}
