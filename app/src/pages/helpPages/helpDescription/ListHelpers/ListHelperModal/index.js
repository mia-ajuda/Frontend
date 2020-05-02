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
  chooseHelper,
}) {
  const [isRegistrationLoading, setRegistrationLoading] = useState(false);

  const handlerModal = () => {
    try{
      setRegistrationLoading(!isRegistrationLoading);
      chooseHelper();
    } catch(err) {
      console.log(err);
    }

    setRegistrationLoading(!isRegistrationLoading);
  }

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
              Você tem certeza que quer Jobs como ajudante?
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
                press={() => handlerModal()}
              />
            </View>
          </View>
        </>
      )}
    </Modal>
  );
}
