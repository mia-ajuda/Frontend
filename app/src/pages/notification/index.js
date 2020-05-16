import React, { useState, useContext, useEffect } from "react";
import { View, Text, Image, ScrollView, ActivityIndicator } from "react-native";

import NotificationCard from "../../components/NotificationCard";
import { UserContext } from "../../store/contexts/userContext";
import NotificationService from "../../services/Notification";
import { colors } from "react-native-elements";
import styles from "./styles";

export default function Notification({navigation}) {
  const [loading,setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { user } = useContext(UserContext);

  const { _id: userId } = user;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadNotifications();
    });
    return unsubscribe;
  }, [navigation]);

  async function loadNotifications() {
    try {
      setLoading(true);
      setNotifications(await NotificationService.getAllNotifications(userId));
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}> Notificações </Text>
      </View>

      { loading ? (
        <View style = { styles.loadingContainer } >
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
        ) : 
        notifications.length > 0 ? (
        <ScrollView>
          <View style={styles.notificationList}>
            {notifications.map((item) => (
              <NotificationCard
                key={item._id}
                notificationType={item.notificationType}
                notificationTitle={item.title}
                notificationBody={item.body}
                notificationDate={item.registerDate}
                dateNow = {Date.now()}
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
