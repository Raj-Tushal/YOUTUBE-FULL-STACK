import React from 'react'
import { useContext,useReducer } from 'react'
import myContext from './context'

const reducer = (state,action)=>{
  switch (action.type) {
    case "ultaKardo":
      return { ...state, isLeftBarOpen: !state.isLeftBarOpen, };
      case "sideBarKoHata":
      return {...state,isHomePage:!state.isHomePage,};
      case "TOGGLE_THEME":
        return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    default:
      return state;
  }
}
function store({children}) {
  const initialState = {
    isLeftBarOpen:false,
    isHomePage:true,
    theme: "light", 
  };
    const [state, dispatch] = useReducer(reducer, initialState);
  return (
   <>
   <myContext.Provider value={{state,dispatch}}>
    {children}
   </myContext.Provider>
   </>
  )
}

export default store;