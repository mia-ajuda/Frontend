import React from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import Button from "../../UI/button";
import styles from "./styles";

export default function ConfirmationModal({ visible, setVisible, behavior }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Text>{visible}</Text>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1}
        onPress={() => setVisible(false)}
      >
        <TouchableWithoutFeedback>
          <View style={styles.content}>
            <Text style={styles.title}> Atenção! </Text>
            <Text style={styles.warningText}>
              Você deseja deletar esse pedido de ajuda?
            </Text>
            <View style={styles.buttonContainer}>
              <Button title="Não" press={() => setVisible(false)} />
              <Button title="Sim" type="danger" press={behavior} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
}
