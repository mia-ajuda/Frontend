import React, { useContext, useState } from "react";
import { View, Text, Image, Alert } from "react-native";
import styles from "./styles";
import Button from "../../../components/UI/button";
import moment from "moment";
import{HelpContext} from "../../../store/contexts/helpContext"
import { UserContext } from "../../../store/contexts/userContext";
import HelpService from "../../../services/Help";
import ConfirmationModal from "./confirmationModal";
import actions from "../../../store/actions";
export default function HelpDescription({ route, navigation }) {
  const { user } = useContext(UserContext);
  const { helpList,dispatch } = useContext(HelpContext);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(
    false
  );

  const {
    helpDescription,
    categoryName,
    helpId,
    userName,
    birthday,
    city,
    profilePhoto,
  } = route.params;

  const currentYear = moment().format("YYYY");
  const birthYear = moment(birthday).format("YYYY");

  const age = currentYear - birthYear;

  async function chooseHelp() {
    try {
      await HelpService.chooseHelp(helpId, user._id);
      setConfirmationModalVisible(false);
      let helpListArray = helpList.filter((help) => {
        return help._id!=helpId;
      });
      dispatch({ type: actions.help.storeList, helps: helpListArray });
      navigation.goBack();
      Alert.alert(
        "Sucesso",
        "Oferta enviada com sucesso e estará no aguardo para ser aceita",
        [{ title: "OK" }]
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <ConfirmationModal
        visible={confirmationModalVisible}
        setVisible={setConfirmationModalVisible}
        chooseHelp={chooseHelp}
      />
      <View style={styles.userInfo}>
        <Image
          source={{
            uri: profilePhoto,
          }}
          style={styles.profileImage}
        />
        <View style={styles.infoTextView}>
          <Text
            style={[styles.infoText, { fontFamily: "montserrat-semibold" }]}
          >
            {userName}
          </Text>
          <Text style={styles.infoText}>
            <Text style={{ fontFamily: "montserrat-semibold" }}>Idade: </Text>
            {age}
          </Text>
          <Text style={styles.infoText}>
            <Text style={{ fontFamily: "montserrat-semibold" }}>Cidade: </Text>
            {city}
          </Text>
        </View>
      </View>
      <View style={styles.helpInfo}>
        <View style={styles.helpInfoText}>
          <Text style={styles.infoText}>
            <Text style={{ fontFamily: "montserrat-semibold" }}>
              Categoria:{" "}
            </Text>
            {categoryName}
          </Text>
          <Text
            style={[
              styles.infoText,
              {
                fontFamily: "montserrat-semibold",
                marginTop: 20,
                marginBottom: 10,
              },
            ]}
          >
            Descrição:
          </Text>
          <Text style={styles.infoText}>{helpDescription}</Text>
        </View>
        <View style={styles.helpButtons}>
          <Button
            title="Oferecer Ajuda"
            large
            press={() => setConfirmationModalVisible(true)}
          />
        </View>
      </View>
    </View>
  );
}
