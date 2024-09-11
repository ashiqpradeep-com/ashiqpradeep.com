export class AppException extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string, stack?: any) {
    super(message);
    this.statusCode = statusCode;
    this.stack = stack;
  }
}
