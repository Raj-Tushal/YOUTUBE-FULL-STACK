import mongoose from "mongoose";

const videoSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
        type: String,
        required: true,
      },
    videoUrl:{
        type: String,
        required: true,
      },
      tags:{
       type: [String],
       default:[]
      },
    likes: {
      type: [String],
      default:0
    },
    dislikes: {
        type: [String],
        default:0
      }, 
  },
 {timestamps: true}
);

export default mongoose.model("Videos",videoSchema)