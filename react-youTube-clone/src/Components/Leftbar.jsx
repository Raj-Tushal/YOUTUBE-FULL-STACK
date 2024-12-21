import React, { useContext } from 'react';
import myContext from '../Store/context';
import { Link } from 'react-router-dom';

function Leftbar() {
  const { dispatch, state } = useContext(myContext);

  // Leftbar handler
  function leftbarhandler() {
    dispatch({ type: 'ultaKardo' });
  }

  return (
    <div
      className={`h-full ${state.isLeftNavbarOpen ? 'absolute z-[100]' : 'absolute z-[100]'}`}
    >
      <div
        className={`h-full w-[250px] px-5 py-5 ${
          state.theme === 'dark' ? 'bg-[#0f0f0f]  text-white' : 'bg-white text-black'
        } flex flex-col gap-5 overflow-y-scroll`}
        style={{
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE & Edge
        }}
      >
        {/* Items */}
        <Link to={'/'}><Baritem theme={state.theme} icon={<i className="fa-solid fa-house"></i>} option="Home"  /></Link>
        <Baritem theme={state.theme} icon={<i className="fa-solid fa-fire"></i>} option="Trending" />
        <Baritem theme={state.theme} icon={<i className="fa-solid fa-bell"></i>} option="Notifications" />
        <Baritem theme={state.theme} icon={<i className="fa-solid fa-bookmark"></i>} option="Library" />
        <Baritem theme={state.theme} icon={<i className="fa-solid fa-thumbs-up"></i>} option="Liked Videos" />
        <Baritem theme={state.theme} icon={<i className="fa-solid fa-video"></i>} option="Your Videos" />
        <Baritem theme={state.theme} icon={<i className="fa-solid fa-user"></i>} option="Subscriptions" />
        <Baritem theme={state.theme} icon={<i class="fa-solid fa-toggle-on"></i>} option="Dark/Light" onClick={() => dispatch({type:"TOGGLE_THEME"})} />
        {/* Sign-in Button */}
        <div className="w-full py-5 flex flex-col gap-3 border-b-2 border-t-2 border-gray-600 justify-center items-start">
          <p className="text-md">Sign in to like videos, comment, and subscribe.</p>
          <Link to={'/signUp'} onClick={leftbarhandler}>
            <button
              className={`border-2 border-gray-600 hover:bg-[rgba(100,160,216,0.2)] ${
                state.theme === 'dark' ? 'text-white' : 'text-black'
              } text-lg flex justify-center items-center p-2 gap-3 px-4 rounded-full`}
            >
              <i className="fa-solid fa-user"></i>
              <p>Sign in</p>
            </button>
          </Link>
        </div>

        <h1 className="text-xl font-bold">Explore</h1>
        <Baritem theme={state.theme} icon={<i className="fa-solid fa-fire"></i>} option="Trending" />
        <Baritem theme={state.theme} icon={<i className="fa-solid fa-compass"></i>} option="Explore" />
      </div>
    </div>
  );
}

export default Leftbar;

export function Baritem({ theme, onClick, icon, option }) {
  return (
    <div
      className={`h-12 w-full flex gap-5 text-lg ${
        theme === 'dark' ? 'text-white' : 'text-black'
      } justify-start items-center`}
      onClick={onClick}
    >
      {/* Render icon directly as JSX */}
      {icon}
      <h1>{option}</h1>
    </div>
  );
}
