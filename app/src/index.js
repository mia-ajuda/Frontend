import React, { useEffect } from 'react';
import Main from "./pages/Main";
import colors from "../assets/styles/colorVariables";
import { ThemeProvider } from "react-native-elements";
import Routes from "./routes";
import { Platform } from 'react-native';
import { UserContextProvider } from "./store/contexts/userContext";


export default function Root() {
  const theme = {
    colors: {
      primary: colors.primary,
      error: colors.danger,
      warning: colors.secondary,
    },
  };

  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  );
}
