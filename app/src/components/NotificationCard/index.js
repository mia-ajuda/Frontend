import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";

import colors from "../../../assets/styles/colorVariables";
import styles from "./styles";

export default function NotificationCard({
  notificationType,
  notificationTitle,
  notificationBody,
  notificationDate,
}) {
  const [time, setTime] = useState(``);
  const [iconName, setIconName] = useState("bell");
  const [iconBackground, setIconBackground] = useState(colors.primary);

  useEffect(() => {
    let date = new Date(notificationDate);
    let dateNow = new Date();
    let interval = dateNow.getTime() - date.getTime();

    if (interval > 31536000000) {
      let year = dateNow.getFullYear() - date.getFullYear();
      year > 1 ? setTime(`${year} anos atrás`) : setTime(`${year} ano atrás`);
    } else if (interval > 2678400000) {
      let month = dateNow.getMonth() - date.getMonth();
      month > 1
        ? setTime(`${month} mêses atrás`)
        : setTime(`${month} mês atrás`);
    } else if (interval > 86400000) {
      let day = dateNow.getDate() - date.getDate();
      day > 1 ? setTime(`${day} dias atrás`) : setTime(`${day} dia atrás`);
    } else if (interval > 3600000) {
      let hours = dateNow.getHours() - date.getHours();
      hours > 1
        ? setTime(`${hours} horas atrás`)
        : setTime(`${hours} hora atrás`);
    } else if (interval > 60000) {
      let minutes = dateNow.getMinutes() - date.getMinutes();
      minutes > 1
        ? setTime(`${minutes} minutos atrás`)
        : setTime(`${minutes} minuto atrás`);
    } else {
      setTime(`Agora`);
    }
  }, [time]);

  useEffect(() => {
    switch (notificationType) {
      case "ajudaRecebida":
        setIconName("bell");
        setIconBackground(colors.primary);
        break;

      case "ajudaAceita":
        setIconName("bell");
        setIconBackground(colors.primary);
        break;

      case "ajudaFinalizada":
        setIconName("check");
        setIconBackground(colors.danger);
        break;

      case "ajudaExpirada":
        setIconName("exclamation");
        setIconBackground(colors.danger);
        break;
    }
  }, [iconName]);

  return (
    <View style={styles.cardContainer}>
      <View style={[styles.iconContent, { backgroundColor: iconBackground }]}>
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
        <Text numberOfLines={2}>{notificationBody}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
}
