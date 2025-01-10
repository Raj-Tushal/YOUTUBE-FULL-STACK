import  { useContext,useState } from "react";
import logo from "../assets/logo.png";
import myContext from "../Store/context";
import darkLogo from "../assets/darkLogo.png";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { signOutWithGoogle } from "../utils";
import Upload from "./Upload.jsx";
import { useNavigate } from 'react-router-dom';





function Navbar() {
  const navigate = useNavigate();
  const { dispatch, state,authState,authDispatch } = useContext(myContext);

  const [q,setQ] = useState("");



  const navbarClasses = classNames(
    "w-full h-[70px] flex justify-between items-center px-10",
    {
      "text-white bg-[#0f0f0f]": state.theme === "dark",
      "text-black bg-white": state.theme !== "dark",
    }
  );

  const menuIconClasses = classNames("fa-solid fa-bars text-[22px]", {
    "text-white": state.theme === "dark",
    "text-black": state.theme !== "dark",
  });

  const searchBarClasses = classNames(
    "w-1/2 h-12 flex justify-between pr-10 items-center border-2 gap-7 border-gray-600 text-xl rounded-full",
    {
      "bg-[#0f0f0f]": state.theme === "dark",
      "bg-white": state.theme !== "dark",
    }
  );

  const inputClasses = classNames(
    "w-full h-full p-5 text-start rounded-r-none rounded-full",
    {
      "text-white bg-[#0f0f0f]": state.theme === "dark",
      "text-black bg-white": state.theme !== "dark",
    }
  );

  const searchIconClasses = classNames({
    "text-white": state.theme === "dark",
    "text-black": state.theme !== "dark",
  });

  const btnClasses = classNames(
    "border-2 border-gray-600 hover:bg-[rgba(100,160,216,0.2)] text-lg flex justify-center items-center p-2 gap-3 px-4 rounded-full",
    {
      "text-white": state.theme === "dark",
      "text-black": state.theme !== "dark",
    }
  );

  const handleGoogleLogOut = () => {
    signOutWithGoogle()
    .then(() => {
      // console.log("signed out");
      alert("Signed out successfully")
      authDispatch({type:"logout"})
    })
    .catch((error) => {
      console.log(error);
    });
  }

  // for uplaoding the video
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className={navbarClasses}>
        {/* Left */}
        <div className="h-full w-fit py-5 flex gap-7 px-2 items-center justify-center">
          <i
            className={menuIconClasses}
            onClick={() => {
              dispatch({ type: "ultaKardo" });
            }}
          ></i>

          <Link to={"/"}>
            {state.theme === "dark" ? (
              <img src={logo} alt="Logo" className="w-[120px]" />
            ) : (
              <img src={darkLogo} alt="Logo" className="w-[120px]" />
            )}
          </Link>
        </div>

        {/* Middle */}
        <div className={searchBarClasses}>
          <input type="text" placeholder="search" className={inputClasses} onChange={(e)=>{setQ(e.target.value)}} />
          <div className={searchIconClasses} onClick={()=>{navigate(`/search/${q}`)}}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>

        {/* Right */}
        <div>
          {/* <img src={raj} alt="User" className="w-10 h-10 rounded-full" /> */}

          {authState.currentUser ? (
           <div className="flex gap-5 items-center ">
           <button onClick={() => setOpen(true)}> <i class="fa-solid fa-upload"></i></button>
             <img src={authState.currentUser.img} alt="User" className="w-10 h-10 rounded-full" /> 
           <Link to="/signUp">
           <button onClick={handleGoogleLogOut}>Logout</button>
           </Link>
           </div>
          ):
          (
            <Link to="/signUp">
              <button className={btnClasses}>Login</button>
            </Link>
          )
          }
        </div>
      </div>

      {open && <Upload setOpen={setOpen}/>}
    </>
  );
}

export default Navbar;
