import { createError } from "../error.js";
import Users from "../models/users.js";
import Videos from "../models/videos.js";
export const update = async (req, res,next) => {
 if(req.params.id === req.user.id) {
try{
  let userId = req.params.id;
  let newUser = req.body;
  const updatedUser = await Users.findByIdAndUpdate(userId, newUser, {
    new: true, // Return the updated document
  });
  res.send(updatedUser);
}
catch(err){
next(err)
}
 }

 else{
   return next(createError(403,"you can update only your account"))
 }
};

export const deleteUser = async (req, res,next) => {
  if(req.params.id === req.user.id) {
 try{
   let userId = req.params.id;
   let newUser = req.body;
   await Users.findByIdAndDelete(userId, newUser, {
     new: true, // Return the updated document
   });
   res.send("user has been deleted");
 }
 catch(err){
 next(err)
 }
  }
 
  else{
    return next(createError(403,"you can delete only your account"))
  }
 };

export const getUser = async (req, res) => {
  let userId = req.params.id;
  const updatedUser = await Users.findOne({_id:userId});

  res.send(updatedUser);
};

export const like = async (req, res) => {
  let userId = req.params.id;
  let newUser = req.body;
  const updatedUser = await Users.findByIdAndUpdate(userId, newUser, {
    new: true, // Return the updated document
  });

  res.send(updatedUser);
};

export const subscribe = async (req, res,next) => {
  try{
    await Users.findByIdAndUpdate(req.params.khudKiId,
      {$push:{subscribedChannels:req.params.userId}
    });

    await Users.findByIdAndUpdate(req.params.userId,
      {$inc:{subscribers:1}}
    )
    res.send("subscribed successfully")
  }
  catch(err){
  next(err)
  }
};

export const unsubsrcibe = async (req, res,next) => {
  try{
    await Users.findByIdAndUpdate(req.params.khudKiId,
      {$pull:{subscribedChannels:req.params.userId}
    });

    await Users.findByIdAndUpdate(req.params.userId,
      {$inc:{subscribers:-1}}
    )
    res.send("unSubscribed successfully")
  }
  catch(err){
  next(err)
  }
};

export const Like = async (req, res,next) => {
  let id = req.params.userId;
  let videoId = req.params.videoId;
  try {
    await Videos.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id },
      $pull: { dislikes: id },
    })

    res.status(200).json("The video has been liked")
  } catch (error) {
    next(error)
  }
};

export const dislike = async (req, res,next) => {
  let id = req.params.userId;
  let videoId = req.params.videoId;
  try {
    await Videos.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id },
      $pull: { likes: id },
    })

    res.status(200).json("The video has been disliked")
  } catch (error) {
    next(error)
  }
};
