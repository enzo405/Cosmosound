import { WebError } from "./Error";

/**
 * 403 indicates that the resource can not be provided for the current user.
 * This may be because it is known that no level of authentication is sufficient (for instance because of an IP blacklist),
 * but it may be because the user is already authenticated and does not have authority.
 */
export default class ForbiddenException extends WebError {
  constructor(message: string) {
    super({
      statusMessage: message,
      statusCode: 403,
    });
    Object.setPrototypeOf(this, ForbiddenException.prototype);
  }
}
