import React, { useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import Modal from "react-native-modal";
import styles from "./styles";
import Button from "../../../../components/UI/button";
import colors from "../../../../../assets/styles/colorVariables";

export default function LocationModal({
  visible,
  onBackdropPress,
  setVisible,
  confirmSignUp,
}) {
  const [isRegistrationLoading, setRegistrationLoading] = useState(false);
  return (
    <Modal
      isVisible={visible}
      style={styles.modal}
      onBackdropPress={onBackdropPress}
    >
      {isRegistrationLoading ? (
        <ActivityIndicator color={colors.primary} size="large" />
      ) : (
        <>
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
              <Button
                title="Sim"
                type="default"
                press={() => {
                  confirmSignUp();
                  setRegistrationLoading(!isRegistrationLoading);
                }}
              />
            </View>
          </View>
        </>
      )}
    </Modal>
  );
}
