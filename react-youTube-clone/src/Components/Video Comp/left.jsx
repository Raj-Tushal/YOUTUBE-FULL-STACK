import  { useContext,useRef, useEffect, useState } from "react";
import raj from "../../assets/raj.jpg";
import myContext from "../../Store/context";
import { useParams } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
function Left() {
  const { state, videoDispatch, videoState, authState, authDispatch } = useContext(myContext);
  const { id } = useParams();
console.log(videoState.comments,"comments");
  // console.log(authState.currentUser, "current user");
  // console.log(authState.currentUser.subscribedChannels, "subscriptions");
  useEffect(() => {
    const fetchVideos = async () => {
       const videoRes = await axios.get(`http://localhost:8000/api/video/find/${id}`);
       const channelRes =  await axios.get(`http://localhost:8000/api/user/find/${videoRes.data.Video.userId}`);
       const commentRes = await axios.get(` http://localhost:8000/api/comment/getAll/${id}`);
       await axios.put(`http://localhost:8000/api/video/view/${id}`);
       videoDispatch({ type: "SET_VIDEO", payload: videoRes.data.Video });
        videoDispatch({ type: "SET_CHANNEL", payload: channelRes.data });
        videoDispatch({ type: "SET_COMMENTS", payload: commentRes.data });

    };
    fetchVideos();
  }, [id, videoDispatch]);

  const likeHandler = async () => {
    await axios
      .put(
        `http://localhost:8000/api/user/like/${id}/${authState.currentUser._id}`
      )
      .then((res) => {
        console.log(res.data, "res of like handler");
        videoDispatch({ type: "LIKE", payload:authState.currentUser._id});
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
  

  // dislikeHandler
  const dislikeHandler = async () => {
    await axios
      .put(
        `http://localhost:8000/api/user/dislike/${id}/${authState.currentUser._id}`
      )
      .then((res) => {
        console.log(res.data, "==>res of dislike handler");
        videoDispatch({ type: "DISLIKE", payload:authState.currentUser._id});
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };
  
  // subscribeHandler
  const subscribeHandler = async () => {
    try {
      // Toggle subscription status
      const isSubscribed = authState.currentUser.subscribedChannels?.includes(
        videoState.currentVideo.userId
      );

      console.log(isSubscribed, "isSubscribed");
  
      const endpoint = isSubscribed
        ? `http://localhost:8000/api/user/unsub/${videoState.channel._id}/${authState.currentUser._id}`
        : `http://localhost:8000/api/user/sub/${videoState.channel._id}/${authState.currentUser._id}`;
  
      const res = await axios.put(endpoint);
  
      console.log(res.data, "res of subscribe handler");
      // Update state based on response
      authDispatch({
        type: isSubscribed ? "UNSUBSCRIBE" : "SUBSCRIBE",
        payload: videoState.channel._id,
      });

      
    } catch (err) {
      console.error(err, "Error subscribing to channel");
    }
  };
  

  const [comment, setComment] = useState("");

 
  const commentHandler = async () => {
    try {
     const newComment =  await axios.post(`http://localhost:8000/api/comment/${authState.currentUser._id}`,
        {
          videoId: videoState.currentVideo._id,
          desc : comment
        }
      )

      videoDispatch({ type: "ADD_COMMENT", payload: newComment.data });
      console.log(newComment.data,"comment data")
    } catch (error) {
      console.log(error,"error in comment handler")
    }
  }


  // tailwind classes
  const themeClass = state.theme === "dark";
  const getClassNames = {
    container: `w-full h-fit py-2 px-5 flex flex-col gap-2  ${
      themeClass ? "bg-[#0f0f0f]" : "bg-[#ffffff]"
    } `,
    text: themeClass ? "text-white" : "text-black",
    button: `border-none text-lg flex justify-center items-center p-1 gap-3 px-4 rounded-full`,
    bgButton: themeClass ? "bg-[#272727] text-white" : "bg-gray-200 text-black",
    subscribeButton: themeClass
      ? "bg-white text-black"
      : "bg-[#0f0f0f] text-white",
    input: `w-full h-14 px-5 text-lg outline-none ${
      themeClass ? "bg-transparent text-white" : "bg-gray-100 text-black"
    }`,
    commentButton: themeClass
      ? "bg-[#2e71ba] text-white"
      : "bg-blue-500 text-black",
  };

  return (
   <div className={`w-full  flex flex-col items-start gap-5 ${getClassNames.container}`}>
  {/* Video Section */}
  <div className="w-full flex justify-start">
    <video
      src={videoState.currentVideo.videoUrl}
      autoPlay
      controls
      className="w-full  rounded-md"
    ></video>
  </div>

  {/* Title */}
  <h1 className={`w-full max-w-4xl text-xl font-bold ${getClassNames.text}`}>
    {videoState.currentVideo.title}
  </h1>

  {/* Channel Info and Likes Section */}
  <div className="w-full  py-2 flex flex-wrap items-center gap-5 ">
    {/* Channel Section */}
    <div className="flex items-center gap-3">
      <img
        src={authState.currentUser.img}
        className="w-10 h-10 rounded-full"
        alt="Channel Avatar"
      />
      <div>
        <h1 className={`font-bold text-lg ${getClassNames.text}`}>
          {videoState.channel.name}
        </h1>
        <p className="text-gray-400">{videoState.channel.subscribers} Subscribers</p>
      </div>
      <button
        onClick={subscribeHandler}
        className={`${getClassNames.button} ${getClassNames.subscribeButton}`}
      >
        {authState.currentUser.subscribedChannels?.includes(videoState.channel._id)
          ? "Unsubscribe"
          : "Subscribe"}
      </button>
    </div>

    {/* Likes Section */}
    <div className="flex items-center gap-3 ml-auto">
      <button
        className={`${getClassNames.button} ${getClassNames.bgButton}`}
        onClick={likeHandler}
      >
        <i className="fa-solid fa-thumbs-up"></i>
        {videoState.currentVideo.likes?.includes(authState.currentUser._id) ? "1" : "0"}k
      </button>
      <button
        onClick={dislikeHandler}
        className={`${getClassNames.button} ${getClassNames.bgButton}`}
      >
        <i className="fa-solid fa-thumbs-down"></i>
        {videoState.currentVideo.dislikes?.includes(authState.currentUser._id) ? "1" : "0"}k
      </button>
      <button className={`${getClassNames.button} ${getClassNames.bgButton}`}>
        <i className="fa-solid fa-share"></i>
        Share
      </button>
    </div>
  </div>

  {/* Comments Section */}
  <div className="w-full max-w-4xl py-4 border-t">
    {/* Add Comment */}
    <div className="flex items-center gap-3 mb-10">
      <img
        src={authState.currentUser.img}
        className="w-10 h-10 rounded-full"
        alt="User Avatar"
      />
      <input
        type="text"
        placeholder="Add a comment..."
        className={getClassNames.input}
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        className={`${getClassNames.button} ${getClassNames.commentButton}`}
        onClick={commentHandler}
      >
        Comment
      </button>
    </div>

    {/* User Comments */}
    <div className="mt-4 flex flex-col gap-7">
      {videoState.comments.map((comment, index) => (
        <div
          key={index}
          className={`flex items-start gap-3 ${getClassNames.text}`}
        >
          <img src={comment.img} className="w-10 h-10 rounded-full" alt="Comment Avatar" />
          <div className="flex-1">
            <h1>
              {comment.userName}{" "}
              <span className="text-gray-400">{format(comment.createdAt)}</span>
            </h1>
            <p>{comment.desc}</p>
            <div className="flex gap-3 mt-2">
              <i className="fa-solid fa-thumbs-up"></i>
              <i className="fa-solid fa-share"></i>
              <i className="fa-solid fa-thumbs-down"></i>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

  );
}

export default Left;
