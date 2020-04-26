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

  const [time, setTime] = useState(``);
  const [iconName, setIconName] = useState("bell");
  const [iconBackground, setIconBackground] = useState(colors.primary);
  
  useEffect(() => {
    let date = new Date(notificationDate)
    let dateNow = new Date()
    let interval = dateNow.getTime() - date.getTime()

    if(interval > 31536000000){
      let year = dateNow.getFullYear() - date.getFullYear()
      setTime(`${year} anos atrás`)
    } else if (interval > 2678400000) {
      let month = dateNow.getMonth() - date.getMonth()
      setTime(`${month} meses atrás`)
    } else if (interval > 86400000) {
      let date = dateNow.getDate() - date.getDate()
      setTime(`${date} dias atrás`)
    } else if(interval > 3600000) {
      let hours = dateNow.getHours() - date.getHours()
      setTime(`${hours} horas atrás`)
    } else if(interval > 60000) {
      let minutes = dateNow.getMinutes() - date.getMinutes()
      setTime(`${minutes} minutos atrás`)
    } else {
      setTime(`agora`)
    }

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
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
}
