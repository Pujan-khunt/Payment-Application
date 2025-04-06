class ApiResponse {
  static success(res, statusCode, message = "Success Response", data = {}) {
    return res.status(statusCode).json({
      statusCode,
      message,
      data,
      errors: null
    })
  }

  static error(res, statusCode = 500, message = "Internal Server Error", errors = {}) {
    return res.status(statusCode).json({
      statusCode,
      message,
      data: null,
      errors
    })
  }
}

export default ApiResponse;
