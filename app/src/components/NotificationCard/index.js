import React, {useState, useEffect} from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";

import colors from "../../../assets/styles/colorVariables";
import styles from "./styles";

export default function NotificationCard({
  notificationType, 
  notificationTitle, 
  notificationBody, 
  notificationDate
}) {

  const [time, setTime] = useState(0);
  const [iconName, setIconName] = useState("bell");
  const [iconBackground, setIconBackground] = useState(colors.primary);

  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  useEffect(() => {
    switch (notificationType) {
      case "ajudaRecebida":
        setIconName("bell");
        setIconBackground(colors.primary)
        break;

      case "ajudaAceita":
        setIconName("bell");
        setIconBackground(colors.primary)
        break;

      case "ajudaFinalizada":
        setIconName("check");
        setIconBackground(colors.danger)
        break;

      case "ajudaExpirada":
        setIconName("exclamation");
        setIconBackground(colors.danger)
        break;
    }
  }, [iconName]);

  return (
    <View style={styles.cardContainer}>
      <View style={[styles.iconContent, {backgroundColor: iconBackground}]}>
        <Icon
          size={15}
          name={iconName}
          type="font-awesome"
          color={colors.light}
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {notificationTitle}
        </Text>
        <Text numberOfLines={2}>
          {notificationBody}
        </Text>
        <Text style={styles.time}> {time} segundos atrás </Text>
      </View>
    </View>
  );
}
