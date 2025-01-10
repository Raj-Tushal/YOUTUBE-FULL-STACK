import mongoose from "mongoose";

const videoSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: String,
    },
    channelPhoto: {
type: String,
    },
    title: {
      type: String,
      required: true,
    },
    thumbnail: {
      publicId: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    videoUrl: {
      type: String,
    },
    desc: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    views: {
      type: Number,
      default: 0,
    },
    likes: {
      type: [String],
      default: 0,
    },
    dislikes: {
      type: [String],
      default: 0,
    },
  },
  { timestamps: true }
);




export default mongoose.model("Videos", videoSchema);
