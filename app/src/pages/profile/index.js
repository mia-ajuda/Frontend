import React, { useContext } from "react";
import { View, ScrollView, Image, Text, ImageBackground } from "react-native";
import styles from "./styles";
import Button from "../../components/UI/button";
import { UserContext } from "../../store/contexts/userContext";
import actions from "../../store/actions";
import UserService from "../../services/User";
import moment from "moment";
import { Icon } from "react-native-elements";

export default function Profile() {
  const { user, dispatch } = useContext(UserContext);
  const profilePhoto = user.photo.includes("http")
    ? { uri: user.photo } // google+ or facebook
    : { uri: `data:image/png;base64,${user.photo}` }; //base64

  async function logout() {
    await UserService.logOut();
    dispatch({ type: actions.user.removeUserInfo });
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
          <View style={styles.inputWrapper}>
            <Text style={styles.textInput}>{user.name}</Text>
            <Icon size={25} name="edit" color="#000"/>
          </View>
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.labelInput}>Data de Nascimento</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.textInput}>{moment(user.birthday).format("DD/MM/YYYY")}</Text>
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
            <Text style={styles.textInput}>{user.cpf}</Text>
          </View>
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.labelInput}>Telefone</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.textInput}>{user.phone}</Text>
            <Icon size={25} name="edit" color="#000"/>
          </View>
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.labelInput}>CEP</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.textInput}>{user.address.cep}</Text>
            <Icon size={25} name="edit" color="#000"/>
          </View>
        </View>

        <Button
          style={styles.buttonExit}
          press={() => {
            logout();
          }}
          title="sair"
        />
      </View>
    </ScrollView>
  );
}
