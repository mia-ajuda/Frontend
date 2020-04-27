import React from "react";
import { Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

const Term = () => {
  return(
    <Text>
      ohasd
    </Text>
  )
}

export default function UseTerm() {
  const Navigation = createStackNavigator();

  return (
    <Navigation.Navigator>
      <Navigation.Screen name="term" component={Term}>

      </Navigation.Screen>

    </Navigation.Navigator>
    )
}