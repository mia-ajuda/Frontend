import React from "react";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Icon } from "react-native-elements";
import styles from "./styles";

export default function App() {
  let [selectedImage, setSelectedImage] = React.useState(null);

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../../../images/catPhoto.png")}
      style={styles.logo}
    >
      <View style={styles.textView}>
        <Text style={styles.text}>
          Também precisamos de uma foto sua, é só clicar na camêra aqui em
          baixo!
        </Text>
      </View>
      <View style={styles.btnView}>
        <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
          <Icon name={"camera-alt"} color="gray" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
