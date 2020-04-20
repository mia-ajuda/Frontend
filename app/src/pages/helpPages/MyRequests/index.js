import React, { useState, useEffect, useContext } from "react";
import { View, Text, Image } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import styles from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import ListCard from "../../../components/ListCard";
import helpService from "../../../services/Help";
// import { UserContext } from "../../../store/contexts/userContext";

export default function MyRequests({ navigation }) {
  const Tab = createMaterialTopTabNavigator();

  const [onGoingHelpList, setOnGoingHelpList] = useState([]);
  const [finishedHelpList, setFinishedHelpList] = useState([]);

  // const { user } = useContext(UserContext);
  // const { _id: userId } = user.info;

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

  useEffect(() => {
    loadOnGoingHelps();
    loadFinishedHelps();
  }, []);

  function onGoingHelps() {
    return (
      <View>
        {onGoingHelpList.length > 0 ? (
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
        ) : (
          <View
            style={{
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <Image
              source={require("../../../../assets/images/blueCat.png")}
              style={styles.emptyListImage}
            />
            <Text style={styles.emptyListText}>
              Você não possui ajudas em andamento
            </Text>
          </View>
        )}
      </View>
    );
  }

  function doneHelps() {
    return (
      <View>
        {finishedHelpList.length > 0 ? (
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
        ) : (
          <View
            style={{
              height: "100%",
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              padding: 20,
            }}
          >
            <Image
              source={require("../../../../assets/images/blueCat.png")}
              style={styles.emptyListImage}
            />
            <Text style={styles.emptyListText}>
              Você não possui ajudas finalizadas
            </Text>
          </View>
        )}
      </View>
    );
  }

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
