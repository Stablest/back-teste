class CustomAPIError extends Error {
  constructor(message: string) {
    super(message);
    this.statusCode = null;
  }
  statusCode: number | null;
}

export { CustomAPIError };
