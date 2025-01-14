import { WebError } from "./Error";

/**
 * 401 indicates that the resource can not be provided
 * but the server is REQUESTING that the client log in through HTTP Authentication and has sent reply headers to initiate the process.
 * Possibly there are authorizations that will permit access to the resource, possibly there are not.
 */
export default class UnauthorizedException extends WebError {
  constructor(message: string) {
    super({
      statusMessage: message,
      statusCode: 401,
    });
    Object.setPrototypeOf(this, UnauthorizedException.prototype);
  }
}
