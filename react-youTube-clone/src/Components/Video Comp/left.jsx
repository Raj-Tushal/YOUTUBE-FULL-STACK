import React, { useContext } from 'react';
import raj from '../../assets/raj.jpg';
import myContext from '../../Store/context';

function Left() {
  const commentARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const { state } = useContext(myContext);

  const getTextClass = (theme) => (theme === 'dark' ? 'text-white' : 'text-black');

  return (
    <div
      className={`w-[100%] h-fit py-2 px-5 flex flex-col gap-2 ${
        state.theme === 'dark' ? 'bg-[#0f0f0f]' : 'bg-[#ffffff]'
      }`}
    >
      {/* Video */}
      <iframe
        src="https://www.youtube.com/embed/bY3RS9KS944"
        className="w-[100%] h-[450px] py-2 px-5 flex flex-col gap-2 rounded-3xl"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      {/* Title */}
      <h1 className={`text-xl font-bold ${getTextClass(state.theme)}`}>
        React Video Sharing App
      </h1>

      {/* Channel Info and Likes */}
      <div className="w-full py-2 flex">
        {/* Channel */}
        <div className="w-1/2 flex items-center justify-start gap-3">
          <img src={raj} className="w-10 h-10 rounded-full" alt="" />
          <div className="pr-3">
            <h1 className={`font-bold text-lg ${getTextClass(state.theme)}`}>
              Raj
            </h1>
            <p className="text-gray-400">1M Subscribers</p>
          </div>
          <button
            className={`border-none text-lg flex justify-center items-center p-1 gap-3 px-4 rounded-full ${
              state.theme === 'dark' ? 'bg-white text-black' : 'bg-[#0f0f0f]  text-white'
            }`}
          >
            Subscribe
          </button>
        </div>

        {/* Likes Section */}
        <div className="w-1/2 flex items-center justify-end gap-2">
          <button
            className={`border-none text-lg flex justify-center items-center p-1 gap-3 px-4 rounded-full ${
              state.theme === 'dark' ? 'bg-[#272727] text-white' : 'bg-gray-200 text-black'
            }`}
          >
            <i className="fa-solid fa-thumbs-up"></i>
            10k
          </button>
          <button
            className={`border-none text-lg flex justify-center items-center p-1 gap-3 px-4 rounded-full ${
              state.theme === 'dark' ? 'bg-[#272727] text-white' : 'bg-gray-200 text-black'
            }`}
          >
            <i className="fa-solid fa-thumbs-down"></i>
            2k
          </button>
          <button
            className={`border-none text-lg flex justify-center items-center p-1 gap-3 px-4 rounded-full ${
              state.theme === 'dark' ? 'bg-[#272727] text-white' : 'bg-gray-200 text-black'
            }`}
          >
            <i className="fa-solid fa-share"></i>
            Share
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="w-full h-52 py-2">
        <div className={`w-full h-14 flex gap-5 text-xl items-center ${getTextClass(state.theme)}`}>
          <h1 className="font-bold">24,655 Comments</h1>
          <h1 className="flex gap-2 items-center">
            <i className="fa-solid fa-bars-progress"></i> Sort By
          </h1>
        </div>
        <div className="w-full h-14 flex gap-5 items-center border-b-2">
          <img src={raj} className="w-10 h-10 rounded-full" alt="" />
          <input
            type="text"
            placeholder="Add a comment..."
            className={`w-full h-14 border-b-5 px-5 text-lg outline-none ${
              state.theme === 'dark' ? 'bg-transparent text-white' : 'bg-gray-100 text-black'
            }`}
          />
          <button
            className={`border-none text-lg flex justify-center items-center p-1 gap-3 px-4 rounded-full ${
              state.theme === 'dark' ? 'bg-[#2e71ba] text-white' : 'bg-blue-500 text-black'
            }`}
          >
            Comment
          </button>
        </div>
      </div>

      {/* User Comments */}
      <div className="w-full h-fit flex flex-col gap-5">
        {commentARRAY.map((item, index) => (
          <div
            key={index}
            className={`w-full flex items-start gap-5 ${getTextClass(state.theme)}`}
          >
            <img src={raj} className="w-10 h-10 rounded-full" alt="" />
            <div className="w-full flex flex-col gap-2">
              <h1>
                Raj{' '}
                <span className="text-gray-400">
                  1 day ago
                </span>
              </h1>
              <p>yeh he mera COMMENT</p>
              <div className="flex gap-5">
                <i className="fa-solid fa-thumbs-up"></i>
                <i className="fa-solid fa-share"></i>
                <i className="fa-solid fa-thumbs-down"></i>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Left;
