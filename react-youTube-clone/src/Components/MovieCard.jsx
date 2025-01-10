import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import myContext from "../Store/context";
import axios from "axios";
import { format } from "timeago.js";
import classNames from "classnames";

function MovieCard({ video }) {
  const { state, videoState, videoDispatch, authState } = useContext(myContext);
  console.log(authState.currentUser, "current user");
console.log(video,"video");
  useEffect(() => {
    const fetchChannel = async () => {
      const res = await axios.get(
        `http://localhost:8000/api/user/find/${video.userId}`
      );
      console.log(res.data, "cahnnel response"); // Assuming data is the actual response payload
      videoDispatch({ type: "SET_CHANNEL", payload: res.data });
    };

    fetchChannel();
  }, [video.userId, videoDispatch]);

  const containerClass = "w-[350px] h-[288px] flex flex-col gap-2 p-2";
  const topClass =
    "w-full h-full flex items-center justify-center overflow-hidden";
  const imageClass = "rounded-lg w-full h-full object-cover";
  const bottomClass = "w-full h-1/3 flex gap-1";
  const leftIconClass = "h-full w-[20%] flex justify-start";
  const leftImageClass = "rounded-full w-10 h-10";
  const rightDetailsClass = classNames(
    "h-full w-[80%] text-sm flex flex-col justify-start",
    {
      "text-[white]": state.theme === "dark",
      "text-[#121212]": state.theme !== "dark",
    }
  );
  const titleClass = classNames({
    "text-[white]": state.theme === "dark",
    "text-[#121212]": state.theme !== "dark",
  });
  const grayTextClass = "text-gray-600";

  return (
    <div className={containerClass}>
      {/* Top */}
      <div className={topClass}>
        <img
          alt=""
          src={video.thumbnail.url}
          className={imageClass}
        />
      </div>

      {/* Bottom */}
      <div className={bottomClass}>
        {/* Left-icon */}
        <div className={leftIconClass}>
          <img
            src={video.channelPhoto}
            alt=""
            className={leftImageClass}
          />
        </div>
        {/* Right-details */}
        <div className={rightDetailsClass}>
          <p className={titleClass}>{video.title}</p>
          <p className={grayTextClass}>{video.uploadedBy}</p>
          <p className={grayTextClass}>
            {video.views} views · {format(video.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
