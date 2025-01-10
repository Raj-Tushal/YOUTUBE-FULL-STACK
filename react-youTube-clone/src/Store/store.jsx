import { useReducer } from "react";
import myContext from "./context";

const reducer = (state, action) => {
  switch (action.type) {
    case "ultaKardo":
      return { ...state, isLeftBarOpen: !state.isLeftBarOpen };
    case "sideBarKoHata":
      return { ...state, isHomePage: !state.isHomePage };
    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    default:
      return state;
  }
};

const videoReducer = (state, action) => {
  switch (action.type) {
    case "SET_RANDOM_VIDEOS":
      return { ...state, randomVideos: action.payload };
    case "SET_VIDEO":
      return { ...state, currentVideo: action.payload };
    case "SET_CHANNEL":
      return { ...state, channel: action.payload };
      case "SET_QUERY_VIDEOS":
        return { ...state, queryVideos: action.payload };
        case "SET_TREND_VIDEOS":
      return { ...state, trendVideos: action.payload };
    case "LIKE":
      return {
        ...state,
        currentVideo: {
          ...state.currentVideo,
          likes: state.currentVideo.likes.includes(action.payload)
            ? state.currentVideo.likes.filter((id) => id !== action.payload) // Remove if already liked
            : [...state.currentVideo.likes, action.payload], // Add if not liked
          dislikes: state.currentVideo.dislikes.filter((id) => id !== action.payload), // Remove from dislikes if present
        },
      };
    case "DISLIKE":
      return {
        ...state,
        currentVideo: {
          ...state.currentVideo,
          dislikes: state.currentVideo.dislikes.includes(action.payload)
            ? state.currentVideo.dislikes.filter((id) => id !== action.payload) // Remove if already disliked
            : [...state.currentVideo.dislikes, action.payload], // Add if not disliked
          likes: state.currentVideo.likes.filter((id) => id !== action.payload), // Remove from likes if present
        },
      };
      case "SET_COMMENTS":
      return { ...state, comments: action.payload };
      case "ADD_COMMENT":
  return {
    ...state,
    comments: [action.payload, ...state.comments], // Add the new comment to the beginning of the array
  };

    default:
      return state;
  }
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "loginStart":
      return { ...state, currentUser: state.currentUser, loading: true };

    case "loginSuccess":
      localStorage.setItem("currentUser", JSON.stringify(action.payload)); // Persist user
      return { ...state, currentUser: action.payload, loading: false };

    case "loginFailure":
      return { ...state, error: true, loading: false };

    case "logout":
      localStorage.removeItem("currentUser"); // Clear user
      return { ...state, currentUser: null, loading: false, error: false };

    case "SUBSCRIBE": {
      const updatedUser = {
        ...state.currentUser,
        subscribedChannels: [...state.currentUser.subscribedChannels, action.payload],
      };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser)); // Persist updated user
      return { ...state, currentUser: updatedUser };
    }

    case "UNSUBSCRIBE": {
      const updatedUser = {
        ...state.currentUser,
        subscribedChannels: state.currentUser.subscribedChannels.filter(
          (channelId) => channelId !== action.payload
        ),
      };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser)); // Persist updated user
      return { ...state, currentUser: updatedUser };
    }

    default:
      return state;
  }
};


function Store({ children }) {
  const initialState = {
    isLeftBarOpen: false,
    isHomePage: true,
    theme: "light",
  };

  const videoInitialState = {
    randomVideos: [],
    queryVideos: [],
    currentVideo: {},
    trendVideos: [],
    channel: {},
    subscriptions: [], // To store subscribed channels
    comments: [],
  };

  const authInitialState = {
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || null, // Load from localStorage
    loading: false,
    error: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [videoState, videoDispatch] = useReducer(videoReducer, videoInitialState);
  const [authState, authDispatch] = useReducer(authReducer, authInitialState);

  return (
    <myContext.Provider
      value={{ state, dispatch, videoState, videoDispatch, authState, authDispatch }}
    >
      {children}
    </myContext.Provider>
  );
}

export default Store;
