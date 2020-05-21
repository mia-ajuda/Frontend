import React, { useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import Modal from "react-native-modal";
import styles from "./styles";
import Button from "../../../../../components/UI/button";
import colors from "../../../../../../assets/styles/colorVariables";

export default function ListHelperModal({
  visible,
  onBackdropPress,
  setVisible,
  actionModal, 
  message
}) {
  const [isRegistrationLoading, setRegistrationLoading] = useState(false);

  const handlerModal = () => {
    try {
      setRegistrationLoading(true);
      actionModal();
    } catch (err) {
      console.log(err);
    }

    setRegistrationLoading(false);
    setVisible(!visible);
  };

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
              {message}
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
              <Button title="Sim" type="default" press={() => handlerModal()} />
            </View>
          </View>
        </>
      )}
    </Modal>
  );
}
