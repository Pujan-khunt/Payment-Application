import { Account } from "../models/Account.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import mongoose from "mongoose";

export const getBalance = async (req, res) => {
  // Find the account which with the provided id of the user.
  const userAccount = await Account.findOne({ userId: req.userId });

  // User exists and is authenticated, but no Account linked to the User.
  if (!userAccount._id) {
    return ApiResponse.error({
      res,
      statusCode: 403,
      message: "No account linked to the authenticated user.",
    })
  }

  // Balance successfully returned.
  return ApiResponse.success({
    res,
    statusCode: 200,
    message: "Balance fetched successfully",
    data: {
      balance: userAccount.balance
    }
  })
}

export const transferFunds = async (req, res) => {
  const { recipientId, amount } = req.body;

  // Handling the case of invalid amount.
  if (amount <= 0) {
    return ApiResponse.error({
      res,
      statusCode: 400,
      message: "Invalid amount for transfering funds.",
    })
  }

  // Starting the session and transaction to maintain a consistent state.
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Handling existence of senders' account.
    let senderAccount = null;
    try {
      senderAccount = await Account.findOne({ userId: req.userId }).exec();
    } catch (error) {
      session.abortTransaction();
      return ApiResponse.error({
        res,
        statusCode: 400,
        message: "Sender's account does not exist.",
        errors: error
      })
    }

    // Handling invalid balance condition after transaction.
    if (senderAccount.balance < amount) {
      session.abortTransaction();
      return ApiResponse.error({
        res,
        statusCode: 400,
        message: "Insufficient balance to make a transfer"
      })
    }

    // Handling existence of recipient's account.
    try {
      await Account.findOne({ userId: recipientId }).exec();
    } catch (error) {
      session.abortTransaction();
      return ApiResponse.error({
        res,
        statusCode: 400,
        message: "Invalid recipient Id.",
        errors: error
      })
    }

    // Handling fund transfer happening to the same account.
    if (req.userId === recipientId) {
      session.abortTransaction();
      return ApiResponse.error({
        res,
        statusCode: 400,
        message: "Cannot transfer funds to yourself."
      })
    }

    // Updating the sender's account balance to -= amount.
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    );

    // Updating the recipient's account balance to += amount.
    await Account.updateOne(
      { userId: recipientId },
      { $inc: { balance: amount } }
    )

    // Commit the transaction (This would update all the changes into the DB).
    await session.commitTransaction();

    return ApiResponse.success({
      res,
      statusCode: 200,
      message: "Funds Transferred Successfully.",
      data: {
        updatedBalance: senderAccount.balance - amount
      }
    })
  } catch (error) {
    console.error(error);
    session.abortTransaction();
  }
}
