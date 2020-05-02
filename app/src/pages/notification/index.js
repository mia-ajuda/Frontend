import React, { useState, useContext, useEffect } from "react";
import { View, Text, Image, ScrollView } from "react-native";

import NotificationCard from "../../components/NotificationCard";
import { UserContext } from "../../store/contexts/userContext";
import NotificationService from "../../services/Notification";

import styles from "./styles";

export default function Notification() {
  const [notifications, setNotifications] = useState([]);
  const { user } = useContext(UserContext);

  const { _id: userId } = user;

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {
    try {
      setNotifications(await NotificationService.getAllNotifications(userId));
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}> Notificações </Text>
      </View>

      {notifications.length > 0 ? (
        <ScrollView>
          <View style={styles.notificationList}>
            {notifications.map((item) => (
              <NotificationCard
                notificationType={item.notificationType}
                notificationTitle={item.title}
                notificationBody={item.body}
                notificationDate={item.registerDate}
              />
            ))}
          </View>
        </ScrollView>
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
