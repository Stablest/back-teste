import { CustomAPIError } from "./custom-api-error";

class NotFoundError extends CustomAPIError {
  constructor(message: string) {
    super(message);
    this.statusCode = 404;
  }
}

export { NotFoundError };
