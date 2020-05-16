import React, { useState, useContext, useCallback } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import ListCard from "../../../../components/ListCard";
import { UserContext } from "../../../../store/contexts/userContext";
import helpService from "../../../../services/Help";
import styles from "../styles";
import ConfirmationModal from "../../../../components/modals/confirmationModal";
import { useFocusEffect } from "@react-navigation/native";
import NoHelps from "../../../../components/NoHelps";
import colors from "../../../../../assets/styles/colorVariables";

export default function OnGoingHelps({ navigation }) {
  const [onGoingHelpList, setOnGoingHelpList] = useState([]);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(
    false
  );
  const [loadingHelps, setLoadingHelps] = useState(false);

  const { user } = useContext(UserContext);
  const { _id: userId } = user;

  useFocusEffect(
    useCallback(() => {
      loadOnGoingHelps();
    }, [navigation])
  );

  async function loadOnGoingHelps() {
    setLoadingHelps(true);
    let tempOnWaiting = await helpService.getAllHelpForUser(userId, "waiting");
    let tempOnGoing = await helpService.getAllHelpForUser(userId, "on_going");
    let tempHelperFinished = await helpService.getAllHelpForUser(
      userId,
      "helper_finished"
    );
    let allHelps = [...tempOnGoing, ...tempOnWaiting];
    allHelps = [...allHelps, ...tempHelperFinished];
    let filteredHelps = allHelps.filter((help) => help.active === true);
    setOnGoingHelpList(filteredHelps);
    setLoadingHelps(false);
  }

  async function excludeHelp(helpId) {
    try {
      await helpService.deleteHelp(helpId);
      const updatedArray = onGoingHelpList.filter((help) => {
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
      {loadingHelps ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : onGoingHelpList.length > 0 ? (
        <ScrollView>
          <View style={styles.helpList}>
            {onGoingHelpList.map((item) => (
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
                  pageName="Description"
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
        <NoHelps title={"Você não possui ajudas em andamento"} />
      )}
    </View>
  );
}
