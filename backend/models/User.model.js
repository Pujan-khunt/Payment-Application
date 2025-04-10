import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: false, // Only for testing -> set to true in production
    lowercase: true,
    minLength: 3,
    maxLength: 30
  },
  firstName: {
    type: String,
    unique: false, // Only for testing -> remove in production
    required: true,
    trim: true,
    maxLength: 50
  },
  lastName: {
    type: String,
    unique: false, // Only for testing -> remove in production
    required: true,
    trim: true,
    maxLength: 50
  },
  password: {
    type: String,
    required: true,
    select: false,
    minLength: 8
  },
});

// Pre-save hook to hash passwords before saving in database.
UserSchema.pre("save", async function(next) {
  // Hash password for new user and for user for whom the password field is updated.
  if (this.isNew || this.isModified("password")) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      return next(error);
    }
  }
  next();
});

// Method attached to all documents for verifying its password with another.
UserSchema.methods.validatePassword = async function(passwordToValidate) {
  return await bcrypt.compare(passwordToValidate, this.password);
}

export const User = mongoose.model("User", UserSchema);
