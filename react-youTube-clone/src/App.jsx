import  { useContext } from "react";
import "./App.css";
import Navbar from "./Components/Navbar.jsx";
import Home from "./Components/Home.jsx";
import Video from "./Components/Video Comp/Video.jsx";
import Leftbar from "./Components/Leftbar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import myContext from "./Store/context.js";
import SignUp from "./Components/SignUp.jsx";
import Search from "./pages/Search.jsx";

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
            <Route index element={<Home type="random" />} />
            <Route path="/trend" element={<Home type="trend" />} />
            <Route path="/sub" element={<Home type="sub" />} />
            <Route path="/search/:query" element={<Search type="search" />} />
            <Route path="/video/:id" element={<Video  />} />
            <Route path="/signUp" element={<SignUp/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
