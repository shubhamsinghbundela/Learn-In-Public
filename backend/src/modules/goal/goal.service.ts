import { formatInTimeZone } from "date-fns-tz";
import goalModel from "./goal.model";

interface CreateGoalInput {
  userId: string;
  title: string;
  description?: string;
  timezone: string;
}

const createGoal = async (data: CreateGoalInput) => {
  const goalDate = formatInTimeZone(new Date(), data.timezone, "yyyy-MM-dd");
  return await goalModel.create({
    userId: data.userId,
    title: data.title,
    description: data.description,
    goalDate,
  });
};

export { createGoal };
