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
        style={styles.backButton}
        onPress={() => setVisible(false)}
      >
        <Icon
          name="chevron-left"
          type="font-awesome"
          size={25}
        />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={{ margin: 20,     marginVertical: 45 }}
        showsVerticalScrollIndicator={false}
      >
        <Markdown>{privacy}</Markdown>
      </ScrollView>
    </Modal>
  );
}
