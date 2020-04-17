import React, { useState, useEffect } from "react";
import { View /*Text*/ } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import helpService from "../../../services/Help";

import styles from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import ListCard from "../../../components/ListCard";

export default function MyRequests({ navigation }) {
  const Tab = createMaterialTopTabNavigator();

  const [onGoingHelpList, setOnGoingHelpList] = useState([]);
  const [doneHelpList, setDoneHelpList] = useState([]);
  // const [listView, setListView] = useState(true);

  useEffect(() => {
    // setOnGoingHelpList(helpService.algumaFuncao("5e960f084595ab0026961e0b", "onf_going"));
    // setDoneHelpList(helpSerVice.algumaFuncao("5e960f084595ab0026961e0b", "finished"));
  }, [onGoingHelpList, doneHelpList]);

  function onGoingHelps() {
    return (
      <ScrollView>
        {onGoingHelpList.map((item, i) => (
          <ListCard
            key={i}
            helpTitle={item.title}
            helpDescription={item.description}
            categoryName={"Higiene Pessoal"}
          />
        ))}
      </ScrollView>
    );
  }

  function doneHelps() {
    return (
      <ScrollView>
        {doneHelpList.map((item, i) => (
          <ListCard
            key={i}
            helpTitle={item.title}
            helpDescription={item.description}
            categoryName={"Higiene Pessoal"}
          />
        ))}
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen name="Em andamento" component={onGoingHelps} />
        <Tab.Screen name="Finalizados" component={doneHelps} />
      </Tab.Navigator>
    </View>
  );
}
