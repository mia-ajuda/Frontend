import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import Button from "../../../../components/UI/button";
import styles from "./styles";

export default function ConfirmationModal({ visible, setVisible, chooseHelp }) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableOpacity
        style={styles.container}
        onPress={() => setVisible(false)}
        activeOpacity={1}
      >
        <TouchableWithoutFeedback>
          <View style={styles.content}>
            <Text style={styles.title}>Você deseja confirmar a sua ajuda?</Text>
            <View style={styles.buttons}>
              <Button
                type="danger"
                title="Não"
                press={() => setVisible(false)}
              />
              <Button title="Sim" press={chooseHelp} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
}
