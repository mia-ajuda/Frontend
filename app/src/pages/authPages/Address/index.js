import React, { useState, useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  Text,
  ScrollView,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import Input from "../../../components/UI/input";
import Button from "../../../components/UI/button";
import styles from "./styles";
import { Icon } from "react-native-elements";

export default function Address({ route, navigation }) {
  const dataUser = route.params.userData;
  const [cep, setCep] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [complement, setComplement] = useState("");
  const [numberPlace, setNUmberPlace] = useState("");
  const [keyboardShow, setKeyboardShow] = useState(false);

  useEffect(() => {
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

  const cepHandle = (enteredName) => {
    setCep(enteredName);
  };

  const cityHandle = (enteredName) => {
    setCity(enteredName);
  };

  const stateHandle = (enteredName) => {
    if (enteredName.length > 2) {
      const subUf = enteredName.substring(0, 2);
      setState(subUf);
    } else {
      setState(enteredName);
    }
  };

  const complementHandle = (enteredName) => {
    setComplement(enteredName);
  };

  const numberHandle = (enteredName) => {
    setNUmberPlace(enteredName);
  };

  const continueHandler = () => {
    const address = { cep, city, state, number: numberPlace, complement };
    const userData = { ...dataUser, address };
    navigation.navigate("riskGroup", { userData });
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
              <Icon name={"arrow-back"} color={"black"} />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.text1}>
              Precisamos de algumas informações sobre onde você mora!! Por favor
              preencha as informações abaixo?
            </Text>
          </View>
        </View>
      ) : (
        <></>
      )}
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.inputView}>
          <Input
            change={cepHandle}
            label="CEP"
            placeholder="Digite seu CEP"
            keyboard="numeric"
          />
          <View style={styles.viewMargin}></View>
          <Input
            change={cityHandle}
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
            change={numberHandle}
            label="Número"
            placeholder="Digite o número de sua residência"
            keyboard="numeric"
          />
          <View style={styles.viewMargin}></View>
          <Input
            change={complementHandle}
            label="Complemento"
            placeholder="Opcional"
          />
          <View style={styles.viewMargin}></View>
        </View>
      </ScrollView>
      <View style={styles.btnView}>
        <Button
          title="Continuar"
          disabled={
            cep === "" || city === "" || state === "" || numberPlace === ""
          }
          large
          press={continueHandler}
        />
      </View>
    </KeyboardAvoidingView>
  );
}
