import { z } from "zod";
import { User } from "../models/User.model.js";

const userDataSchema = z.object({
  username: z.string().min(3).max(30),
  firstName: z.string().max(50),
  lastName: z.string().max(50),
  password: z.string().min(8)
})

export async function signUpUser(req, res) {
  const userData = req.body;

  const validationResponse = userDataSchema.safeParse(userData);
  if (!validationResponse.success) {
    return res.status(400).json({
      message: "User details are not following the standards. Check errors for better understanding.",
      data: null,
      errors: validationResponse.error
    })
  }

  const newUser = new User({
    username: userData.username,
    firstName: userData.firstName,
    lastName: userData.lastName,
    password: userData.password
  })
  await newUser.save();

  return res.status(201).json({
    message: "New User Created Successfully.",
    data: {
      user: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        password: newUser.password
      }
    }
  });
}
