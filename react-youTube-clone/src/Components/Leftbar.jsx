import React, { useContext } from 'react';
import myContext from '../Store/context';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

function Leftbar() {
  const { dispatch, state,authState,authDispatch } = useContext(myContext);

  // Leftbar handler
  function leftbarhandler() {
    dispatch({ type: 'ultaKardo' });
  }

  // Class variables
  const containerClass = classNames('h-full', 'absolute z-[100]');
  const sidebarClass = classNames(
    'h-full w-[250px] px-5 py-5 flex flex-col gap-5 overflow-y-scroll',
    {
      'bg-[#0f0f0f] text-white': state.theme === 'dark',
      'bg-white text-black': state.theme !== 'dark',
    }
  );
  const buttonClass = classNames(
    'border-2 border-gray-600 hover:bg-[rgba(100,160,216,0.2)] text-lg flex justify-center items-center p-2 gap-3 px-4 rounded-full',
    {
      'text-white': state.theme === 'dark',
      'text-black': state.theme !== 'dark',
    }
  );
  const exploreTitleClass = 'text-xl font-bold';

  return (
    <div className={containerClass}>
      <div
        className={sidebarClass}
        style={{
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE & Edge
        }}
      >
        {/* Items */}
        <Link to={'/'}>
          <Baritem
            theme={state.theme}
            icon={<i className="fa-solid fa-house"></i>}
            option="Home"
          />
        </Link>
        <Link to={'/trend'}>
          <Baritem
            theme={state.theme}
            icon={<i className="fa-solid fa-fire"></i>}
            option="Trending"
          />
        </Link>
        <Baritem
          theme={state.theme}
          icon={<i className="fa-solid fa-bell"></i>}
          option="Notifications"
        />
        <Baritem
          theme={state.theme}
          icon={<i className="fa-solid fa-bookmark"></i>}
          option="Library"
        />
        <Baritem
          theme={state.theme}
          icon={<i className="fa-solid fa-thumbs-up"></i>}
          option="Liked Videos"
        />
        <Baritem
          theme={state.theme}
          icon={<i className="fa-solid fa-video"></i>}
          option="Your Videos"
        />
        <Link to={'/sub'}>
          <Baritem
            theme={state.theme}
            icon={<i className="fa-solid fa-user"></i>}
            option="Subscriptions"
          />
        </Link>
        <Baritem
          theme={state.theme}
          icon={<i className="fa-solid fa-toggle-on"></i>}
          option="Dark/Light"
          onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
        />
        {/* Sign-in Button */}
       {!authState.currentUser ? (
         <div className="w-full py-5 flex flex-col gap-3 border-b-2 border-t-2 border-gray-600 justify-center items-start">
         <p className="text-md">Sign in to like videos, comment, and subscribe.</p>
         <Link to={'/signUp'} onClick={leftbarhandler}>
           <button className={buttonClass}>
             <i className="fa-solid fa-user"></i>
             <p>Sign in</p>
           </button>
         </Link>
       </div>
       ): (
       <></>
       )}

        <h1 className={exploreTitleClass}>Explore</h1>
        <Baritem
          theme={state.theme}
          icon={<i className="fa-solid fa-fire"></i>}
          option="Trending"
        />
        <Baritem
          theme={state.theme}
          icon={<i className="fa-solid fa-compass"></i>}
          option="Explore"
        />
      </div>
    </div>
  );
}

export default Leftbar;

export function Baritem({ theme, onClick, icon, option }) {
  const barItemClass = classNames(
    'h-12 w-full flex gap-5 text-lg justify-start items-center',
    {
      'text-white': theme === 'dark',
      'text-black': theme !== 'dark',
    }
  );

  return (
    <div className={barItemClass} onClick={onClick}>
      {/* Render icon directly as JSX */}
      {icon}
      <h1>{option}</h1>
    </div>
  );
}
