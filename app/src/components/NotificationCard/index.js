import React, { useState, useEffect } from "react";
import { View, Text, Image } from "react-native";

import styles from "./styles";

export default function NotificationCard() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval = null;
    interval = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  return (
    <View style={styles.cardContainer}>
      <View style={{ justifyContent: "center" }}>
        <Image
          source={require("../../../assets/images/blueLogo.png")}
          style={styles.notificationImage}
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          userName ofereceu ajuda!
        </Text>
        <Text numberOfLines={2}>
          Confira o perfil de userName. Confira o perfil de userName. Confira o
          perfil de userName.
        </Text>
        <Text style={styles.time}> {time} segundos atrás </Text>
      </View>
    </View>
  );
}
