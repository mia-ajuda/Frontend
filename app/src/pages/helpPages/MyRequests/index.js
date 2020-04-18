import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import styles from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import ListCard from "../../../components/ListCard";
import helpService from "../../../services/Help";

export default function MyRequests({ navigation }) {
  const Tab = createMaterialTopTabNavigator();

  const [onGoingHelpList, setOnGoingHelpList] = useState([]);
  const [finishedHelpList, setFinishedHelpList] = useState([]);

  async function loadOnGoingHelps() {
    // let resOnGoing = await helpService.getAllHelpForUser("userID", "on_going");
    // setOnGoingHelpList(resOnGoing);

    await setOnGoingHelpList([
      {
        title: "mia ajuda pufavor",
        description: "esse eh um exemplo da ajuda hehehe",
      },
      {
        title: "mia ajuda pufavor",
        description: "esse eh um exemplo da ajuda hehehe",
      },
      {
        title: "mia ajuda pufavor",
        description: "esse eh um exemplo da ajuda hehehe",
      },
      {
        title: "mia ajuda pufavor",
        description: "esse eh um exemplo da ajuda hehehe",
      },
    ]);
  }

  async function loadFinishedHelps() {
    // let resFinished = await helpService.getAllHelpForUser("userId", "finished");
    // setFinishedHelpList(resFinished);

    await setFinishedHelpList([
      {
        title: "ja foi ajudado",
        description: "esse eh um exemplo da ajuda hehehe",
      },
      {
        title: "ja foi ajudado",
        description: "esse eh um exemplo da ajuda hehehe",
      },
      {
        title: "ja foi ajudado",
        description: "esse eh um exemplo da ajuda hehehe",
      },
      {
        title: "ja foi ajudado",
        description: "esse eh um exemplo da ajuda hehehe",
      },
    ]);
  }

  function onGoingHelps() {
    return (
      <ScrollView>
        {onGoingHelpList.map((item, i) => (
          <ListCard
            key={i}
            helpTitle={item.title}
            helpDescription={item.description}
            categoryName={"Apoio psicológico"}
          />
        ))}
      </ScrollView>
    );
  }

  function doneHelps() {
    return (
      <ScrollView>
        {finishedHelpList.map((item, i) => (
          <ListCard
            key={i}
            helpTitle={item.title}
            helpDescription={item.description}
            categoryName={"Apoio psicológico"}
          />
        ))}
      </ScrollView>
    );
  }

  useEffect(() => {
    loadOnGoingHelps();
    loadFinishedHelps();
  }, [onGoingHelpList, finishedHelpList]);

  return (
    <View style={styles.container}>
      <Tab.Navigator>
        <Tab.Screen name="Em andamento" component={onGoingHelps} />
        <Tab.Screen name="Finalizados" component={doneHelps} />
      </Tab.Navigator>
    </View>
  );
}
