import jwt from "jsonwebtoken";
import { z } from "zod";
import { Account } from "../models/Account.model.js";
import { User } from "../models/User.model.js";
import ApiResponse from "../utils/ApiResponse.js";

const updatedUserDataSchema = z.object({
  username: z.string().min(3).max(30).optional(),
  email: z.string().email(),
  firstName: z.string().max(50).optional(),
  lastName: z.string().max(50).optional(),
  password: z.string().min(8).optional()
});

export const updateProfile = async (req, res) => {
  const updatedUserData = req.body;

  // Validating the updated user fields with zod.
  const validationResponse = updatedUserDataSchema.safeParse(updatedUserData);
  if (!validationResponse.success) {
    return ApiResponse.error({
      res,
      statusCode: 400,
      message: "Updated profile data is not up to the standard. Check error message for better understanding",
      errors: validationResponse.error
    })
  }

  // Updating the profile's data with the provided data.
  const existingUser = await User.findById(req.userId);
  if (updatedUserData.username) existingUser.username = updatedUserData.username;
  if (updatedUserData.email) existingUser.email = updatedUserData.email;
  if (updatedUserData.firstName) existingUser.firstName = updatedUserData.firstName;
  if (updatedUserData.lastName) existingUser.lastName = updatedUserData.lastName;
  if (updatedUserData.password) existingUser.password = updatedUserData.password;
  await existingUser.save();

  return ApiResponse.success({
    res: res,
    statusCode: 200,
    message: "User's profile updated successfully.",
    data: null
  });
}

const userDataSchema = z.object({
  username: z.string().min(3).max(30),
  email: z.string().email(),
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
  const existingUserWithSameUsername = User.findOne({ username: userData.username });
  const existingUserWithSameEmail = User.findOne({ email: userData.email });

  // Only users with unique usernames are allowed to sign-up.
  if (existingUserWithSameUsername?._id) {
    return ApiResponse.error({
      res,
      statusCode: 400,
      message: "Username already taken. Try again :( hello",
      errors: null
    })
  }

  // Only users with unique emails are allowed to sign-up 
  if (existingUserWithSameEmail?._id) {
    return ApiResponse.error({
      res,
      statusCode: 400,
      message: "User with email already exists :(",
      errors: null
    })
  }

  // Creating a new instance of User model.
  const newUser = new User({
    username: userData.username,
    email: userData.email,
    firstName: userData.firstName,
    lastName: userData.lastName,
    password: userData.password
  });
  await newUser.save();

  // Creating a new instance of Account model, which will be linked with the user.
  const newAccount = new Account({
    userId: newUser._id,
    balance: Math.floor(Math.random() * 10000 + 1)
  });
  await newAccount.save();

  // Generating the JWT Token using the private JWT secret.
  const jwtPayload = {
    userId: newUser._id
  }
  const jwtToken = jwt.sign(jwtPayload, process.env.JWT_SECRET);

  return ApiResponse.success({
    res,
    message: "New user created successfully.",
    statusCode: 201,
    data: {
      user: {
        username: newUser.username,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        balance: newAccount.balance
      },
      jwtToken
    }
  })
}

export const getProfilesByFilter = async (req, res) => {
  const filter = req.query.filter || "";

  // Selecting users based on a single filter.
  const allUsers = await User.find({
    // OR Query Operator - Matches(Puts in allUsers array) Based On Either Of The Queries.
    $or: [
      {
        // First Query: firstName should match with filter by regex.
        firstName: {
          $regex: filter,
          $options: "i"
        }
      },
      // Second Query: lastName should match with filter by regex.
      {
        lastName: {
          $regex: filter,
          $options: "i"
        }
      }
    ]
  });

  return ApiResponse.success({
    res,
    statusCode: 200,
    message: "Users filtered successfully.",
    data: {
      // No need to map it and then return objects of users exlcuding the password field,
      // select: false, in the user model disables automatic password selecting.
      users: allUsers
    }
  })
}

const userLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export const signInUser = async (req, res) => {
  const data = req.body;

  // handling validation of inputs
  const validationresponse = userLoginSchema.safeParse(data);
  if (!validationresponse.success) {
    return ApiResponse.error({
      res,
      statuscode: 400,
      message: "inputs not validated. sign up failed :(",
      errors: validationresponse.error
    })
  }

  const { email, password } = data;

  // validating password provided with existing password of the user.
  const user = await User.findOne({ email }).exec();
  if (!user) {
    return ApiResponse.error({
      res,
      statusCode: 401,
      message: "Email not registered with us.",
      errors: null
    })
  }

  const passwordValidation = user.validatePassword(password);
  if (!passwordValidation) {
    return ApiResponse.error({
      res,
      statuscode: 401,
      message: "incorrect username/password. try again :(",
      errors: null
    })
  }

  return ApiResponse.success({
    res,
    stauscode: 200,
    messsage: "user authenticated successfully",
    data: null
  })
}
