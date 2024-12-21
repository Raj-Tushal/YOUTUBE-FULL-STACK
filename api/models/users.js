import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    subscribers: {
      type: Number,
    },
    subscribedChannels: {
      type: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Users",userSchema)