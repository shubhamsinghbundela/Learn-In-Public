import mongoose from "mongoose";

const heatmapSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      index: true,
    },

    date: {
      type: String,
      required: true,
      trim: true,
    },

    count: {
      type: Number,
      required: true,
      default: 0,
    },

    level: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// For the same userId and date, there can be only one document.
heatmapSchema.index(
  {
    userId: 1,
    date: 1,
  },
  {
    unique: true,
  },
);

const heatmapModel = mongoose.model("heatmap", heatmapSchema);

export default heatmapModel;
