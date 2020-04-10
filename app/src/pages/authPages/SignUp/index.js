import React, { useContext } from "react";

import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import { UserContext } from "../../../store/contexts/userContext";
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';

export default function SignUp({ navigation }) {
  const { user } = useContext(UserContext);

  async function getPushNotificationPermissions() {

    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      return;
    }

    console.log('blah')
    const token = await Notifications.getExpoPushTokenAsync()

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('chat-messages', {
        name: 'Chat messages',
        sound: true,
      });
    }

    console.log(token)
    return token;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SignUp page </Text>
      <Text style={styles.title}>SignUp page </Text>
      <Text style={styles.title}>SignUp page </Text>
      <Text style={styles.title}>SignUp page </Text>
      <Text style={styles.title}>SignUp page </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("photo");
          console.log(user);
        }}
      >
        <Text style={styles.button}>NEXT PAGE</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.button}>Back</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => getToken()}>
        <Text style={styles.button}>Token</Text>
      </TouchableOpacity>
      <Text>{getPushNotificationPermissions()}</Text>
    </View>
  );
}
