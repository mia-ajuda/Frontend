import React from "react";
import { View, Modal, Text, ScrollView, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import Container from "../../../Container";
import styles from "./styles";
import colors from "../../../../../assets/styles/colorVariables";

export default function CategoryDescriptionModal({
  visible,
  setVisible,
  categories,
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => setVisible(false)}
    >
      <View style={styles.modalContainer}>
        <Container>
          <TouchableOpacity
            onPress={() => {
              setVisible(false);
            }}
            style={styles.icon}
          >
            <Icon
              name="times-circle"
              type="font-awesome"
              color={colors.danger}
              size={35}
            />
          </TouchableOpacity>

          <View style={styles.modalContent}>
            <ScrollView indicatorStyle="white">
              {categories.map((category) => (
                <View key={category.title}>
                  <Text style={styles.title}>{category.title}</Text>
                  <Text style={styles.description}>{category.description}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </Container>
      </View>
    </Modal>
  );
}
