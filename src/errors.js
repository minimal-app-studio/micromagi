const { sendError } = require("./http");

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

class ValidationError extends AppError {
  constructor(message = "Validation failed") {
    super(message, 400);
  }
}

const globalErrorHandler = (err, req, res, next) => {
  if (err.isOperational) {
    return sendError(res, err.message, err, err.statusCode);
  }
  return sendError(res, "Something went wrong!", err);
};

module.exports = globalErrorHandler;

module.exports = {
  AppError,
  NotFoundError,
  ValidationError,
};
