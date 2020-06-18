import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Icon,CheckBox } from "react-native-elements";
import styles from "./styles";
import Container from "../../../components/Container";
import TermsModal from "../../../components/modals/conditionTermsModal";
import PrivacyPolicyModal from "../../../components/modals/privacyPolicyModal"
import Buttom from "../../../components/UI/button"
export default function Photo({ route, navigation }) {
  const { userData } = route.params;

  const [selectedImage, setSelectedImage] = useState(null);
  const [photo, setPhoto] = useState("");
  const [termsModalVisible, setTermsModalVisible] = useState(false);
  const [checked, setChecked] = useState(false);
  const [privacyModalVisible, setPrivacyModalVisible] = useState(false);

  async function openImagePickerAsync() {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("É preciso permissão para acesso a câmera!");
      return;
    }

    const pickerResult = await ImagePicker.launchCameraAsync({
      base64: true,
      allowsEditing: true,
      quality: 0.5,
    });
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({
      localUri: pickerResult.uri,
    });

    setPhoto(pickerResult.base64);
  }

  async function cancelHandler() {
    setSelectedImage(null);
    setPhoto("");
  }
  async function continueHandler() {
    const newUserData = {
      photo,
      ...userData,
    };
    navigation.navigate("riskGroup", { userData: newUserData });
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
          
            
            <View style={styles.checkboxView}>
              <View>
                <TouchableOpacity
                  onPress={() => setTermsModalVisible(true)}
                >
                  <Text style={styles.hyperLink}>Termos de Uso</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setPrivacyModalVisible(true)}
                >
                  <Text style={styles.hyperLink}>Políticas de privacidade</Text>
                </TouchableOpacity>
              </View>
              <CheckBox
                title=" Li e concordo com os termos acima"
                style={styles.checkbox}
                iconRight
                checked={checked}
                onPress={() => setChecked(!checked)}
                onIconPress={() => setChecked(!checked)}
              />
            </View>
            
          
          <View style={styles.buttonPreview}>
              <Buttom
                title="Voltar"
                type="notSelected"
                press={() => {
                  cancelHandler();
                }}
              />
            <Buttom
              disabled={!checked}
              title="Continuar"
              press={() => {
                continueHandler();
              }}
            />
          </View>
          <TermsModal
            visible={termsModalVisible}
            setVisible={setTermsModalVisible}
          />
          <PrivacyPolicyModal 
            visible={privacyModalVisible} 
            setVisible={setPrivacyModalVisible} 
          />
        </View>
      )}
    </View>
  );
}
