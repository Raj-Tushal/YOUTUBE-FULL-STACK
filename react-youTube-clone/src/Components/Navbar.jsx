import React, { useContext } from 'react';
import logo from '../assets/logo.png';
import raj from '../assets/raj.jpg';
import myContext from '../Store/context';
import darkLogo from '../assets/darkLogo.png';
import { Link } from 'react-router-dom';
function Navbar() {
  const { dispatch, state } = useContext(myContext);

  return (
    <>
      <div
        className={`w-full h-[70px] ${
          state.theme === 'dark' ? 'text-white bg-[#0f0f0f] ' : 'text-black bg-white'
        } flex justify-between items-center px-10`}
      >
        {/* Left */}
        <div className="h-full w-fit py-5 flex gap-7 px-2 items-center justify-center">
        <i
  className={`fa-solid fa-bars text-[22px] ${
    state.theme === 'dark' ? 'text-white' : 'text-black'
  }`}
  onClick={() => {
    dispatch({ type: 'ultaKardo' });
  }}
></i>

          <Link to={'/'}>
          {state.theme === 'dark'?
           <img src={logo} alt="Logo" className="w-[120px]" />
         :
        
         <img src={darkLogo} alt="Logo" className="w-[120px]" />}</Link>
        </div>

        {/* Middle */}
        <div
  className={`w-1/2 h-12 flex justify-between pr-10 items-center border-2 gap-7 border-gray-600 text-xl rounded-full ${
    state.theme === 'dark' ? 'bg-[#0f0f0f] ' : 'bg-white'
  }`}
>
         <input
  type="text"
  placeholder="search"
  className={`w-full h-full p-5 text-start rounded-r-none rounded-full bg-[#0f0f0f]  ${
    state.theme === 'dark' ? 'text-white bg-[#0f0f0f] ' : 'text-black bg-white'
  }`}
/>

          <div className={` ${
    state.theme === 'dark' ? 'text-white ' : 'text-black '
  }`}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>

        {/* Right */}
        <div>
          <img src={raj} alt="User" className="w-10 h-10 rounded-full" />
        </div>
      </div>
    </>
  );
}

export default Navbar;
