import React, { useState, useContext } from "react";
import {
  View,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import Button from "../../../components/UI/button";
import styles from "./styles";
import userService from "../../../services/User";
import { Icon } from "react-native-elements";
import { UserContext } from "../../../store/contexts/userContext";
import actions from "../../../store/actions";
import colors from "../../../../assets/styles/colorVariables";

export default function RiskGroup({ route, navigation }) {
  const { userData } = route.params;
  console.log(userData);
  const { dispatch } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [disease, setDisease] = useState({
    dc: false,
    hiv: false,
    diab: false,
    hiperT: false,
    doenCardio: false,
  });

  const riskGroups = {
    dc: "Doença respiratória",
    hiv: "HIV",
    diab: "Diabetes",
    hiperT: "Hipertensão",
    doenCardio: "Doenças cardiovasculares",
  };

  const handleButtonPress = (id) => {
    if (disease[id] === true) {
      setDisease({ ...disease, [id]: false });
    } else setDisease({ ...disease, [id]: true });
  };

  const confirmSignUp = async () => {
    let newDisease = [];

    for (let prop in disease) {
      if (disease[prop]) {
        newDisease.push(prop);
      }
    }

    const completeRegistragionData = {
      ...userData,
      disease: newDisease,
    };

    try {
      setLoading(true);
      await userService.signUp(completeRegistragionData);
      Alert.alert(
        "Sucesso",
        "Seu cadastro foi realizado com sucesso!",
        [
          {
            text: "OK",
            onPress: () => {},
          },
        ],
        { cancelable: false }
      );
    } catch (err) {
      console.log(err);
      Alert.alert(
        "Erro",
        err.error ||
          "Erro ao finalizar seu cadastro. Tente novamente mais tarde!",
        [
          {
            text: "OK",
            onPress: () => {},
          },
        ],
        { cancelable: false }
      );
    } finally {
      setLoading(false);
      navigation.navigate("login");
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.backIcon}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.button}
        >
          <Icon name={"arrow-back"} color={"black"} />
        </TouchableOpacity>
      </View>
      <View style={styles.viewText}>
        <Text style={styles.text1}>
          Por último, é importante sabermos se você se encontra em um dos grupos
          de risco. Selecione caso possua alguma das condições a seguir:
        </Text>
      </View>

      <View style={styles.input}>
        {Object.entries(riskGroups).map(([key, value]) => {
          return (
            <View key={key} style={styles.inputItem}>
              <Button
                type={!disease[key] ? "notSelected" : null}
                press={() => handleButtonPress(key)}
                large
                title={value}
              />
            </View>
          );
        })}
      </View>
      <View style={styles.btnView}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <Button title="Concluir" large press={confirmSignUp} />
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
