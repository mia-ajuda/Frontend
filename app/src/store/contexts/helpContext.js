import React, { createContext, useReducer } from "react";
import helpReducer from "../reducers/helpReducer";

export const HelpContext = createContext();

export default function HelpContextProvider(props) {
  const [helpList, dispatch] = useReducer(helpReducer, []);

  return (
    <HelpContext.Provider value={{ helpList, dispatch }}>
      {props.children}
    </HelpContext.Provider>
  );
}
