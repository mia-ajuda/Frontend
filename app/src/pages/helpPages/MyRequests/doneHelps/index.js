import React, { useState, useEffect, useContext } from "react";
import { View, ScrollView, Image, Text } from "react-native";
import ListCard from "../../../../components/ListCard";
import { UserContext } from "../../../../store/contexts/userContext";
import helpService from "../../../../services/Help";

import styles from "../styles";

export default function DoneHelps() {
  const [finishedHelpList, setFinishedHelpList] = useState([]);
  const { user } = useContext(UserContext);
  const { _id: userId } = user.info;

  useEffect(() => {
    loadFinishedHelps();
  }, []);

  async function loadFinishedHelps() {
    let tempFinished = await helpService.getAllHelpForUser(userId, "finished");
    let resFinished = tempFinished.filter((help) => help.active === true);
    setFinishedHelpList(resFinished);
  }

  async function excludeHelp(helpId) {
    try {
      await helpService.deleteHelp(helpId);
      const updatedArray = onGoingHelpList.filter((help) => {
        return help._id !== helpId;
      });
      setFinishedHelpList(updatedArray);
    } catch (error) {
      console.log(error);
    }
  }

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
                deleteHelp={excludeHelp}
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
            source={require("../../../../../assets/images/blueCat.png")}
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
