import React, { useContext, useEffect } from 'react';
import myContext from '../../Store/context';
import axios from 'axios';
import { Link } from 'react-router-dom';

// const commentARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function Right() {
  const { state, videoState, videoDispatch } = useContext(myContext);
  useEffect(() => {
    const fetchVideos = async () => {
       const videoRes = await axios.get(`http://localhost:8000/api/video/trend`);
       videoDispatch({ type: "SET_TREND_VIDEOS", payload: videoRes.data });
    };
    fetchVideos();
  }, [videoDispatch]);



  return (
    <div
      className={`w-auto  h-fit px-2 py-2 gap-2 flex flex-col ${
        state.theme === 'dark' ? 'bg-[#0f0f0f]' : 'bg-[#ffffff]'
      }`}
    >
      {/* card */}
      {videoState.trendVideos.map((item, index) => {
        return (
         

<Link to={`/video/${item._id}`} key={item._id}>
<div
            key={index}
            className={`w-full h-fit py-1 flex items-center gap-2 ${
              state.theme === 'dark' ? 'text-white' : 'text-black'
            }`}
          >
            <img
              src={item.thumbnail.url}
              className="rounded-xl h-[105px] w-[175px]"
              alt="Thumbnail"
            />

            {/* text */}
            <div className="flex w-[400px]  flex-col justify-center">
              <h1
                className={`font-bold ${
                  state.theme === 'dark' ? 'text-white' : 'text-black'
                }`}
              >
                {item.title}
              </h1>
              <div>
                <p
                  className={`${
                    state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Channel
                </p>
                <p
                  className={`${
                    state.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  12M views · 2 years ago
                </p>
              </div>
            </div>
          </div>
</Link>
        );
      })}
    </div>
  );
}

export default Right;
