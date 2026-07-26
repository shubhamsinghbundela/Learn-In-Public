import mongoose from "mongoose";
import { formatInTimeZone } from "date-fns-tz";

import userModel from "../auth/auth.model";
import learningModel from "./learning.model";
import heatmapModel from "../heatmap/heatmap.model";
import { differenceInCalendarDays, parseISO } from "date-fns";

interface AddLearningInput {
  userId: string;
  title: string;
  description: string;
  timezone: string;
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
    await session.startTransaction();

    const user = await userModel.findById(data.userId).session(session);

    if (!user) {
      throw new Error("User not found");
    }

    const now = new Date();

    const todayDate = formatInTimeZone(now, data.timezone, "yyyy-MM-dd");
    const localCreatedAt = formatInTimeZone(now, data.timezone, "HH:mm:ss");

    // add learning in DB
    const learning = await learningModel.create(
      [
        {
          userId: data.userId,
          title: data.title,
          description: data.description,
          learningDate: todayDate,
          localCreatedAt,
        },
      ],
      { session },
    );

    // Heatmap
    // find all heatmap of todayDate because many learning i publish today
    const heatmap = await heatmapModel
      .findOne({
        userId: data.userId,
        date: todayDate,
      })
      .session(session);

    if (!heatmap) {
      // if heatmap not exist of particular day
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
      // if heatmap exist of particular day just increase count i.e. number of learning publish
      heatmap.count += 1;
      heatmap.level = getLevel(heatmap.count);

      await heatmap.save({ session });
    }

    // Streak calculation
    if (!user.lastLearningDate) {
      // if first time publishing learning
      user.currentStreak = 1;
      user.longestStreak = 1;
    } else {
      // if again publishing learning
      const diffDays = differenceInCalendarDays(
        parseISO(todayDate),
        parseISO(user.lastLearningDate),
      );

      if (diffDays === 0) {
        // Already learned today i.e streak will be same because same day
      } else if (diffDays === 1) {
        // streak will increase if learning published before
        user.currentStreak += 1;
        user.longestStreak = Math.max(user.longestStreak, user.currentStreak);
      } else {
        // Missed one or more days
        user.currentStreak = 1;
      }
    }

    // Always update lastLearningDate
    user.lastLearningDate = todayDate;

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
