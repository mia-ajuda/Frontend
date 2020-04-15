import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import styles from "./styles";
import Button from "../../../../components/UI/button";

export default function LocationModal({
  visible,
  onBackdropPress,
  setVisible,
  confirmSignUp
}) {
  return (
    <Modal
      isVisible={visible}
      style={styles.modal}
      onBackdropPress={onBackdropPress}
    >
      <View style={styles.modalContent}>
        <Text style={styles.modalText}>
          Podemos confirmar sua posição atual?
        </Text>
      </View>
      <View style={styles.modalButtonBox}>
        <View style={styles.modalButton}>
          <Button
            title="Não"
            type="danger"
            press={() => {
              setVisible(!visible);
            }}
          />
          <Button title="Sim" type="default" press={() => confirmSignUp()} />
        </View>
      </View>
    </Modal>
  );
}
