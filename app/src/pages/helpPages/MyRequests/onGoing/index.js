import React, { useState, useEffect, useContext } from "react";
import { View, ScrollView, Image, Text } from "react-native";
import ListCard from "../../../../components/ListCard";
import { UserContext } from "../../../../store/contexts/userContext";
import helpService from "../../../../services/Help";
import styles from "../styles";

export default function OnGoingHelps() {
  const [onGoingHelpList, setOnGoingHelpList] = useState([]);

  const { user } = useContext(UserContext);
  const { _id: userId } = user.info;

  useEffect(() => {
    loadOnGoingHelps();
  }, []);

  async function loadOnGoingHelps() {
    let tempOnGoing = await helpService.getAllHelpForUser(userId, "waiting");
    let resOnGoing = tempOnGoing.filter((help) => help.active === true);
    setOnGoingHelpList(resOnGoing);
  }

  async function excludeHelp(helpId) {
    try {
      await helpService.deleteHelp(helpId);
      const updatedArray = onGoingHelpList.filter((help) => {
        return help._id !== helpId;
      });
      setOnGoingHelpList(updatedArray);
      console.log(updatedArray);
    } catch (error) {
      console.log(error);
    }
  }

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
            Você não possui ajudas em andamento
          </Text>
        </View>
      )}
    </View>
  );
}
