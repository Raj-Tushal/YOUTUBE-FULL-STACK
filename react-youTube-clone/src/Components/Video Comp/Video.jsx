import React from "react";
import Navbar from "../Navbar";
import raj from "../../assets/raj.jpg";
import Leftbar from "../Leftbar";
import { useContext } from "react";
import myContext from "../../Store/context";
import VideoHome from "./VideoHome";
function Video() {
  const {state}= useContext(myContext);
  const commentARRAY = [
    1,2,3,4,5,6,7,8,9
  ]
  return (
    <div className="relative overflow-hidden">
      {/* <Navbar /> */}
    {/* {!state.isLeftBarOpen?(
      <div className="w-full h-full absolute z-[3] ">
      <Leftbar/>
    </div>
    ):<></>} */}
 
            {/* overlay */}
           
      
    <VideoHome />
      </div>
  );
}

export default Video;
