import { useEffect, useContext } from "react";
import classNames from "classnames";
import myContext from "../Store/context.js";
import { Link } from "react-router-dom";
import axios from "axios";
import MovieCard from "./MovieCard.jsx";

function Home({ type }) {
  const { state, videoState, videoDispatch } = useContext(myContext);
  console.log(videoState.randomVideos, " video state videos")
  // Fetch random videos
  useEffect(() => {
    const fetchRandomVideos = async () => {
      const res = await axios.get(`http://localhost:8000/api/video/${type}`);
      console.log(res.data, "random videos");
      videoDispatch({ type: "SET_RANDOM_VIDEOS", payload: res.data });
      console.log(videoState.videos, "videos");
    };

    fetchRandomVideos();
  }, [type, videoDispatch, videoState.videos]);

  const containerClass = classNames(
    "w-full flex h-[calc(100vh-70px)]",
    {
      "bg-[#0f0f0f]": state.theme === "dark",
      "bg-blue-600": state.theme !== "dark",
    }
  );

  const contentClass = classNames(
    {
      "w-[calc(100% - 250px)]": state.isLeftBarOpen,
      "w-full": !state.isLeftBarOpen,
    },
    "h-full flex flex-wrap justify-center py-2 overflow-scroll gap-2",
    {
      "bg-[#0f0f0f]": state.theme === "dark",
      "bg-[#ffffff]": state.theme !== "dark",
    }
  );

  // console.log(videoState.randomVideos, "random videos");
  return (
    <div className={containerClass}>
      {/* Right-Content */}
      <div
        className={contentClass}
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE & Edge
        }}
      >
        {/* MOVIE-CARD */}
        {videoState.randomVideos.map((video) => (
          
          <Link to={`/video/${video._id}`} key={video._id}>
            <MovieCard video={video}   />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
