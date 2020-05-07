import React from "react";
import { Modal, TouchableOpacity, View, Text } from "react-native";
import { WebView } from "react-native-webview";
import { Icon } from "react-native-elements";

export default function TermsModal({ visible, setVisible }) {
  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(false)}
      animationType="slide"
    >
      <WebView
        style={{ flex: 1 }}
        source={{
          uri: "https://mia-ajuda.github.io/Documentation/#/_docs/termos",
        }}
      />
    </Modal>
  );
}
