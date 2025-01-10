import { createError } from "../error.js";
import comments from "../models/comments.js";
import users from "../models/users.js";

import videos from "../models/videos.js";

export const addComment = async (req, res, next) => {
  let user = await users.findById(req.params.userId);
  let newComment = await comments({ userId: req.params.userId, userName: user.name,img:user.img, ...req.body });
  try {
    const savedComment = await newComment.save();
    res.send({
      ...savedComment._doc,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteComment = async (req, res, next) => {
    const comment = await comments.findById(req.params.id);
  try {
    if (!comment) return next(createError(404, "comment not  found"));

    const video = await videos.findById(comment.videoId);

    if (req.user.id === comment.userId || req.user.id === video.userId) {
      await comments.findByIdAndDelete(req.params.id);
      res.send("comment deleted successfully");
    } else {
      next(createError(403, "you can only delete your comment"));
    }
  } catch (error) {
    next(error)
  }
};

export const getComment = async (req, res, next) => {
  try {
    const allComments = await comments.find({ videoId: req.params.id });
    res.send(allComments);
  } catch (error) {
    next(error);
  }
};
