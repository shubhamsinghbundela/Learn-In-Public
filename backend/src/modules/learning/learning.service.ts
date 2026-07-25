import learningModel from "./learning.model";

interface AddLearningInput {
  userId: string;
  title: string;
  description: string;
}

const addLearning = async (data: AddLearningInput) => {
  const learning = await learningModel.create(data);
  return learning;
};

export { addLearning };
