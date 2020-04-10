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
import Container from "../../../components/Container";

export default function App({ route, navigation }) {
  let [selectedImage, setSelectedImage] = React.useState(null);
  let [photo, setPhoto] = React.useState("");
  const { userData } = route.params;

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      base64: true,
    });
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({
      localUri: pickerResult.uri,
    });

    setPhoto({
      photo: pickerResult.base64,
    });
  };

  const cancelHandler = () => {
    setSelectedImage(null);
    setPhoto("");
  };

  const continueHandle = () => {
    const data = { ...userData, ...photo };
    console.log(data);
    navigation.navigate("location", { userData: data });
  };

  return (
    <View style={styles.container}>
      {selectedImage === null ? (
        <ImageBackground
          source={require("../../../images/catPhoto.png")}
          style={styles.logo}
        >
          <Container>
            <View style={styles.textView}>
              <Text style={styles.text}>
                Também precisamos de uma foto sua, é só clicar na camêra aqui em
                baixo!
              </Text>
            </View>
            <View style={styles.btnView}>
              <TouchableOpacity
                onPress={openImagePickerAsync}
                style={styles.button}
              >
                <Icon name={"camera-alt"} color="gray" />
              </TouchableOpacity>
            </View>
          </Container>
        </ImageBackground>
      ) : (
        <View style={styles.container}>
          <Image
            source={{ uri: selectedImage.localUri }}
            style={styles.thumbnail}
          />
          <View style={styles.selectText}>
            <Text style={styles.text}>
              Gostou da foto ? Agora vamos continuar seu cadastro!!
            </Text>
          </View>
          <View style={styles.buttonPreview}>
            <TouchableOpacity onPress={cancelHandler} style={styles.btn}>
              <Text style={styles.btnText}>Voltar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btn1} onPress={continueHandle}>
              <Text style={styles.btnText1}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
