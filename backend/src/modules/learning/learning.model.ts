import mongoose from "mongoose";

const learningSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      index: true,
    },
    body: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

const learningModel = mongoose.model("learning", learningSchema);

export default learningModel;
