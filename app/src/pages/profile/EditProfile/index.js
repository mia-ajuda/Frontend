import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";
import { TextInputMask } from "react-native-masked-text";
import Button from "../../../components/UI/button";
import Input from "../../../components/UI/input";
import colors from "../../../../assets/styles/colorVariables";
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

        if (!response.data.erro) {
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

  const handleCity = value => {
    setCity(value);
  };

  const handleNumber = value => {
    setNumberPlace(value);
  };

  const handleComplement = value => {
    setComplement(value);
  };

  const handleValue = value => {
    setValue(value);
  };

  const handleEdit = () => {
    let data = {};
    if (route.params.attribute === "cep") {
      data = {
        ...route.params.user,
        address: {
          number: numberPlace,
          complement,
          city,
          state
        }
      };
    } else if (route.params.attribute === "name") {
      data = {
        ...route.params.user,
        name: value
      };
    } else {
      data = {
        ...route.params.user,
        phone: value
      };
    }

    console.log(data);
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
        {loading ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <>
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
                    change={
                      route.params.attribute === "cep" ? cepHandle : handleValue
                    }
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
                value === "" ||
                !isValid ||
                (route.params.attribute === "cep" &&
                  (state === "" ||
                    city === "" ||
                    numberPlace === "" ||
                    complement === ""))
              }
              large
              press={() => handleEdit()}
            />
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
