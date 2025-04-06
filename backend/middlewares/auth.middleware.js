import ApiResponse from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;

  // Checking existence of a valid authorization header.
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return ApiResponse.error({
      res,
      statusCode: 401,
      message: "No Authorization Header Found.",
    })
  }

  // Extracting the token from the header.
  const token = authHeader.split(" ")[1];

  // Verifying the signature of the token.
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attaching the id of the logged in user for subsequent middlewares and controllers.
    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.error(error);
    return ApiResponse.error({
      res,
      statusCode: 401,
      message: "Invalid JWT Token",
      errors: [error]
    })
  }
}
