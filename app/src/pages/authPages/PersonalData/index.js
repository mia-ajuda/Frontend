import React, { useState, useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  Text,
  ScrollView,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Icon } from "react-native-elements";
import { TextInputMask } from "react-native-masked-text";
import Input from "../../../components/UI/input";
import Button from "../../../components/UI/button";
import { CheckBox } from "react-native-elements";
import styles from "./styles";
import UserService from "../../../services/User";
import colors from "../../../../assets/styles/colorVariables";
import onlyNumbers from "../../../utils/onlyNumbers";

export default function PersonalData({ route, navigation }) {
  const { userData } = route.params;

  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [firstTimeBirthday, setFirstTimeBirthday] = useState(true);
  const [birthIsValid, setBirthValid] = useState(true);
  const [cpf, setCPF] = useState("");
  const [cpfIsValid, setCpfValid] = useState(true);
  const [cellPhone, setCellPhone] = useState("");
  const [validPhone, setValidPhone] = useState(true);
  const [phoneFirstTime, setPhoneFirstTime] = useState(true);
  const [keyboardShow, setKeyboardShow] = useState(false);
  const [ismentalHealthProfessional, setIsMentalHealthProfessional] = useState(
    false
  );
  const [isVerificationLoading, setVerificationLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (userData.name) {
      setName(userData.name);
    }

    if (userData.birthday) {
      const dateSplit = userData.birthday.split("/");
      const date = dateSplit[1] + "/" + dateSplit[0] + "/" + dateSplit[2];
      setBirthday(date);
    }

    Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
    Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
      Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setKeyboardShow(true);
  };

  const _keyboardDidHide = () => {
    setKeyboardShow(false);
  };

  let refCpf;
  let refDate;

  const handlePhone = () => {
    let phoneFilter =
      "+55" +
      cellPhone
        .replace("(", "")
        .replace(")", "")
        .replace("-", "")
        .replace(" ", "");

    let ddd = phoneFilter.substring(0, 5);
    let numero = phoneFilter.substring(5, 14);
    if (numero.length === 9) {
      numero = numero.replace("9", "");
      phoneFilter = ddd + numero;
    }

    if (phoneFilter.length === 14) {
      phoneFilter = phoneFilter.replace("9", "");
    }

    return phoneFilter;
  };

  const handleDate = () => {
    const auxDate = birthday.split("/");
    const newDate = auxDate[2] + "-" + auxDate[1] + "-" + auxDate[0];

    return newDate;
  };

  useEffect(() => {
    if (cpf !== "") {
      setCpfValid(refCpf.isValid());
    }

    if (birthday !== "") {
      setBirthValid(refDate.isValid());
    }
  }, [cpf, birthday]);

  const nameHandler = (enteredName) => {
    setName(enteredName);
  };

  const continueHandler = () => {
    const phone = handlePhone();
    const birthdayFormated = handleDate();
    const newUserData = {
      ...userData,
      name,
      birthday: birthdayFormated,
      cpf,
      phone,
      ismentalHealthProfessional,
    };
    setVerificationLoading(false);
    navigation.navigate("address", { userData: newUserData });
  };

  const verifyCpf = async () => {
    try {
      const plainCpf = onlyNumbers(cpf);
      setVerificationLoading(true);
      Keyboard.dismiss();
      const doesCpfExist = await UserService.verifyUserInfo(plainCpf);
      if (doesCpfExist)
        throw "Esse Cpf já está sendo utilizado por outro usuário";
      continueHandler();
    } catch (err) {
      setError(err);
      setVerificationLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 5 : 0}
    >
      {!keyboardShow ? (
        <View>
          <View style={styles.backIcon}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.button}
            >
              <Icon
                name={"arrow-back"}
                color={!keyboardShow ? "black" : "#f7f7f7"}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.title}>
            <Text style={styles.text1}>
              Informe alguns dados para continuarmos seu com o seu cadastro.
            </Text>
          </View>
        </View>
      ) : (
        <></>
      )}
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={[!keyboardShow ? styles.scroll : styles.scroll2]}
      >
        <View style={styles.inputView}>
          {error && <Text style={styles.errorMessage}>{error}</Text>}

          <Input
            value={name}
            change={nameHandler}
            label="Nome Completo"
            placeholder="Nome Completo"
          />
          <View style={styles.viewMargin}></View>
          <View>
            <Text style={styles.label}>Data de Nascimento</Text>
            <TextInputMask
              type={"datetime"}
              options={{
                format: "DD/MM/YYYY",
              }}
              value={birthday}
              onChangeText={(text) => {
                setBirthday(text);
                setFirstTimeBirthday(false);
              }}
              style={[
                styles.inputMask,
                (birthIsValid && birthday.length === 10) || firstTimeBirthday
                  ? styles.valid
                  : styles.invalid,
              ]}
              placeholder="Data de Nascimento"
              ref={(ref) => (refDate = ref)}
            />
          </View>
          <View style={styles.viewMargin}></View>
          <View>
            <Text style={styles.label}>CPF</Text>
            <TextInputMask
              type={"cpf"}
              value={cpf}
              onChangeText={(text) => {
                setCPF(text);
              }}
              style={[
                styles.inputMask,
                cpfIsValid ? styles.valid : styles.invalid,
              ]}
              placeholder="Digite seu CPF"
              ref={(ref) => (refCpf = ref)}
            />
          </View>
          <View style={styles.viewMargin} />
          <View>
            <Text style={styles.label}>Telefone</Text>
            <TextInputMask
              style={[
                styles.inputMask,
                (cellPhone === "" && phoneFirstTime) ||
                (validPhone && !phoneFirstTime)
                  ? styles.valid
                  : styles.invalid,
              ]}
              type={"cel-phone"}
              options={{
                maskType: "BRL",
                withDDD: true,
                dddMask: "(99) ",
              }}
              value={cellPhone}
              onChangeText={(text) => {
                setCellPhone(text);

                if (text.length >= 14) {
                  setValidPhone(true);
                } else {
                  setValidPhone(false);
                }

                setPhoneFirstTime(false);
              }}
              placeholder="Digite seu telefone"
            />
          </View>
          <View style={styles.viewMargin} />
          <View style={styles.toggleView}>
            <CheckBox
              title="Sou profissional de saúde mental"
              checked={ismentalHealthProfessional}
              onPress={() => {
                setIsMentalHealthProfessional(!ismentalHealthProfessional);
              }}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.btnView}>
        {isVerificationLoading ? (
          <ActivityIndicator color={colors.primary} size="large" />
        ) : (
          <Button
            title="Continuar"
            disabled={
              !(
                cpf !== "" &&
                cpfIsValid &&
                birthday !== "" &&
                birthIsValid &&
                cellPhone !== "" &&
                validPhone
              )
            }
            large
            press={verifyCpf}
          />
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
