import { CustomAPIError } from "./custom-api-error";

class UnknownError extends CustomAPIError {
  constructor(message?: string) {
    super(message || "Something went wrong");
    this.statusCode = 500;
  }
}

export { UnknownError };
