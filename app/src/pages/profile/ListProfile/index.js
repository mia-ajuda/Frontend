import React, { useContext } from "react";
import {
  View,
  ScrollView,
  Text,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import styles from "./styles";
import Button from "../../../components/UI/button";
import { UserContext } from "../../../store/contexts/userContext";
import actions from "../../../store/actions";
import UserService from "../../../services/User";
import moment from "moment";
import { Icon } from "react-native-elements";

export default function Profile({ navigation }) {
  const { user, dispatch } = useContext(UserContext);
  const profilePhoto = user.photo.includes("http")
    ? { uri: user.photo } // google+ or facebook
    : { uri: `data:image/png;base64,${user.photo}` }; //base64

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

  function handleEdit(attribute, value) {
    navigation.navigate("EditProfile", {
      attribute,
      value
    });
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageView}>
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
      </View>
      <View style={styles.viewContent}>
        <View style={styles.viewInput}>
          <Text style={styles.labelInput}>Nome Completo</Text>
          <TouchableOpacity onPress={() => handleEdit("name", user.name)}>
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
            <Text style={styles.textInput}>{user.name}</Text>
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
          <TouchableOpacity onPress={() => handleEdit("phone", user.phone)}>
            <View style={styles.inputWrapper}>
              <Text style={styles.textInput}>{formatPhone(user.phone)}</Text>
              <Icon size={25} name="edit" color="#000" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.labelInput}>CEP</Text>
          <TouchableOpacity onPress={() => handleEdit("cep", user.address.cep)}>
            <View style={styles.inputWrapper}>
              <Text style={styles.textInput}>{user.address.cep}</Text>
              <Icon size={25} name="edit" color="#000" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            style={styles.buttonExit}
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
