import React, { useState, useContext, useCallback } from "react";
import { View, ScrollView, Image, Text } from "react-native";
import ListCard from "../../../../components/ListCard";
import { UserContext } from "../../../../store/contexts/userContext";
import helpService from "../../../../services/Help";
import styles from "../styles";
import ConfirmationModal from "../../../../components/modals/confirmationModal";
import { useFocusEffect } from '@react-navigation/native';

export default function OnGoingHelps({ navigation }) {
  const [onGoingHelpList, setOnGoingHelpList] = useState([]);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(
    false
  );

  const { user } = useContext(UserContext);
  const { _id: userId } = user;

  useFocusEffect(
    useCallback(() => {
      loadOnGoingHelps();
    }, [navigation])
  );
  
  async function loadOnGoingHelps() {
    let tempOnWaiting = await helpService.getAllHelpForUser(userId, "waiting");
    let tempOnGoing = await helpService.getAllHelpForUser(userId, "on_going");
    let AllHelps = [...tempOnGoing, ...tempOnWaiting];
    let filteredHelps = AllHelps.filter(help => help.active === true);
    setOnGoingHelpList(filteredHelps);
  }

  async function excludeHelp(helpId) {
    try {
      await helpService.deleteHelp(helpId);
      const updatedArray = onGoingHelpList.filter(help => {
        return help._id !== helpId;
      });
      setOnGoingHelpList(updatedArray);
      setConfirmationModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View>
      {onGoingHelpList.length > 0 ? (
        <ScrollView>
          <View style={styles.helpList}>
            {onGoingHelpList.map(item => (
              <View key={item._id}>
                <ListCard
                  helpTitle={item.title}
                  helpId={item._id}
                  helpDescription={item.description}
                  categoryName={item.category[0].name}
                  deleteVisible={true}
                  setConfirmationModalVisible={setConfirmationModalVisible}
                  navigation={navigation}
                  possibleHelpers={item.possibleHelpers}
                  ownerId={item.ownerId}
                  helpStatus={item.status}
                  helperId={item.helperId}
                />

                <ConfirmationModal
                  visible={confirmationModalVisible}
                  setVisible={setConfirmationModalVisible}
                  behavior={() => excludeHelp(item._id)}
                />
              </View>
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
            padding: 20
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
