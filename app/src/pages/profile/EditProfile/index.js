import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, KeyboardAvoidingView } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import Button from "../../../components/UI/button";
import Input from "../../../components/UI/input";
import axios from "axios";
import styles from "./styles";

export default function EditProfile({ route }) {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [numberPlace, setNumberPlace] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [complement, setComplement] = useState("");
  const [loading, setLoading] = useState("");

  useEffect(() => {
    if (route.params.attribute === "phone") {
      setValue(route.params.user.phone.slice(3, 14));
    } else if (route.params.attribute === "name") {
      setValue(route.params.user.name);
    } else {
      const address = route.params.user.address;
      setValue(address.cep || "");
      setCity(address.city || "");
      setNumberPlace(String(address.number) || "");
      setComplement(address.complement || "");
      setState(address.state || "");
    }
  }, []);

  const cepHandle = async currentCep => {
    setValue(currentCep.substring(0, 8));

    if (currentCep.length === 8) {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://viacep.com.br/ws/${currentCep}/json/`
        );

        if (!response.data.error) {
          const { localidade, uf, logradouro, bairro } = response.data;

          setIsValid(true);
          setState(uf);
          setCity(localidade);
          setComplement(logradouro + " / " + bairro);
        } else {
          setIsValid(false);
        }
      } catch {
        setIsValid(true);
      }
    } else {
      setIsValid(false);
    }

    setLoading(false);
  };

  const stateHandle = enteredName => {
    if (enteredName.length > 2) {
      const subUf = enteredName.substring(0, 2);
      setState(subUf);
    } else {
      setState(enteredName);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 5 : 0}
    >
      <ScrollView
        style={{ width: "100%" }}
        contentContainerStyle={styles.scroll}
      >
        <View style={styles.content}>
          {route.params.attribute === "phone" ? (
            <View style={styles.phoneView}>
              <Text style={styles.label}>Telefone</Text>
              <TextInputMask
                style={[
                  styles.inputMask,
                  value === "" || isValid ? styles.valid : styles.invalid
                ]}
                type={"cel-phone"}
                options={{
                  maskType: "BRL",
                  withDDD: true,
                  dddMask: "(99) "
                }}
                value={value}
                onChangeText={text => {
                  setValue(text);

                  if (text.length >= 14) {
                    setIsValid(true);
                  } else {
                    setIsValid(false);
                  }
                }}
                placeholder="Digite seu telefone"
              />
            </View>
          ) : (
            <View style={{ width: "100%" }}>
              <Input
                change={cepHandle}
                valid={isValid}
                label={route.params.attribute === "cep" ? "CEP" : "Nome"}
                placeholder={`Digite seu ${
                  route.params.attribute === "cep" ? "CEP" : "Nome"
                }`}
                value={value}
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
                change={event => setCity(event.target.value)}
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
                change={event => setNumberPlace(event.target.value)}
                label="Número"
                value={numberPlace}
                keyboard="numeric"
                placeholder="Digite o número de sua residência"
              />
              <View style={styles.viewMargin}></View>
              <Input
                change={event => setComplement(event.target.value)}
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
          disabled={value === "" || !isValid}
          large
          press={() => {}}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
