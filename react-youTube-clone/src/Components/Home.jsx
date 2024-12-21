import React, { useEffect } from "react";
import Leftbar from "./Leftbar.jsx";
import { useContext } from "react";
import myContext from "../Store/context.js";
import { Link } from "react-router-dom";

function Home() {
  const { state} = useContext(myContext);

  // useEffect(() => {
  //   // If you want to apply the theme when the component mounts
  //   document.body.classList.toggle("dark", state.theme === "dark");
  // }, [state.theme]);

  return (
    <div
      className={`w-full flex h-[calc(100vh-70px)] ${
        state.theme === "dark" ? "bg-[#0f0f0f] " : "bg-blue-600"
      }`}
    >
      {/* Right-Content */}
      <div
        className={`${
          state.isLeftBarOpen ? "w-[calc(100% - 250px)]" : "w-full"
        } h-full ${
          state.theme === "dark" ? "bg-[#0f0f0f] " : "bg-[#ffffff]"
        } flex flex-wrap justify-center py-2 overflow-scroll gap-2`}
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE & Edge
        }}
      >
        {/* MOVIE-CARD */}
        <Link to="/video">
          <MovieCard />
        </Link>
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </div>
    </div>
  );
}

export default Home;

export function MovieCard() {
  const {state} = useContext(myContext)
  return (
    <div className="w-[300px] h-[288px] flex flex-col gap-2 p-2">
      {/* Top */}
      <div className="w-full h-full flex items-center justify-center overflow-hidden">
        <img
          src="https://i.ytimg.com/vi/PJ3ZQk_lr9E/maxresdefault.jpg"
          alt=""
          className="rounded-lg w-full h-full object-cover"
        />
      </div>

      {/* Bottom */}
      <div className="w-full h-1/3 flex gap-1">
        {/* Left-icon */}
        <div className="h-full w-[20%] flex justify-start ">
          <img
            src="https://yt3.googleusercontent.com/XE7Iq8jvJ07ptMc-HxZR_V-2XgXCb0i06i4E_dypl7xSR655WXaQeglfqNuEeuwH3oM9RKVodQ=s160-c-k-c0x00ffffff-no-rj"
            alt=""
            className="rounded-full w-10 h-10"
          />
        </div>
        {/* h-full w-[80%] text-sm flex flex-col justify-start text-white */}
        {/* Right-details */}
        <div className={` h-full w-[80%] text-sm flex flex-col justify-start text-white ${
          state.theme === "dark" ? "text-[white]":"text-[#121212]" 
        } `}>
          <p className={` ${
          state.theme === "dark" ? "text-[white]":"text-[#121212]" 
        } `}>
            React Video Sharing App UI Design | YouTube UI Clone with React
          </p>
          <p className="text-gray-600">Channel</p>
          <p className="text-gray-600">12M views · 2 years ago</p>
        </div>
      </div>
    </div>
  );
}
