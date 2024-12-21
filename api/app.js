import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import userSchema from './models/users.js';
import videoSchema from './models/videos.js';
import commentSchema from './models/comments.js';
import userRoute from './routes/user.js'
import videoRoute from './routes/video.js'
import commentRoute from './routes/comment.js'
import authRoute from './routes/auth.js'
dotenv.config();
const app =express();
app.use(express.json());

app.use("/api/auth",authRoute)
app.use("/api/user",userRoute)
app.use("/api/video",videoRoute)
app.use("/api/comment",commentRoute)

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message
    });
});


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("CONNECTED TO MONGO DB")
})
.catch((e)=>{
    console.log("ERROR CONNECTING TO DB"+e)
})


let port = process.env.PORT
app.listen(8000,()=>{
    console.log("server is running..")
})

