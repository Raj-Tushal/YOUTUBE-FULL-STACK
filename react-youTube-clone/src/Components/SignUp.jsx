import React, { useContext } from "react";
import myContext from "../Store/context";

const SignIn = () => {
  const { state } = useContext(myContext);
  
  return (
    <div
      className={`w-full h-screen flex items-center justify-center ${
        state.theme === "dark" ? "bg-[#0f0f0f] " : "bg-gray-100"
      }`}
    >
      <div
        className={`bg-gray-200 w-96 h-auto rounded-lg pt-8 pb-8 px-8 flex flex-col items-center ${
          state.theme === "dark" ? "bg-gray-900" : "bg-gray-200"
        }`}
      >
        {/* Logo */}
        <label
          className={`font-light text-4xl mb-4 ${
            state.theme === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          <span className="font-bold"><i class="fa-brands fa-youtube"></i></span>
        </label>

        {/* Email Input */}
        <input
          type="text"
          placeholder="Email"
          className={`w-full h-12 rounded-lg px-4 text-lg focus:ring-blue-600 mb-4 ${
            state.theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-black"
          }`}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className={`w-full h-12 rounded-lg px-4 text-lg focus:ring-blue-600 mb-4 ${
            state.theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-black"
          }`}
        />

        {/* Login Button */}
        <button
          className={`w-full h-12 rounded-lg ${
            state.theme === "dark" ? "bg-blue-600" : "bg-blue-600"
          } text-gray-200 uppercase font-semibold hover:bg-blue-700 transition mb-4`}
        >
          Sign Up
        </button>

        {/* Forgot Password */}
        <p
          className={`text-right w-full cursor-pointer mb-4 hover:text-gray-800 ${
            state.theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          Forgot password
        </p>

        {/* Divider */}
        <label
          className={`text-gray-800 mb-4 ${
            state.theme === "dark" ? "text-gray-400" : "text-gray-800"
          }`}
        >
          or
        </label>

        {/* Social Buttons */}
        <button
          className={`w-full h-12 rounded-lg ${
            state.theme === "dark" ? "bg-red-600" : "bg-red-600"
          } text-gray-200 uppercase font-semibold hover:bg-red-700 transition mb-4`}
        >
          Sign with Google
        </button>
        <button
          className={`w-full h-12 rounded-lg ${
            state.theme === "dark" ? "bg-blue-600" : "bg-blue-600"
          } text-gray-200 uppercase font-semibold hover:bg-blue-700 transition mb-4`}
        >
          Sign with Facebook
        </button>
        <button
          className={`w-full h-12 rounded-lg ${
            state.theme === "dark" ? "bg-gray-800" : "bg-gray-800"
          } text-gray-200 uppercase font-semibold hover:bg-gray-900 transition mb-4`}
        >
          Sign with Github
        </button>
      </div>
    </div>
  );
};

export default SignIn;
