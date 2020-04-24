import React from "react";
import { View, Text, Image } from "react-native";

import styles from "./styles";

export default function NotificationCard() {
  return (
    <View style={styles.cardContainer}>
      <Image
        source={require("../../../assets/images/blueLogo.png")}
        style={styles.notificationImage}
      />

      <View style={styles.info}>
        <Text style={styles.title}> userName te ofereceu ajuda </Text>
        <Text> Confira o perfil de userName </Text>
        <Text style={styles.time}> Time </Text>
      </View>
    </View>
  );
}
