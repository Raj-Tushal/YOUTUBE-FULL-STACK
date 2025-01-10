import React, { useContext, useEffect } from "react";
import classNames from "classnames";
import myContext from "../Store/context";
import axios from "axios";
import { auth, signInWithGooglePopup } from "../utils";

const SignIn = () => {

const {authState,authDispatch} = useContext(myContext)
console.log(authState.currentUser,"--current user from sign in");
  const { state } = useContext(myContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

    // singinhandler email
  const handleSignIn = async (e) => {
    e.preventDefault(); // Fixed the typo
    authDispatch({type:"loginStart"})
    try {
      const res = await axios.post("http://localhost:8000/api/auth/sigIn", { email, password }); // Added protocol and fixed URL
      console.log(res.data,"user from sign in"); // Log response data
      authDispatch({type:"loginSuccess",payload:res.data})
    } catch (error) {
      authDispatch({type:"loginFailure"})
      console.log(error);
    }
  };

  // handleGoogleSignIn
const handleGoogleSignIn = async () => {
  try {
    await signInWithGooglePopup();
    // console.log("Response from google sign-in:", response);
    // console.log(auth.onAuthStateChanged,"onAuthStateChanged")
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
}

// for onauth state change
useEffect(()=>{
  // authDispatch({type:"loginStart"})
  auth.onAuthStateChanged(async(userData)=>{
    console.log(userData,"userdatabbbbbbb")
   await axios.post(`http://localhost:8000/api/auth/google`,{
        name:userData.displayName,
        email:userData.email,
        img:userData.photoURL
    }
    ).then((res)=>{
          console.log(res.data,"user from google singin")
      authDispatch({type:"loginSuccess",payload:res.data.user})
    }).catch((err)=>{
      authDispatch({type:"loginFailure"})
    })

  })
},[authDispatch])


// tailwind classes variables
  const themeClasses = {
    dark: {
      bg: "bg-[#0f0f0f]",
      card: "bg-gray-900",
      textPrimary: "text-white",
      textSecondary: "text-gray-400",
      inputBg: "bg-gray-700 text-white",
      buttonBg: "bg-blue-600 hover:bg-blue-700",
      socialButton: {
        google: "bg-red-600 hover:bg-red-700",
        facebook: "bg-blue-600 hover:bg-blue-700",
        github: "bg-gray-800 hover:bg-gray-900",
      },
    },
    light: {
      bg: "bg-gray-100",
      card: "bg-gray-200",
      textPrimary: "text-gray-800",
      textSecondary: "text-gray-600",
      inputBg: "bg-white text-black",
      buttonBg: "bg-blue-600 hover:bg-blue-700",
      socialButton: {
        google: "bg-red-600 hover:bg-red-700",
        facebook: "bg-blue-600 hover:bg-blue-700",
        github: "bg-gray-800 hover:bg-gray-900",
      },
    },
  };

  const theme = state.theme === "dark" ? themeClasses.dark : themeClasses.light;

  return (
    <div
      className={classNames(
        "w-full h-screen flex items-center justify-center",
        theme.bg
      )}
    >
      <div
        className={classNames(
          "w-96 h-auto rounded-lg pt-8 pb-8 px-8 flex flex-col items-center",
          theme.card
        )}
      >
        {/* Logo */}
        <label
          className={classNames("font-light text-4xl mb-4", theme.textPrimary)}
        >
          <span className="font-bold">
            <i className="fa-brands fa-youtube"></i>
          </span>
        </label>

        {/* Email Input */}
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className={classNames(
            "w-full h-12 rounded-lg px-4 text-lg focus:ring-blue-600 mb-4",
            theme.inputBg
          )}
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className={classNames(
            "w-full h-12 rounded-lg px-4 text-lg focus:ring-blue-600 mb-4",
            theme.inputBg
          )}
        />

        {/* Login Button */}
        <button onClick={handleSignIn}
          className={classNames(
            "w-full h-12 rounded-lg text-gray-200 uppercase font-semibold transition mb-4",
            theme.buttonBg
          )}
        >
          Sign Up
        </button>

        {/* Forgot Password */}
        <p
          className={classNames(
            "text-right w-full cursor-pointer mb-4 hover:text-gray-800",
            theme.textSecondary
          )}
        >
          Forgot password
        </p>

        {/* Divider */}
        <label
          className={classNames("text-gray-800 mb-4", theme.textSecondary)}
        >
          or
        </label>

        {/* Social Buttons */}
        <button
        onClick={handleGoogleSignIn}
          className={classNames(
            "w-full h-12 rounded-lg text-gray-200 uppercase font-semibold transition mb-4",
            theme.socialButton.google
          )}
        >
          Sign with Google
        </button>
        <button
          className={classNames(
            "w-full h-12 rounded-lg text-gray-200 uppercase font-semibold transition mb-4",
            theme.socialButton.facebook
          )}
        >
          Sign with Facebook
        </button>
        <button
          className={classNames(
            "w-full h-12 rounded-lg text-gray-200 uppercase font-semibold transition mb-4",
            theme.socialButton.github
          )}
        >
          Sign with Github
        </button>
      </div>
    </div>
  );
};

export default SignIn;
