import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";
import { ScrollView } from "react-native-gesture-handler";

export default function Notification() {
  const [notifications, setNotifications] = useState([]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}> Notificações </Text>
      </View>

      {notifications.length > 0 ? (
        <ScrollView style={styles.notificationList}></ScrollView>
      ) : (
        <View style={styles.noNotifications}>
          <Image
            source={require("../../../assets/images/blueCat.png")}
            style={styles.emptyListImage}
          />
          <Text style={styles.emptyListText}>Você não possui notificações</Text>
        </View>
      )}
    </View>
  );
}
