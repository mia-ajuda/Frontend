import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Icon } from "react-native-elements";
import styles from "./styles";
import Container from "../../../components/Container";
import uploadImageCloudinary from "../../../services/cloudinary";
import colors from "../../../../assets/styles/colorVariables";
import TermsModal from "../../../components/modals/conditionTermsModal";

export default function App({ route, navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [photo, setPhoto] = React.useState("");
  const [sendingPhotoToCloud, setSendingImageToCloud] = useState(false);
  const [termsModalVisible, setTermsModalVisible] = useState(false);
  console.log(termsModalVisible);
  // const { userData } = route.params;

  async function openImagePickerAsync() {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("É preciso permissão para acesso a câmera!");
      return;
    }

    const pickerResult = await ImagePicker.launchCameraAsync({
      base64: true,
      allowsEditing: true,
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
  }

  async function cancelHandler() {
    setSelectedImage(null);
    setPhoto("");
  }

  async function continueHandler() {
    setSendingImageToCloud(true);
    const photoUrl = await uploadImageCloudinary(photo);
    setSendingImageToCloud(false);

    const data = {
      ...userData,
      photo: photoUrl,
    };
    navigation.navigate("location", { userData: data });
  }

  return (
    <View style={styles.container}>
      {selectedImage === null ? (
        <ImageBackground
          source={require("../../../images/catPhoto.png")}
          style={styles.logo}
        >
          <Container>
            <View style={styles.backIcon}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name={"arrow-back"} color={"black"} />
              </TouchableOpacity>
            </View>
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
              Clique em continuar para prosseguir com o cadastro, ou voltar para
              escolher outra foto.
            </Text>
          </View>
          <TouchableOpacity
            style={{ flex: 1, margin: 16 }}
            onPress={() => setTermsModalVisible(true)}
          >
            <View
              style={{
                borderBottomColor: "#686868",
                borderBottomWidth: 1,
              }}
            />
            <Text style={styles.smallText}>
              Ao clicar em continuar você concorda com os
              <Text style={styles.hyperLink}> Termos de Uso </Text>e a
              <Text style={styles.hyperLink}> Política de Pivacidade</Text>.
            </Text>
            <View
              style={{
                borderBottomColor: "#686868",
                borderBottomWidth: 1,
              }}
            />
          </TouchableOpacity>
          <View style={styles.buttonPreview}>
            {sendingPhotoToCloud ? (
              <ActivityIndicator size="large" color={colors.primary} />
            ) : (
              <>
                <TouchableOpacity onPress={cancelHandler} style={styles.btn}>
                  <Text style={styles.btnText}>Voltar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn1} onPress={continueHandler}>
                  <Text style={styles.btnText1}>Continuar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
          <TermsModal
            visible={termsModalVisible}
            setVisible={setTermsModalVisible}
          />
        </View>
      )}
    </View>
  );
}
