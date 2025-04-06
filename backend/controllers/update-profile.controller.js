import { z } from "zod";
import ApiResponse from "../utils/ApiResponse.js";
import { User } from "../models/User.model.js";

const updatedUserDataSchema = z.object({
  username: z.string().min(3).max(30).optional(),
  firstName: z.string().max(50).optional(),
  lastName: z.string().max(50).optional(),
  password: z.string().min(8).optional()
});

export const updateProfile = async (req, res) => {
  const data = req.body;

  // Validating the updated user fields with zod.
  const validationResponse = updatedUserDataSchema.safeParse(data);
  if (!validationResponse.success) {
    return ApiResponse.error({
      res,
      statusCode: 400,
      message: "Updated profile data is not up to the standard. Check error message for better understanding",
      errors: [validationResponse.error]
    })
  }

  // Updating the profile's data with the provided data.
  const updatedUser = await User.findByIdAndUpdate(req.userId, {
    ...(data.username && { username: data.username }),
    ...(data.firstName && { firstName: data.firstName }),
    ...(data.lastName && { lastName: data.lastName }),
    ...(data.password && { password: data.password })
  }, { new: true });

  return ApiResponse.success({
    res: res,
    statusCode: 200,
    message: "User's profile updated successfully.",
    data: {
      updatedUser: {
        username: updatedUser.username,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
      }
    }
  });
}
