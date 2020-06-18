import React from "react";
import { Modal, TouchableOpacity, ScrollView, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import colors from "../../../../assets/styles/colorVariables";
import styles from "./style";
import Markdown from "react-native-markdown-display";
import privacy from "./privacy"

export default function PrivacyPolicyModal({ visible, setVisible }) {

  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(false)}
      animationType="slide"
    >
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => setVisible(false)}
      >
        <Icon
          name="times-circle"
          type="font-awesome"
          color={colors.danger}
          size={35}
        />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={{ margin: 20,     marginVertical: 45 , paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        <Markdown>{privacy}</Markdown>
      </ScrollView>
    </Modal>
  );
}
