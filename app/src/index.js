import React from "react";
import Main from "./pages/Main";
import colors from "../assets/styles/colorVariables";
import { ThemeProvider } from "react-native-elements";

export default function Root() {
  const theme = {
    colors: {
      primary: colors.primary,
      error: colors.danger,
      warning: colors.secondary
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  );
}
