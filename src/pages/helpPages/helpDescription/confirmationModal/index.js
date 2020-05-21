import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Modal,
  ActivityIndicator,
} from "react-native";
import Button from "../../../../components/UI/button";
import styles from "./styles";
import colors from "../../../../../assets/styles/colorVariables";

export default function ConfirmationModal({
  visible,
  setVisible,
  action,
  message,
  isLoading,
}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableOpacity
        style={styles.container}
        onPress={() => setVisible(false)}
        activeOpacity={1}
      >
        <TouchableWithoutFeedback>
          <View style={styles.content}>
            {isLoading ? (
              <ActivityIndicator size="large" color={colors.primary} />
            ) : (
              <>
                <Text style={styles.title}>{message}</Text>
                <View style={styles.buttons}>
                  <Button
                    type="danger"
                    title="Não"
                    press={() => setVisible(false)}
                  />
                  <Button title="Sim" press={action} />
                </View>
              </>
            )}
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
}
