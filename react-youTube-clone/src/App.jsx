import React, { useContext } from "react";
import "./App.css";
import Navbar from "./Components/Navbar.jsx";
import Home from "./Components/Home.jsx";
import Store from "./Store/store.jsx";
import Video from "./Components/Video Comp/Video.jsx";
import Leftbar from "./Components/Leftbar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import myContext from "./Store/context.js";
import SignUp from "./Components/SignUp.jsx";

function App() {
  const { state } = useContext(myContext);
  return (
<div className={`h-full w-full relative ${
  state.isLeftBarOpen ? "overflow-y-hidden" : "overflow-y-scroll"
}`}>
      <BrowserRouter>
        <Navbar />
        {
              state.isLeftBarOpen?(
                <div className="w-full h-full absolute z-[2]  bg-[rgba(0,0,0,0.8)]"></div>
              ):<></>
            }
        <div className="flex">
          {state.isLeftBarOpen ? <Leftbar /> : <></>}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/video" element={<Video />} />
            <Route path="/signUp" element={<SignUp/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
