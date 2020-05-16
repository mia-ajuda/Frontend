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
      <View
        style={styles.imageView}
      >
        <Image
          source={profilePhoto}
          style={styles.imageProper}
        />
      </View>
      <View
        style={styles.viewContent}
      >
        <View>
          <Text>Nome Completo</Text>
          <View>
            <Text>{user.name}</Text>
          </View>
        </View>
        <View>
          <Text>Idade</Text>
          <View>
            <Text>{user.birthday}</Text>
          </View>
        </View>
        <View>
          <Text>E-mail</Text>
          <View>
            <Text>{user.name}</Text>
          </View>
        </View>
        <View>
          <Text>CPF</Text>
          <View>
            <Text>{user.cpf}</Text>
          </View>
        </View>
        <View>
          <Text>Telefone</Text>
          <View>
            <Text>{user.cpf}</Text>
          </View>
        </View>
        <View>
          <Text>CPF</Text>
          <View>
            <Text>{user.cpf}</Text>
          </View>
        </View>
       
        <Button
          press={() => {
            logout();
          }}
          title="sair"
        />
      </View>
    </ScrollView>
  );
}
