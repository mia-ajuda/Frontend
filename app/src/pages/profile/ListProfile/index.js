import React, { useContext, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  ImageBackground,
  TouchableOpacity,
  Alert
} from "react-native";
import styles from "./styles";
import Button from "../../../components/UI/button";
import { UserContext } from "../../../store/contexts/userContext";
import actions from "../../../store/actions";
import UserService from "../../../services/User";
import moment from "moment";
import { Icon } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import ConfirmationModal from "../../../components/modals/confirmationModal";

export default function Profile({ navigation }) {
  const { user, dispatch } = useContext(UserContext);
  const profilePhoto = user.photo.includes("http")
    ? { uri: user.photo } // google+ or facebook
    : { uri: `data:image/png;base64,${user.photo}` }; //base64
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [photo, setPhoto] = useState("");

  function formatCPF(cpf) {
    if (cpf.length !== 11) {
      return "";
    }

    return `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(
      6,
      9
    )}-${cpf.slice(9, 11)}`;
  }

  function formatPhone(phone) {
    if (phone.length === 13) {
      return `(${phone.slice(3, 5)}) ${phone.slice(5, 9)}-${phone.slice(
        9,
        14
      )}`;
    }

    return `(${phone.slice(3, 5)}) ${phone.slice(5, 10)}-${phone.slice(
      10,
      14
    )}`;
  }

  async function logout() {
    await UserService.logOut();
    dispatch({ type: actions.user.removeUserInfo });
  }

  function handleEdit(attribute) {
    navigation.navigate("EditProfile", {
      attribute,
      user
    });
  }

  async function openImagePickerAsync() {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("É preciso permissão para acesso a câmera!");
      return;
    }

    const pickerResult = await ImagePicker.launchCameraAsync({
      base64: true,
      allowsEditing: true,
      quality: 0.5
    });
    if (pickerResult.cancelled === true) {
      return;
    }

    setSelectedImage({
      localUri: pickerResult.uri
    });

    setPhoto(pickerResult.base64);
    setModalVisible(true);
  }

  const sendPhoto = async () => {
    try {
      setLoadingModal(true);
      const resp = await UserService.editUser({
        ...user,
        photo: photo
      });
      dispatch({ type: actions.user.storeUserInfo, data: resp });
      setLoadingModal(false);
      setModalVisible(false);
      Alert.alert(
        "Sucesso",
        "Foto atualizada com sucesso!",
        [{ text: "OK", onPress: () => {} }],
        {
          cancelable: false
        }
      );
    } catch (err) {
      setLoadingModal(false);
      setModalVisible(false);
      console.log(err.data);
      Alert.alert(
        "Ooops..",
        err.error || "Algo deu errado, tente novamente mais tarde",
        [{ text: "OK", onPress: () => {} }],
        {
          cancelable: false
        }
      );
    }
  };

  async function cancelHandler() {
    setSelectedImage(null);
    setPhoto("");
  }

  return (
    <ScrollView style={styles.container}>
      <ConfirmationModal
        visible={isModalVisible}
        setVisible={setModalVisible}
        action={sendPhoto}
        message={"Tem certeza que deseja trocar sua foto?"}
        isLoading={loadingModal}
      />
      <View style={styles.imageView}>
        <TouchableOpacity onPress={openImagePickerAsync}>
          <ImageBackground
            source={profilePhoto}
            style={styles.imageProper}
            imageStyle={{
              borderRadius: 100,
              opacity: 0.5,
              backgroundColor: "#000"
            }}
          >
            <Icon size={45} name={"camera-alt"} color="black" />
          </ImageBackground>
        </TouchableOpacity>
      </View>
      <View style={styles.viewContent}>
        <View style={styles.viewInput}>
          <Text style={styles.labelInput}>Nome Completo</Text>
          <TouchableOpacity onPress={() => handleEdit("name")}>
            <View style={styles.inputWrapper}>
              <Text style={styles.textInput}>{user.name}</Text>
              <Icon size={25} name="edit" color="#000" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.labelInput}>Data de Nascimento</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.textInput}>
              {moment(user.birthday).format("DD/MM/YYYY")}
            </Text>
          </View>
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.labelInput}>E-mail</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.textInput}>{user.email}</Text>
          </View>
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.labelInput}>CPF</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.textInput}>{formatCPF(user.cpf)}</Text>
          </View>
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.labelInput}>Telefone</Text>
          <TouchableOpacity onPress={() => handleEdit("phone")}>
            <View style={styles.inputWrapper}>
              <Text style={styles.textInput}>{formatPhone(user.phone)}</Text>
              <Icon size={25} name="edit" color="#000" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.labelInput}>CEP</Text>
          <TouchableOpacity onPress={() => handleEdit("cep")}>
            <View style={styles.inputWrapper}>
              <Text style={styles.textInput}>{user.address.cep}</Text>
              <Icon size={25} name="edit" color="#000" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            style={styles.buttonExit}
            large
            press={() => {
              logout();
            }}
            title="sair"
          />
        </View>
      </View>
    </ScrollView>
  );
}
