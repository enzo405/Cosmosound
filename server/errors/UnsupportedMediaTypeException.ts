import { WebError } from "./Error";

export default class UnsupportedMediaTypeException extends WebError {
  constructor(message: string) {
    super({
      statusMessage: message,
      statusCode: 415,
    });
    Object.setPrototypeOf(this, UnsupportedMediaTypeException.prototype);
  }
}
