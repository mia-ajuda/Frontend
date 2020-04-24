import React, { useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";

import NotificationCard from "../../components/NotificationCard";

import styles from "./styles";

export default function Notification() {
  const [notifications, setNotifications] = useState([1, 2, 3, 4]);

  const list = [
    {
      title: 'Carlos ofereceu ajuda',
      body: 'Confira o perfil de Carlos para ele começar a te ajudar',
      registerDate: 'hoje',
      notificationType: 'ajudaRecebida'
    },
    {
      title: 'Carlos aceitou ajuda',
      body: 'Confira o perfil de Carlos para poder ajuda-lo',
      registerDate: 'hoje',
      notificationType: 'ajudaAceita'
    },
    {
      title: 'Sua ajuda foi finalizada',
      body: 'Sua ajuda foi concluída :)',
      registerDate: 'hoje',
      notificationType: 'ajudaFinalizada'
    },
    {
      title: 'Sua ajuda expirou',
      body: 'Confira a política de ajuda',
      registerDate: 'hoje',
      notificationType: 'ajudaExpirada'
    },
    {
      title: 'Sua ajuda expirou',
      body: 'Confira a política de ajuda',
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
