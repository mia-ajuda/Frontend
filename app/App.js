import React, { useEffect, useState } from "react";
import { View } from "react-native";
import Root from "./src/index";
import loadFonts from "./assets/styles/loadFonts";
export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    async function fetchFonts() {
      await loadFonts();
      setFontsLoaded(true);
    }
    fetchFonts();
  }, []);
  if (!fontsLoaded) return <View />;

  return <Root />;
}
