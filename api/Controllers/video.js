import { createError } from "../error.js";
import videos from "../models/videos.js";
import Users from "../models/users.js";
import { v2 as cloudinary } from 'cloudinary'
import handleUpload from "../services/cloudinaryConfig.js";
// add video
export const addVideo = async (req, res, next) => {
  try {
    // Find the video owner by userId
    const videoOwner = await Users.findById(req.params.userId);
    if (!videoOwner) {
      return res.status(404).json({ message: "User not found" });
    }

    // Initialize thumbnail and video data
    let thumbnail = null;
    let videoUrl = null;

    // Process the thumbnail file if uploaded
    if (req.files.thumbnail) {
      const thumbnailFile = req.files.thumbnail[0];
      const result = await handleUpload(thumbnailFile.path); // Upload to cloud storage (e.g., Cloudinary, AWS S3)
      thumbnail = {
        publicId: result.public_id,
        url: result.url,
      };
    }

    // Process the video file if uploaded
    if (req.files.video) {
      const videoFile = req.files.video[0];
      const result = await handleUpload(videoFile.path); // Upload to cloud storage
      videoUrl = result.url; // Save the video URL
    }

    // Create a new video entry
    const newVideo = new videos({
      userId: req.params.userId,
      uploadedBy: videoOwner.name,
      channelPhoto: videoOwner.img,
      thumbnail,
      videoUrl, // Save the video URL
      ...req.body,
    });

    // Save the video entry in the database
    const savedVideo = await newVideo.save();

    // Send the response
    res.status(201).json(savedVideo);
  } catch (error) {
    next(error);
  }
};



// updateVideo
export const updateVideo = async (req, res, next) => {
  const Video = await videos.findById(req.params.id);
  if (!Video) return next(createError(404, "video not found"));

  if (req.user.id === Video.userId) {
    const updatedVideo = await Video.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.send({
      message: "video updated successfully",
      updatedVideo,
    });
  } else {
    next(createError(403, "you can update only your video"));
  }
};

export const deleteVideo = async (req, res, next) => {
  const Video = await videos.findById(req.params.id);
  if (!Video) return next(createError(404, "video not found"));

  if (req.user.id === Video.userId) {
    const updatedVideo = await Video.findByIdAndDelete(req.params.id);
    res.send({
      message: "video deleted successfully",
      updatedVideo,
    });
  } else {
    next(createError(403, "you can delete only your video"));
  }
};

export const getVideo = async (req, res, next) => {
  const Video = await videos.findById(req.params.id);
  if (!Video) return next(createError(404, "video not found"));

  res.send({
    message: "here is your video",
    Video,
  });
};

export const addView = async (req, res, next) => {
  try {
   const viewedVideo =  await videos.findByIdAndUpdate(req.params.videoId, { $inc: { views: 1 } },
      { new: true } 
    );
    viewedVideo.save()
    res.send("viewed");
  } catch (error) {
    next(createError(404,"not found"))
  }
};

export const random = async (req, res, next) => {
  try {
    let randomVideos = await videos.aggregate([{ $sample: { size: 40 } }]);
    // console.log(videos)
    res.send(randomVideos);
  } catch (error) {
    next(error);
  }
};

export const trend = async (req, res, next) => {
  try {
    const trendvideos = await videos.find().sort({ views: -1 });
    res.send(trendvideos);
  } catch (error) {
    next(error);
  }
};

export const sub = async (req, res, next) => {
  try {
    const user = await Users.findById(req.user.id);
    const SubscribedChannels = user.subscribedChannels;

    let list = await Promise.all(
      SubscribedChannels.map((channelId) => {
        return videos.find({ userId: channelId });
      })
    );
    res.send(list.flat().sort())
  } catch (error) {
    next(error);
  }
};

export const getByTag = async (req, res, next) => {
  const tags= req.query.tags.split(",")
  try {
   const taggedVideos = await videos.find({tags:{$in:tags}})
   res.send(taggedVideos)
  } catch (error) {
    next(error);
  }
};

export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const taggedVideos = await videos.find({
      title: { $regex: query, $options: "i" },
    });
  res.send(taggedVideos)
  } catch (error) {
    next(error);
  }
};