import React, { useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";

import NotificationCard from "../../components/NotificationCard";

import styles from "./styles";

export default function Notification() {
  const [notifications, setNotifications] = useState([1, 2, 3, 4]);

  const list = [
    {
      title: 'Título da notificação',
      body: 'Corpo da notificação',
      registerDate: 'hoje',
      notificationType: 'ajudaRecebida'
    },
    {
      title: 'Título da notificação',
      body: 'Corpo da notificação',
      registerDate: 'hoje',
      notificationType: 'ajudaAceita'
    },
    {
      title: 'Título da notificação',
      body: 'Corpo da notificação',
      registerDate: 'hoje',
      notificationType: 'ajudaFinalizada'
    },
    {
      title: 'Título da notificação',
      body: 'Corpo da notificação',
      registerDate: 'hoje',
      notificationType: 'ajudaExpirada'
    },
    {
      title: 'Título da notificação',
      body: 'Corpo da notificação',
      registerDate: 'hoje',
      notificationType: 'ajudaExpirada'
    }
  ]

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}> Notificações </Text>
      </View>

      {notifications.length > 0 ? (
        <ScrollView>
          <View style={styles.notificationList}>
            {list.map((item) => (
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
