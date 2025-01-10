
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from "dotenv";
import userRoute from './routes/user.js'
import videoRoute from './routes/video.js'
import commentRoute from './routes/comment.js'
import authRoute from './routes/auth.js'
import users from './models/users.js';
import cookieParser from 'cookie-parser';
const app =express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use("/api/auth",authRoute)
app.use("/api/user",userRoute)
app.use("/api/video",videoRoute)
app.use("/api/comment",commentRoute)

// global error handler
app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "something went wrong";
    return res.status(status).json({
        success: false,
        status,
        message
    });
});

// get all users
app.get("/allusers",async(req,res)=>{
    const allUsers = await users.find()
    res.send(allUsers)
})
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

