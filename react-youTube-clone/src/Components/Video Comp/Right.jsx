import React, { useContext } from 'react';
import myContext from '../../Store/context';

const commentARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function Right() {
  const { state } = useContext(myContext);

  return (
    <div
      className={`w-auto h-fit px-2 py-2 gap-2 flex flex-col ${
        state.theme === 'dark' ? 'bg-[#0f0f0f]' : 'bg-[#ffffff]'
      }`}
    >
      {/* card */}
      {commentARRAY.map((item, index) => {
        return (
          <div
            key={index}
            className={`w-full h-fit py-1 flex items-center gap-2 ${
              state.theme === 'dark' ? 'text-white' : 'text-black'
            }`}
          >
            <img
              src="https://i.ytimg.com/vi/PJ3ZQk_lr9E/maxresdefault.jpg"
              className="rounded-xl h-[105px] w-[175px]"
              alt="Thumbnail"
            />

            {/* text */}
            <div className="flex flex-col justify-center">
              <h1
                className={`font-bold ${
                  state.theme === 'dark' ? 'text-white' : 'text-black'
                }`}
              >
                React Video Sharing App and Mystery Box UI Design
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
        );
      })}
    </div>
  );
}

export default Right;
