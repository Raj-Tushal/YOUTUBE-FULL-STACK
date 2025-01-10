import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import myContext from "../Store/context";
import MovieCard from "../Components/MovieCard";
import classNames from "classnames";
import axios from "axios";
function Search() {
  const { query } = useParams();
  const { state,videoState, videoDispatch } = useContext(myContext);
console.log(videoState.queryVideos,"query videos");
  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`http://localhost:8000/api/video/search?q=${query}`);
      videoDispatch({ type: "SET_QUERY_VIDEOS", payload: res.data });
    };
    fetchVideos();
  }, [query, videoDispatch]);

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
        {videoState.queryVideos.map((video) => (
           <Link to={`/video/${video._id}`} key={video._id}>
           <MovieCard video={video}   />
         </Link>
        ))}
      </div>
    </div>
  );
}

export default Search;
