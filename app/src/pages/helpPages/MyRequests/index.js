import React from "react";
import { View } from "react-native";
import styles from "./styles";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Main from "../../Main";
import CreateHelp from "../createHelp";

export default function MyRequests({ navigation }) {
  const Tab = createMaterialTopTabNavigator();
  
  return(
    <View style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen name="Em andamento" component={Main} />
        <Tab.Screen name="Finalizados" component={CreateHelp} />
      </Tab.Navigator>
    </View>
  );
};