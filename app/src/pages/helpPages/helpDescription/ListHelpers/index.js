import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert
} from "react-native";
import { Badge } from "react-native-elements";
import ListHelperModal from "./ListHelperModal";
import api from "../../../../services/Api";
import moment from "moment";
import { UserContext } from "../../../../store/contexts/userContext";
import Button from "../../../../components/UI/button";

import styles from "./styles";

export default function ListHelpers({
  clickAction,
  stateAction,
  helpId,
  navigation
}) {
  const { user } = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  const [currentHelperId, setCurrentHelperId] = useState(null);
  const [helperImage, setHelperImage] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_Blank.svg"
  );
  const [helperName, setHelperName] = useState("");
  const [helperAge, setHelperAge] = useState("");
  const [helperCity, setHelperCity] = useState("");
  const [helperPhone, setHelperPhone] = useState("");
  const [help, setHelp] = useState({});
  const [possibleHelpers, setPossibleHelpers] = useState([]);
  const [finished, setFinished] = useState(false);

  const helperPhoto = (photo) => photo.includes("http")
    ? { uri: photo }
    : { uri: `data:image/png;base64,${photo}` };

  const loadHelpInfo = async () => {
    try {
      const helps = await api.get(`/help?id=${user._id}`);
      const helpFinal = helps.data.filter(help => help._id === helpId);
      setHelp(helpFinal[0]);
      setPossibleHelpers(helpFinal[0].possibleHelpers);

      if (helpFinal[0].helperId) {
        const resp = await api.get(`user/getUser/${helpFinal[0].helperId}`);
        setHelperImage(resp.data.photo);
        setHelperAge(moment().diff(resp.data.birthday, "year"));
        setHelperName(resp.data.name);

        setHelperCity(resp.data.address.city);
        setHelperPhone(resp.data.phone);
      }
    } catch (err) {
      console.log(err.response);
    }
  };

  const ownerFinishedHelp = async () => {
    try {
      await api.put(`/help/ownerConfirmation/${helpId}/${user._id}`);
      Alert.alert(
        "Sucesso!",
        "Ajuda finalizada com sucesso! Aguarde a confirmação do ajudante!",
        [{ text: "OK", onPress: () => {} }],
        {
          cancelable: false
        }
      );
      navigation.navigate("em andamento");
    } catch (err) {
      Alert.alert(
        "Opsss!",
        "Erro ao finalizar ajuda, tente mais tarde!",
        [{ text: "OK", onPress: () => {} }],
        {
          cancelable: false
        }
      );
    }
  };

  useEffect(() => {
    clickAction(false);
    loadHelpInfo();
  }, [helpId, visible]);

  const chooseHelper = async () => {
    try {
      await api.put(`/help/chooseHelper/${helpId}/${currentHelperId}`);
      Alert.alert(
        "Sucesso!",
        "Ajudante escolhido com sucesso!",
        [{ text: "OK", onPress: () => {} }],
        {
          cancelable: false
        }
      );
    } catch (err) {
      Alert.alert(
        "Ooops..",
        err.error || "Algo deu errado, tente novamente mais tarde",
        [{ text: "OK", onPress: () => {} }],
        {
          cancelable: false
        }
      );
    }
  };

  return (
    <View
      style={[
        styles.container,
        stateAction
          ? { justifyContent: "flex-start" }
          : { justifyContent: "flex-end" }
      ]}
    >
      {help && help.status !== "waiting" ? (
        <View>
          <Text style={styles.textVolunteer}>Voluntário:</Text>
          <View style={styles.volunteerContainer}>
            <View style={{ flexDirection: "row" }}>
              <Image
                style={styles.volunteerImage}
                source={helperPhoto(helperImage)}
              />
              <View style={{width: '80%'}}>
                <Text style={[{ fontFamily: "montserrat-semibold" }]}>
                  {helperName}
                </Text>
                <Text style={{flexWrap: 'wrap' }}>
                  <Text style={[{ fontFamily: "montserrat-semibold"}]}>
                    Cidade:{" "}
                  </Text>
                  {helperCity}
                </Text>
                <Text>
                  <Text style={[{ fontFamily: "montserrat-semibold" }]}>
                    Telefone:{" "}
                  </Text>
                  {helperPhone}
                </Text>
              </View>
            </View>
            {(help.status === "on_going" || help.status === "helper_finished") ? (
              <Button
                press={() => {
                  setVisible(true);
                  setFinished(true);
                }}
                title="Finalizar Ajuda"
                large
              />
            ) : (
              <></>
            )}
          </View>
        </View>
      ) : possibleHelpers.length === 0 ? (
        <View style={styles.wrapperNoHelperWarn}>
          <Text style={styles.textNoHelpers}>
            Não há ajudantes para este pedido!
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.buttonHelpers}
          onPress={() => clickAction(!stateAction)}
        >
          <Text style={styles.textBtn}>Possíveis ajudantes</Text>

          <Badge
            value={
              <Text style={styles.labelBadge}>{possibleHelpers.length}</Text>
            }
            badgeStyle={styles.badgeStyle}
            containerStyle={styles.containerBadge}
          />
        </TouchableOpacity>
      )}

      {stateAction ? (
        <View style={styles.listPossibleHelpers}>
          <ScrollView>
            {possibleHelpers.map(helper => (
              <TouchableOpacity
                key={helper._id}
                onPress={() => {
                  setVisible(true);
                  setCurrentHelperId(helper._id);
                }}
              >
                <View style={styles.helper}>
                  <Image
                    style={styles.imageProfile}
                    source={helperPhoto(helper.photo)}
                  />
                  <View>
                    <Text
                      style={[
                        styles.infoText,
                        { fontFamily: "montserrat-semibold" }
                      ]}
                    >
                      {helper.name}
                    </Text>
                    <Text>
                      <Text
                        style={[
                          styles.infoText,
                          { fontFamily: "montserrat-semibold" }
                        ]}
                      >
                        Idade:{" "}
                      </Text>
                      {moment().diff(helper.birthday, "year")}
                    </Text>
                    <Text>
                      <Text
                        style={[
                          styles.infoText,
                          { fontFamily: "montserrat-semibold" }
                        ]}
                      >
                        Cidade:{" "}
                      </Text>
                      {helper.address.city}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : (
        <></>
      )}
      <ListHelperModal
        visible={visible}
        setVisible={setVisible}
        message={
          finished
            ? "Você tem certeza que deseja finalizar este pedido de ajuda?"
            : "Você tem certeza que deseja este usuário como seu ajudante?"
        }
        actionModal={finished ? ownerFinishedHelp : chooseHelper}
      />
    </View>
  );
}
