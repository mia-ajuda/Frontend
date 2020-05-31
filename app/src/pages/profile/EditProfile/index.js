import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { UserContext } from "../../../store/contexts/userContext";
import { TextInputMask } from "react-native-masked-text";
import Button from "../../../components/UI/button";
import Input from "../../../components/UI/input";
import colors from "../../../../assets/styles/colorVariables";
import UserService from "../../../services/User";
import axios from "axios";
import styles from "./styles";
import actions from "../../../store/actions";
import ConfirmationModal from "../../../components/modals/confirmationModal";

export default function EditProfile({ route, navigation }) {
  const [mainField, setMainField] = useState("");
  const [isMainFieldValid, setMainFieldValid] = useState(true);
  const [numberPlace, setNumberPlace] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [complement, setComplement] = useState("");
  const [loading, setLoading] = useState("");
  const { dispatch } = useContext(UserContext);
  const [loadingModal, setLoadingModal] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (route.params.attribute === "phone") {
      setMainField(route.params.user.phone.slice(3, 14));
    } else if (route.params.attribute === "name") {
      setMainField(route.params.user.name);
    } else {
      const address = route.params.user.address;
      setMainField(address.cep || "");
      setCity(address.city || "");
      setNumberPlace(String(address.number) || "");
      setComplement(address.complement || "");
      setState(address.state || "");
    }
  }, []);

  const handlePhone = () => {
    let phoneFilter =
      "+55" +
      mainField
        .replace("(", "")
        .replace(")", "")
        .replace("-", "")
        .replace(" ", "");

    return phoneFilter;
  };

  const cepHandle = async (currentCep) => {
    setMainField(currentCep.substring(0, 8));

    if (currentCep.length === 8) {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://viacep.com.br/ws/${currentCep}/json/`
        );

        if (!response.data.erro) {
          const { localidade, uf, logradouro, bairro } = response.data;

          setMainFieldValid(true);
          setState(uf);
          setCity(localidade);
          setComplement(logradouro + " / " + bairro);
        } else {
          setMainFieldValid(false);
        }
      } catch {
        setMainFieldValid(true);
      }
    } else {
      setMainFieldValid(false);
    }

    setLoading(false);
  };

  const stateHandle = (enteredName) => {
    if (enteredName.length > 2) {
      const subUf = enteredName.substring(0, 2);
      setState(subUf);
    } else {
      setState(enteredName);
    }
  };

  const handleCity = (value) => {
    setCity(value);
  };

  const handleNumber = (value) => {
    setNumberPlace(value);
  };

  const handleComplement = (value) => {
    setComplement(value);
  };

  const handleValue = (value) => {
    setMainField(value);
  };

  const handleEdit = async () => {
    let data = {};
    if (route.params.attribute === "cep") {
      data = {
        cep: mainField,
        number: numberPlace,
        complement,
        city,
        state,
      };
    } else if (route.params.attribute === "name") {
      data = {
        ...route.params.user,
        name: mainField,
      };
    } else {
      data = {
        ...route.params.user,
        phone: handlePhone(),
      };
    }

    navigation.goBack();
    try {
      setLoadingModal(true);
      const resp = await UserService.editUser(
        data,
        route.params.attribute === "cep" ? "/address" : ""
      );
      dispatch({ type: actions.user.storeUserInfo, data: resp });
      setLoadingModal(false);
      setModalVisible(false);
      Alert.alert(
        "Sucesso",
        "Alteração feita com sucesso!",
        [{ text: "OK", onPress: () => {} }],
        {
          cancelable: false,
        }
      );
    } catch (err) {
      setLoadingModal(false);
      setModalVisible(false);
      Alert.alert(
        "Ooops..",
        err.error || "Algo deu errado, tente novamente mais tarde",
        [{ text: "OK", onPress: () => {} }],
        {
          cancelable: false,
        }
      );
      console.log(err.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 5 : 0}
    >
      <ConfirmationModal
        visible={isModalVisible}
        setVisible={setModalVisible}
        action={handleEdit}
        message={"Tem certeza que deseja modificar esta informação?"}
        isLoading={loadingModal}
      />
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={styles.scroll}
      >
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <>
            {route.params.attribute !== "cep" ? (
              <Text style={styles.titleEdit}>
                Preencha o campo com a nova informação e pressione "Editar" para
                modificar.
              </Text>
            ) : (
              <></>
            )}
            <View style={styles.content}>
              {route.params.attribute === "phone" ? (
                <View style={styles.phoneView}>
                  <Text style={styles.label}>Telefone</Text>
                  <TextInputMask
                    style={[
                      styles.inputMask,
                      mainField === "" || isMainFieldValid
                        ? styles.valid
                        : styles.invalid,
                    ]}
                    type={"cel-phone"}
                    options={{
                      maskType: "BRL",
                      withDDD: true,
                      dddMask: "(99) ",
                    }}
                    value={mainField}
                    onChangeText={(text) => {
                      setMainField(text);

                      if (text.length >= 14) {
                        setMainFieldValid(true);
                      } else {
                        setMainFieldValid(false);
                      }
                    }}
                    placeholder="Digite seu telefone"
                  />
                </View>
              ) : (
                <View style={{ width: "100%" }}>
                  <Input
                    change={
                      route.params.attribute === "cep" ? cepHandle : handleValue
                    }
                    valid={isMainFieldValid}
                    label={route.params.attribute === "cep" ? "CEP" : "Nome"}
                    placeholder={`Digite seu ${
                      route.params.attribute === "cep" ? "CEP" : "Nome"
                    }`}
                    value={mainField}
                    keyboard={
                      route.params.attribute === "cep" ? "numeric" : "default"
                    }
                  />
                </View>
              )}

              {route.params.attribute === "cep" ? (
                <View style={{ width: "100%" }}>
                  <View style={styles.viewMargin}></View>
                  <Input
                    change={handleCity}
                    value={city}
                    label="Cidade"
                    placeholder="Digite sua cidade"
                  />
                  <View style={styles.viewMargin}></View>
                  <Input
                    change={stateHandle}
                    value={state}
                    label="UF"
                    placeholder="UF"
                  />
                  <View style={styles.viewMargin}></View>
                  <Input
                    change={handleNumber}
                    label="Número"
                    value={numberPlace}
                    keyboard="numeric"
                    placeholder="Digite o número de sua residência"
                  />
                  <View style={styles.viewMargin}></View>
                  <Input
                    change={handleComplement}
                    label="Complemento"
                    value={complement}
                    placeholder="Opcional"
                  />
                  <View style={styles.viewMargin}></View>
                </View>
              ) : (
                <></>
              )}
            </View>
            <Button
              style={styles.btnEdit}
              title="Editar"
              disabled={
                mainField === "" ||
                !isMainFieldValid ||
                (route.params.attribute === "cep" &&
                  (state === "" ||
                    city === "" ||
                    numberPlace === "" ||
                    complement === ""))
              }
              large
              press={() => setModalVisible(true)}
            />
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
