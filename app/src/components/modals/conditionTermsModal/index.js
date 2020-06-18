import React, {useState} from "react";
import { Modal, TouchableOpacity, ScrollView, Text, View } from "react-native";
import { Icon } from "react-native-elements";
import colors from "../../../../assets/styles/colorVariables";
import styles from "./style";
import Markdown from "react-native-markdown-display";
import terms from "./terms";


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
      <ScrollView
        contentContainerStyle={{ margin: 20, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View style ={{marginTop:15}}>
          <Markdown>{terms}</Markdown>
        </View>
      </ScrollView>
    </Modal>
  );
}
