import jwt from "jsonwebtoken";
import { z } from "zod";
import { User } from "../models/User.model.js";
import ApiResponse from "../utils/ApiResponse.js";

const userDataSchema = z.object({
  username: z.string().min(3).max(30),
  firstName: z.string().max(50),
  lastName: z.string().max(50),
  password: z.string().min(8)
})

export async function signUpUser(req, res) {
  const userData = req.body;

  // Checking for valid response from the client.
  const validationResponse = userDataSchema.safeParse(userData);
  if (!validationResponse.success) {
    return ApiResponse.error({
      res,
      statusCode: 400,
      message: "User details are not following the standards. Check errors for better understanding.",
      errors: validationResponse.error
    });
  }

  // Checking for users with duplicate usernames.
  const existingUser = User.findOne({ username: userData.username });
  // Only users with unique usernames are allowed to sign-up.
  if (existingUser?._id) {
    return ApiResponse.error({
      res,
      statusCode: 400,
      message: "Username already taken. Try again :(",
      errors: null
    })
  }

  // Creating a new user document in mongoDB.
  const newUser = new User({
    username: userData.username,
    firstName: userData.firstName,
    lastName: userData.lastName,
    password: userData.password
  })
  await newUser.save();

  // Generating the JWT Token using the private JWT secret.
  const jwtPayload = {
    userId: newUser._id
  }
  const jwtToken = jwt.sign(jwtPayload, process.env.JWT_SECRET);

  return ApiResponse.success({
    res,
    message: "New User Created Successfully.",
    statusCode: 201,
    data: {
      user: {
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        password: newUser.password
      },
      jwtToken
    }
  })
}
