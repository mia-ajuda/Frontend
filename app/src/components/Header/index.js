import React from "react";
import { View, Text } from "react-native";
import { Icon } from "react-native-elements";
import colors from "../../../assets/styles/colorVariables";
import styles from "./styles";

export default function Header({ navegation, headerTitle }) {
    return(
      <View style={styles.container}>
        <View style={styles.iconContent}>
            <Icon
                size={35}
                name="caret-left"
                type="font-awesome"
                color={colors.light}
                onPress={() => {}}
            />
        </View>
        <View style={styles.titleContent}>
            <Text style={styles.titleContext}>{headerTitle}</Text>
        </View>
      </View>
    );
  };