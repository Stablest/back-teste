import { CustomAPIError } from "./custom-api-error";

class AuthenticationError extends CustomAPIError {
  constructor(message: string) {
    super(message);
    this.statusCode = 401;
  }
}

export { AuthenticationError };
