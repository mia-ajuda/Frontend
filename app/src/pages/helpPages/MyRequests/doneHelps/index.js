import React, { useState, useEffect, useContext } from "react";
import { View, ScrollView, Image, Text } from "react-native";
import ListCard from "../../../../components/ListCard";
import { UserContext } from "../../../../store/contexts/userContext";
import helpService from "../../../../services/Help";
import styles from "../styles";
import ConfirmationModal from "../../../../components/modals/confirmationModal";

export default function DoneHelps({ navigation }) {
  const [finishedHelpList, setFinishedHelpList] = useState([]);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(
    false
  );

  const { user } = useContext(UserContext);
  const { _id: userId } = user.info;
  const { accessToken } = user;

  useEffect(() => {
    loadFinishedHelps();
  }, []);

  async function loadFinishedHelps() {
    let tempFinished = await helpService.getAllHelpForUser(userId, "finished", accessToken);
    let resFinished = tempFinished.filter((help) => help.active === true);
    setFinishedHelpList(resFinished);
  }

  async function excludeHelp(helpId) {
    try {
      await helpService.deleteHelp(helpId, accessToken);
      const updatedArray = onGoingHelpList.filter((help) => {
        return help._id !== helpId;
      });
      setFinishedHelpList(updatedArray);
      setConfirmationModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View>
      {finishedHelpList.length > 0 ? (
        <ScrollView>
          <View style={styles.helpList}>
            {finishedHelpList.map((item) => (
              <View key={item._id}>
                <ListCard
                  helpTitle={item.title}
                  helpDescription={item.description}
                  categoryName={item.category[0].name}
                  deleteVisible={true}
                  setConfirmationModalVisible={setConfirmationModalVisible}
                  navigation={navigation}
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