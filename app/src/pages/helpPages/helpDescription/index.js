import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Alert,
  TouchableOpacity,
  ScrollView
} from "react-native";
import styles from "./styles";
import Button from "../../../components/UI/button";
import moment from "moment";
import { UserContext } from "../../../store/contexts/userContext";
import HelpService from "../../../services/Help";
import ConfirmationModal from "./confirmationModal";
import ListHelpers from "./ListHelpers/index";
import api from '../../../services/Api';

export default function HelpDescription({ route, navigation }) {
  const { user } = useContext(UserContext);
  const [confirmationModalVisible, setConfirmationModalVisible] = useState(
    false
  );
  const [clickPossibleHelpers, setClickPossibleHelpers] = useState(false);
  const [ helper, setHelper] = useState({});
  const [cityHelper, setCityHelper] = useState("");

  useEffect(() => {

    loadHelper = async() => {
      try {
        const resp = await api.get(`user/getUser/${helperId}`);
        setCityHelper(resp.data.address.city);
        setHelper(resp.data);
      }catch(err) {
        console.log(err.message);
      }
    } 

    loadHelper();
  }, []) 

  const {
    helpDescription,
    categoryName,
    helpId,
    userName,
    birthday,
    city,
    profilePhoto,
    possibleHelpers,
    ownerId,
    helpStatus,
    helperId
  } = route.params;

  const currentYear = moment().format("YYYY");
  const birthYear = moment(birthday).format("YYYY");

  const age = currentYear - birthYear;


  async function chooseHelp() {
    try {
      await HelpService.chooseHelp(helpId, user._id);
      setConfirmationModalVisible(false);
      navigation.goBack();
      Alert.alert(
        "Sucesso",
        "Oferta enviada com sucesso e estará no aguardo para ser aceita",
        [{ title: "OK" }]
      );
      helpStatus("on_going");
      
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
                >
                  { userName || user.name }
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
          {user._id !== ownerId ? (
            <Button
              title="Oferecer Ajuda"
              large
              press={() => setConfirmationModalVisible(true)}
            />
          ) : helpStatus === "on_going" && helperId ? (
            <View>
              <Text style={styles.textVolunteer}>Voluntário:</Text>
              <View style={styles.volunteerContainer}>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    style={styles.volunteerImage}
                    source={{
                      uri: helper.photo || null
                    }}
                  />
                  <View>
                    <Text style={[{ fontFamily: "montserrat-semibold" }]}>
                      {helper.name}
                    </Text>
                    <Text>
                      <Text style={[{ fontFamily: "montserrat-semibold" }]}>
                        Idade:{" "}
                      </Text>
                      {moment().diff(helper.birthday, "year")}
                    </Text>
                    <Text>
                      <Text style={[{ fontFamily: "montserrat-semibold" }]}>
                        Cidade:{" "}
                      </Text>
                      {cityHelper}
                    </Text>
                  </View>
                </View>
                <Button title="Finalizar" large>
                  <Text>Finalizar</Text>
                </Button>
              </View>
            </View>
          ) : possibleHelpers.length !== 0 ? (
            <ListHelpers
              stateAction={clickPossibleHelpers}
              clickAction={setClickPossibleHelpers}
              possibleHelpers={possibleHelpers}
              helpId={helpId}
            />
          ) : (
            <View style={styles.wrapperNoHelperWarn}>
              <Text style={styles.textNoHelpers}>
                Não há ajudantes para este pedido!
              </Text>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
}
