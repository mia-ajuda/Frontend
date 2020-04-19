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
    let tempOnGoing = await helpService.getAllHelpForUser(
      "5e960f074595ab0026961def",
      "on_going"
    );
    let resOnGoing = tempOnGoing.filter((help) => help.active === true);
    setOnGoingHelpList(resOnGoing);
  }

  async function loadFinishedHelps() {
    let tempFinished = await helpService.getAllHelpForUser(
      "5e960f074595ab0026961def",
      "finished"
    );
    let resFinished = tempFinished.filter((help) => help.active === true);
    setFinishedHelpList(resFinished);
  }

  function onGoingHelps() {
    return (
      <ScrollView>
        <View style={styles.helpList}>
          {onGoingHelpList.map((item, i) => (
            <ListCard
              key={i}
              helpTitle={item.title}
              helpDescription={item.description}
              categoryName={"Higiene Pessoal"}
              deleteVisible={true}
              helpId={item._id}
            />
          ))}
        </View>
      </ScrollView>
    );
  }

  function doneHelps() {
    return (
      <ScrollView>
        <View style={styles.helpList}>
          {finishedHelpList.map((item, i) => (
            <ListCard
              key={i}
              helpTitle={item.title}
              helpDescription={item.description}
              categoryName={"Apoio psicológico"}
              deleteVisible={true}
              helpId={item._id}
            />
          ))}
        </View>
      </ScrollView>
    );
  }

  useEffect(() => {
    loadOnGoingHelps();
    loadFinishedHelps();
  }, [onGoingHelpList, finishedHelpList]);

  return (
    <View style={styles.container}>
      <Tab.Navigator
        tabBarOptions={{
          style: styles.tabContainer,
          labelStyle: styles.tabLabel,
          indicatorStyle: styles.tabIndicator,
        }}
      >
        <Tab.Screen name="Em andamento" component={onGoingHelps} />
        <Tab.Screen name="Finalizados" component={doneHelps} />
      </Tab.Navigator>
    </View>
  );
}
