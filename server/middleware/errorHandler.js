/**
 * Global error handler middleware
 * Formats all errors consistently and logs them appropriately
 */

const errorHandler = (err, req, res, next) => {
  // Get status code from error or default to 500
  const statusCode = err.statusCode || 500;
  
  // Log the error (with stack trace in development)
  console.error(`[ERROR] ${err.message}`);
  if (process.env.NODE_ENV !== 'production') {
    console.error(err.stack);
  }
  
  // Create error response
  const errorResponse = {
    status: 'error',
    message: err.message || 'Internal Server Error',
  };
  
  // Add error details in development mode
  if (process.env.NODE_ENV !== 'production') {
    errorResponse.stack = err.stack;
    if (err.errors) {
      errorResponse.errors = err.errors;
    }
  }
  
  // Send error response to client
  res.status(statusCode).json(errorResponse);
};

// Custom error class with status code support
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Not found error handler - use when resource is not found
const notFound = (req, res, next) => {
  const error = new AppError(`Resource not found - ${req.originalUrl}`, 404);
  next(error);
};

module.exports = {
  errorHandler,
  AppError,
  notFound
};