import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import styles from "./styles";
import Button from "../../../../components/UI/button";

export default function LocationModal({
  visible,
  setVisible,
  continueRegistration,
}) {
  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(false)}
      transparent={true}
      animationType="fade"
    >
      <TouchableOpacity
        style={{
          height: "100%",
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.8)",
        }}
        activeOpacity={1}
        onPress={() => setVisible(false)}
      >
        <TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Podemos confirmar sua posição atual?
            </Text>
            <View style={styles.modalButton}>
              <Button
                title="Não"
                type="danger"
                press={() => {
                  setVisible(!visible);
                }}
              />
              <Button title="Sim" type="default" press={continueRegistration} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
}
