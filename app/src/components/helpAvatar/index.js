import React from "react";
import { Icon } from "react-native-elements";
import { View } from "react-native";
import styles from "./styles";

export default function Avatar() {
  return (
    <View style={styles.container}>
      <Icon name="user-circle" type="font-awesome" color="#000" size={35} />
      <View style={styles.iconPosition}>
        <Icon
          name="exclamation"
          type="font-awesome"
          color="#4B8AB9"
          size={35}
        />
      </View>
    </View>
  );
}
