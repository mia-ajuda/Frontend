import React, { useReducer, createContext } from "react";
import { userReducer } from "../reducers/userReducer";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, dispatch] = useReducer(userReducer);
  console.log("context");
  console.log(user);
  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};
