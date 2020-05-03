import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import styles from "./styles";
import Button from "../../../components/UI/button";
import moment from "moment";
import { UserContext } from "../../../store/contexts/userContext";
import HelpService from "../../../services/Help";
import ConfirmationModal from "./confirmationModal";
import ListHelpers from "./ListHelpers/index";

export default function HelpDescription({ route, navigation }) {
  const { user } = useContext(UserContext);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(
    false
  );
  const [clickPossibleHelpers, setClickPossibleHelpers] = useState(false);

  const {
    helpDescription,
    categoryName,
    helpId,
    userName,
    birthday,
    city,
    profilePhoto,
    ownerId
  } = route.params;

  const currentYear = moment().format("YYYY");
  const birthYear = moment(birthday).format("YYYY");

  const age = currentYear - birthYear;

  async function chooseHelp() {
    try {
      await HelpService.chooseHelp(helpId, user._id);
      setConfirmationModalVisible(false);
      Alert.alert("Sucesso", "Oferta aceita com sucesso!", [{ title: "OK" }]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <ConfirmationModal
          visible={confirmationModalVisible}
          setVisible={setConfirmationModalVisible}
          chooseHelp={chooseHelp}
        />
        {!clickPossibleHelpers ? (
          <>
            <View style={styles.userInfo}>
              <Image
                source={{
                  uri: profilePhoto || user.photo
                }}
                style={styles.profileImage}
              />
              <View style={styles.infoTextView}>
                <Text
                  style={[
                    styles.infoText,
                    { fontFamily: "montserrat-semibold" }
                  ]}
                  currentHelp
                >
                  {userName || user.name}
                </Text>
                <Text style={styles.infoText}>
                  <Text style={{ fontFamily: "montserrat-semibold" }}>
                    Idade:{" "}
                  </Text>
                  {age || moment().diff(user.birthday, "year")}
                </Text>
                <Text style={styles.infoText}>
                  <Text style={{ fontFamily: "montserrat-semibold" }}>
                    Cidade:{" "}
                  </Text>
                  {city || user.address.city}
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
                      marginBottom: 10
                    }
                  ]}
                >
                  Descrição:
                </Text>
                <Text style={styles.infoText}>{helpDescription}</Text>
              </View>
            </View>
          </>
        ) : (
          <></>
        )}
        <View style={styles.helpButtons}>
          {user._id === ownerId ? (
            <ListHelpers
              stateAction={clickPossibleHelpers}
              clickAction={setClickPossibleHelpers}
              helpId={helpId}
              navigation={navigation}
            />
          ) : (
            <Button
              title="Oferecer Ajuda"
              large
              press={() => setConfirmationModalVisible(true)}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}
