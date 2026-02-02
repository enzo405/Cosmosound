import { WebError } from "./Error";

export default class NotFoundException extends WebError {
  constructor(message: string) {
    super({
      statusMessage: message,
      statusCode: 404,
    });
    Object.setPrototypeOf(this, NotFoundException.prototype);
  }
}
