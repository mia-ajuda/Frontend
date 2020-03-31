import * as Font from "expo-font";

export default function loadFonts() {
  Font.loadAsync({
    "montserrat-light": require("../fonts/Montserrat/Montserrat-Light.ttf"),
    "montserrat-regular": require("../fonts/Montserrat/Montserrat-Regular.ttf"),
    "montserrat-medium": require("../fonts/Montserrat/Montserrat-Medium.ttf"),
    "montserrat-semibold": require("../fonts/Montserrat/Montserrat-SemiBold.ttf")
  });
}
