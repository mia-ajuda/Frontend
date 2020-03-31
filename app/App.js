import React, { useEffect } from "react";
import Root from "./src/index";
import loadFonts from "./assets/styles/loadFonts";
export default function App() {
  useEffect(() => {
    loadFonts();
  }, []);
  return <Root />;
}
