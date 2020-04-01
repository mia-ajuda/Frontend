import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import Root from "./src/index";
import loadFonts from "./assets/fonts/loadFonts";
import { View } from "react-native";

export default function App() {
  const [fontsLoaded, setFonts] = useState(false);
  useEffect(() => {
    async function loadFontsAsync() {
      await loadFonts();
      setFonts(true);
    }
    loadFontsAsync();
  }, []);

  if (!fontsLoaded) return <View />;

  return <Root />;
}
