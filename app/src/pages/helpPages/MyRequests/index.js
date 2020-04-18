import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import styles from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import ListCard from "../../../components/ListCard";
import helpService from "../../../services/Help";
import colors from "../../../../assets/styles/colorVariables";
import { HeaderTitle } from "@react-navigation/stack";

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
      <ScrollView >
        <View style={styles.helpList}>
          {onGoingHelpList.map((item, i) => (
            <ListCard
              key={i}
              helpTitle={item.title}
              helpDescription={item.description}
              categoryName={"Apoio psicológico"}
              deleteVisible={true}
            />
          ))}
        </View>
      </ScrollView>
    );
  }

  function doneHelps() {
    return (
      <ScrollView >
        <View style={styles.helpList}>
          {finishedHelpList.map((item, i) => (
            <ListCard
              key={i}
              helpTitle={item.title}
              helpDescription={item.description}
              categoryName={"Apoio psicológico"}
              deleteVisible={true}
            />
          ))}
        </View>
      </ScrollView>
    );
  }

  useEffect(() => {
    loadOnGoingHelps();
    loadFinishedHelps();
  }, []);

  return (
    <View style={styles.container}>
      <Tab.Navigator  tabBarOptions={{ style:  styles.tabContainer , labelStyle: styles.tabLabel, indicatorStyle: styles.tabIndicator}}>
        <Tab.Screen name="Em andamento" component={onGoingHelps} />
        <Tab.Screen name="Finalizados" component={doneHelps} />
      </Tab.Navigator>
    </View>
  );
}
