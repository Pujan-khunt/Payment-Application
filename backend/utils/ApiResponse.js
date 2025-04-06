class ApiResponse {
  static success({ res, statusCode = 200, message = "Success Response", data = {} }) {
    return res.status(statusCode).json({
      success: true,
      statusCode,
      message,
      data,
      errors: null
    })
  }

  static error({ res, statusCode = 500, message = "Internal Server Error", errors = {} }) {
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
      data: null,
      errors
    })
  }
}

export default ApiResponse;
