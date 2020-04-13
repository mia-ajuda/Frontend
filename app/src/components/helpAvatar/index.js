import React from "react";
import { Icon } from "react-native-elements";
import { View } from "react-native";
import styles from "./styles";
import colors from "../../../assets/styles/colorVariables";

export default function Avatar({ help }) {
  const isRiskGroup = !!help.user[0].riskGroup.length;
  return (
    <View style={styles.container}>
      <Icon name="user-circle" type="font-awesome" color="#000" size={35} />
      <View style={styles.iconPosition}>
        <Icon
          name="exclamation"
          type="font-awesome"
          color={isRiskGroup ? colors.danger : colors.primary}
          size={35}
        />
      </View>
    </View>
  );
}
