import goalModel from "./goal.model";

interface CreateGoalInput {
  userId: string;
  title: string;
  description?: string;
}

const createGoal = async (data: CreateGoalInput) => {
  return await goalModel.create(data);
};

export { createGoal };
