import mongoose from "mongoose";
import userModel from "../auth/auth.model";
import learningModel from "./learning.model";

interface AddLearningInput {
  userId: string;
  title: string;
  description: string;
}

const addLearning = async (data: AddLearningInput) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const user = await userModel.findById(data.userId).session(session);

    if (!user) {
      throw new Error("User not found");
    }

    const learning = await learningModel.create([data], { session });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!user.lastLearningDate) {
      // First learning
      user.currentStreak = 1;
      user.longestStreak = 1;
    } else {
      const lastLearningDate = new Date(user.lastLearningDate);
      lastLearningDate.setHours(0, 0, 0, 0);

      const diffDays =
        (today.getTime() - lastLearningDate.getTime()) / (1000 * 60 * 60 * 24);

      if (diffDays === 0) {
        // Already added today
      } else if (diffDays === 1) {
        user.currentStreak += 1;
        user.longestStreak = Math.max(user.longestStreak, user.currentStreak);
      } else {
        // Missed one or more days
        user.currentStreak = 1;
      }
    }

    user.lastLearningDate = today;

    await user.save({ session });

    await session.commitTransaction();

    return learning[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    await session.endSession();
  }
};

export { addLearning };
