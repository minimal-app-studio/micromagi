const { sendError } = require("./http");

class AppError extends Error {
  constructor(message, statusCode, errorCode) {
    super(message);
    this.statusCode = statusCode;
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

class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

class InternalServerError extends AppError {
  constructor(message = "Internal server error") {
    super(message, 500);
  }
}

class DuplicateError extends AppError {
  constructor(message = "Duplicate entry") {
    super(message, 409);
  }
}

class DataValidationError extends AppError {
  constructor(message = "Data validation error") {
    super(message, 422);
  }
}

const globalErrorHandler = (err, req, res, next) => {
  if (err.isOperational) {
    return sendError(res, err.message, err.statusCode);
  }
  return sendError(res, "Something went wrong!", err);
};

module.exports = {
  AppError,
  NotFoundError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  InternalServerError,
  DuplicateError,
  DataValidationError,
  globalErrorHandler,
};
