import React from 'react';
import { useContext } from 'react';
import raj from '../../assets/raj.jpg';
import Leftbar from '../Leftbar';
import myContext from '../../Store/context';
import Left from './left';
import Right from './right';

function VideoHome() {
  const commentARRAY = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const { state } = useContext(myContext);

  return (
    <div className={`w-screen h-[calc(100vh-70px)] ${state.theme === 'dark' ? 'bg-[#0f0f0f]' : 'bg-[#ffffff]'} flex overflow-y-auto relative z-[1]`}>
      {/* Left */}
      <Left />

      {/* Right */}
      <Right />
    </div>
  );
}

export default VideoHome;
