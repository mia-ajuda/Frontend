import React from "react";
import Main from "./pages/Main";
import colors from "../assets/styles/colorVariables";
import { ThemeProvider } from "react-native-elements";
import Routes from "./routes";
import { UserContextProvider } from "./store/contexts/userContext";
import HelpContextProvider from "./store/contexts/helpContext";

export default function Root() {
  return (
    <HelpContextProvider>
      <UserContextProvider>
        <Routes />
      </UserContextProvider>
    </HelpContextProvider>
  );
}
