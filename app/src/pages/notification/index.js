import React, { useState } from "react";
import { View, Text, Image } from "react-native";

import NotificationCard from "../../components/NotificationCard";

import styles from "./styles";

export default function Notification() {
  const [notifications, setNotifications] = useState([1, 2, 3, 4]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}> Notificações </Text>
      </View>

      {notifications.length > 0 ? (
        <View contentContainerStyle={styles.notificationList}>
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
        </View>
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
