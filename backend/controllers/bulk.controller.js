import { User } from "../models/User.model.js";
import ApiResponse from "../utils/ApiResponse.js";

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
