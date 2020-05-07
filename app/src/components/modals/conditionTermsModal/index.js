import React from "react";
import { Modal, TouchableOpacity, View, Text } from "react-native";
import { WebView } from "react-native-webview";
import { Icon } from "react-native-elements";
import colors from "../../../../assets/styles/colorVariables";
import styles from "./style";

export default function TermsModal({ visible, setVisible }) {
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

      <WebView
        style={styles.webView}
        source={{
          uri: "https://mia-ajuda.github.io/Documentation/#/_docs/termos",
        }}
      />
    </Modal>
  );
}
