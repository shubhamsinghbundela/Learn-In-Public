import mongoose from "mongoose";
import userModel from "../auth/auth.model";
import learningModel from "./learning.model";
import heatmapModel from "../heatmap/heatmap.model";

interface AddLearningInput {
  userId: string;
  title: string;
  description: string;
}

const getLevel = (count: number) => {
  if (count === 0) return 0;
  if (count === 1) return 1;
  if (count <= 3) return 2;
  if (count <= 5) return 3;

  return 4;
};

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

    const todayDate = today.toISOString().split("T")[0];

    // Update heatmap
    const heatmap = await heatmapModel
      .findOne({
        userId: data.userId,
        date: todayDate,
      })
      .session(session);

    if (!heatmap) {
      await heatmapModel.create(
        [
          {
            userId: data.userId,
            date: todayDate,
            count: 1,
            level: getLevel(1),
          },
        ],
        { session },
      );
    } else {
      heatmap.count += 1;
      heatmap.level = getLevel(heatmap.count);

      await heatmap.save({ session });
    }

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
