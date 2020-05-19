import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import Button from "../../../components/UI/button";
import Input from "../../../components/UI/input";
import styles from "./styles";

export default function EditProfile({ route }) {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (route.params.attribute === "phone") {
      setValue(route.params.value.slice(3, 14));
    } else {
      setValue(route.params.value);
    }
  }, []);

  return (
    <View style={styles.container}>
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
              // change={cepHandle}
              valid={true}
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
      </View>
      <Button
        style={styles.btnEdit}
        title="Editar"
        disabled={value === "" || !isValid}
        large
        press={() => {}}
      />
    </View>
  );
}
