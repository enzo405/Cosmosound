import { WebError } from "./Error";

export default class ServerException extends WebError {
  constructor(message: string, e?: Error | unknown) {
    super({
      statusMessage: message,
      statusCode: 500,
      error: e instanceof Error ? e : new Error(message),
    });
    Object.setPrototypeOf(this, ServerException.prototype);
  }
}
