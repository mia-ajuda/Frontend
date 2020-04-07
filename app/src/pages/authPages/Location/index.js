import React from "react";

import { View, Text, TouchableOpacity, ToastAndroid, Alert } from "react-native";
import styles from "./styles";
import userService from '../../../services/User';

export default function Location({ route, navigation }) {

  const handleLocation = async() => {
    const { userData } =route.params;
    const newUserData = { 
      ...userData, 
      location: {
        type: "Point",
        coordinates:[ -49.255, -16.6799]
      },
      address: {
            cep: "72870336",
            number: 13,
            city: "Valparadise",
            state: "Goias"
        }
    }

    try {
      await userService.signUp(newUserData);

      Alert.alert(
        "Sucesso",
        "Usuário cadastrado com sucesso!",
        [
          {text: 'OK', onPress: () => {}},
        ],
        { cancelable: false }
      )
      navigation.navigate('login');
    } catch(err) {  
      Alert.alert(
        "Erro",
        "Erro ao cadastrar usuário. Tente novamente!",
        [
          {text: 'OK', onPress: () => {}},
        ],
        { cancelable: false }
      );
      
      navigation.navigate('login');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location page </Text>
      <Text style={styles.title}>Location page </Text>
      <Text style={styles.title}>Location page </Text>
      <Text style={styles.title}>Location page </Text>
      <Text style={styles.title}>Location page </Text>
      <TouchableOpacity onPress={handleLocation}>
        <Text style={styles.button}>REGISTER</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.button}>Back</Text>
      </TouchableOpacity> */}
    </View>
  );
}
