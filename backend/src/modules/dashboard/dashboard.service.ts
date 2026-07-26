import ApiError from "../../common/utils/api-error";
import userModel from "../auth/auth.model";
import goalModel from "../goal/goal.model";
import heatmapModel from "../heatmap/heatmap.model";
import learningModel from "../learning/learning.model";

interface GetDashboardInput {
  userId: string;
  date: string;
}

interface GetPublicDashboardInput {
  username: string;
  date: string;
}

const getDashboard = async (data: GetDashboardInput) => {
  const selectedDate = new Date(data.date);

  if (isNaN(selectedDate.getTime())) {
    throw ApiError.badRequest("Invalid date");
  }

  const startOfDay = new Date(selectedDate);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(selectedDate);
  endOfDay.setHours(23, 59, 59, 999);

  const [user, learnings, goals, heatmap] = await Promise.all([
    userModel.findById(data.userId),
    learningModel.find({
      userId: data.userId,
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }),
    goalModel.find({
      userId: data.userId,
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }),
    heatmapModel.find({ userId: data.userId }).sort({ date: 1 }),
  ]);

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  return {
    user: {
      userId: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
    },
    streak: {
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
    },
    todayLearnings: learnings,
    goals,
    heatmap,
  };
};

const getPublicDashboard = async (data: GetPublicDashboardInput) => {
  const selectedDate = new Date(data.date);

  if (isNaN(selectedDate.getTime())) {
    throw ApiError.badRequest("Invalid date");
  }

  const startOfDay = new Date(selectedDate);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(selectedDate);
  endOfDay.setHours(23, 59, 59, 999);

  const user = await userModel.findOne({
    username: data.username,
  });

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  const [learnings, goals, heatmap] = await Promise.all([
    learningModel.find({
      userId: user._id,
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }),
    goalModel.find({
      userId: user._id,
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }),
    heatmapModel.find({ userId: user._id }).sort({ date: 1 }),
  ]);

  return {
    user: {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
    },
    streak: {
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
    },
    todayLearnings: learnings,
    goals,
    heatmap,
  };
};

export { getDashboard, getPublicDashboard };
