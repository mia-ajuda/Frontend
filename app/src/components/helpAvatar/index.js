import React from "react";
import { Icon } from "react-native-elements";
import { View, Image } from "react-native";
import styles from "./styles";
import colors from "../../../assets/styles/colorVariables";

export default function Avatar({ help }) {
  const isRiskGroup = !!help.user.riskGroup.length;
  const profilePhoto = help.user.photo;
  const riskColor = isRiskGroup ? colors.danger : colors.primary;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: profilePhoto }}
        style={{
          resizeMode: "stretch",
          width: 45,
          height: 45,
          borderRadius: 100,
        }}
      />
      <View style={styles.iconPosition}>
        <Icon
          name="exclamation"
          type="font-awesome"
          size={40}
          color={riskColor}
        />
      </View>
    </View>
  );
}
