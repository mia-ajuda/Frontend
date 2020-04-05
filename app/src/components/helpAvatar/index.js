import React from "react";
import { Icon } from "react-native-elements";
import { View } from "react-native";
import styles from "./styles";

export default function Avatar() {
  return (
    <View
      style={{
        padding: 5,
        backgroundColor: "#fff",
        borderRadius: 50,
        elevation: 10,
      }}
    >
      <Icon name="user-circle" type="font-awesome" color="#000" size={35} />
      <View style={{ position: "absolute", right: 0 }}>
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
