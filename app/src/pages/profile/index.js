import React, { useContext } from "react";
import { View, ScrollView, Image, Text } from "react-native";
import styles from "./styles";
import Button from "../../components/UI/button";
import { UserContext } from "../../store/contexts/userContext";
import actions from "../../store/actions";
import UserService from "../../services/User";

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
        <Image source={profilePhoto} style={styles.imageProper} />
      </View>
      <View style={styles.viewContent}>
        <View style={styles.viewInput}>
          <Text style={styles.labelInput}>Nome Completo</Text>
          <View style={styles.inputWrapper}>
            <Text>{user.name}</Text>
          </View>
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.labelInput}>Idade</Text>
          <View style={styles.inputWrapper}>
            <Text>{user.birthday}</Text>
          </View>
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.labelInput}>E-mail</Text>
          <View style={styles.inputWrapper}>
            <Text>{user.name}</Text>
          </View>
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.labelInput}>CPF</Text>
          <View style={styles.inputWrapper}>
            <Text>{user.cpf}</Text>
          </View>
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.labelInput}>Telefone</Text>
          <View style={styles.inputWrapper}>
            <Text>{user.cpf}</Text>
          </View>
        </View>
        <View style={styles.viewInput}>
          <Text style={styles.labelInput}>CEP</Text>
          <View style={styles.inputWrapper}>
            <Text>{user.address.cep}</Text>
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
