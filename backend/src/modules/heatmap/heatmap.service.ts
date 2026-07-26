import heatmapModel from "./heatmap.model";

const getHeatmap = async (userId: string) => {
  return await heatmapModel.find({ userId }).sort({ date: 1 });
};

export { getHeatmap };
