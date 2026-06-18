import mongoose from "mongoose";

const TutorialSchema = new mongoose.Schema(
  {
    workoutName: { type: String, required: true },
    category: { type: String, required: true },
    youtubeUrl: { type: String, required: true },
    description: { type: String },
    benefits: [{ type: String }],
    precautions: [{ type: String }],
    preventiveMeasures: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Tutorial", TutorialSchema);