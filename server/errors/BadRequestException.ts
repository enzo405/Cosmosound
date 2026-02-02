import { WebError } from "./Error";

export default class BadRequestException extends WebError {
  constructor(message: string) {
    super({
      statusMessage: message,
      statusCode: 400,
    });
    Object.setPrototypeOf(this, BadRequestException.prototype);
  }
}
