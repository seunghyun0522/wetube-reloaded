import mongoose, { Schema } from "mongoose";

const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  createdAt: Date,
  hashtags: [{ type: String }],
  meta: {
    views: Number,
    rating: Number,
    hi: Number,
  },
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
