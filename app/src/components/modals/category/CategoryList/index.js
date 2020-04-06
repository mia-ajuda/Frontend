import React, { useState } from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import Buttom from "../../../UI/button";
import SelectBox from "../../../UI/selectBox";
import styles from "./styles";
import { Icon } from "react-native-elements";
import Container from "../../../Container";
import CategoryDescriptionModal from "../categoryDescription";
export default function CategoryList({ visible, setVisible }) {
  const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
  const categories = [
    {
      title: "category 1",
      description:
        "Lorem ipsum vivamus lectus rutrum ac lorem sodales quam, suspendisse iaculis mi nisi aenean vestibulum adipiscing mauris phasellus, inceptos fusce placerat quisque consequat leo class. sagittis cur",
    },
    {
      title: "category 2",
      description:
        "Lorem ipsum vivamus lectus rutrum ac lorem sodales quam, suspendisse iaculis mi nisi aenean vestibulum adipiscing mauris phasellus, inceptos fusce placerat quisque consequat leo class. sagittis cur",
    },
    {
      title: "category 3",
      description:
        "Lorem ipsum vivamus lectus rutrum ac lorem sodales quam, suspendisse iaculis mi nisi aenean vestibulum adipiscing mauris phasellus, inceptos fusce placerat quisque consequat leo class. sagittis cur",
    },
    {
      title: "category 4",
      description:
        "Lorem ipsum vivamus lectus rutrum ac lorem sodales quam, suspendisse iaculis mi nisi aenean vestibulum adipiscing mauris phasellus, inceptos fusce placerat quisque consequat leo class. sagittis cur",
    },
    {
      title: "category 5",
      description:
        "Lorem ipsum vivamus lectus rutrum ac lorem sodales quam, suspendisse iaculis mi nisi aenean vestibulum adipiscing mauris phasellus, inceptos fusce placerat quisque consequat leo class. sagittis cur",
    },
    {
      title: "category 6",
      description:
        "Lorem ipsum vivamus lectus rutrum ac lorem sodales quam, suspendisse iaculis mi nisi aenean vestibulum adipiscing mauris phasellus, inceptos fusce placerat quisque consequat leo class. sagittis cur",
    },
    {
      title: "category 7",
      description:
        "Lorem ipsum vivamus lectus rutrum ac lorem sodales quam, suspendisse iaculis mi nisi aenean vestibulum adipiscing mauris phasellus, inceptos fusce placerat quisque consequat leo class. sagittis cur",
    },
    {
      title: "category 8",
      description:
        "Lorem ipsum vivamus lectus rutrum ac lorem sodales quam, suspendisse iaculis mi nisi aenean vestibulum adipiscing mauris phasellus, inceptos fusce placerat quisque consequat leo class. sagittis cur",
    },
    {
      title: "category 9",
      description:
        "Lorem ipsum vivamus lectus rutrum ac lorem sodales quam, suspendisse iaculis mi nisi aenean vestibulum adipiscing mauris phasellus, inceptos fusce placerat quisque consequat leo class. sagittis cur",
    },
  ];
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <TouchableOpacity
        style={styles.modalContainer}
        activeOpacity={1}
        onPress={() => {
          setVisible(false);
        }}
      >
        <TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <View style={styles.contentHeader}>
              <Text style={styles.title}>Categorias</Text>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => {
                  setDescriptionModalVisible(!descriptionModalVisible);
                }}
              >
                <Icon
                  name="question-circle"
                  type="font-awesome"
                  color="#C4C4C4"
                  size={40}
                />
              </TouchableOpacity>
            </View>
            <Container>
              <CategoryDescriptionModal
                visible={descriptionModalVisible}
                setVisible={setDescriptionModalVisible}
                categories={categories}
              />
              <ScrollView style={styles.modalBody}>
                {categories.map((category) => (
                  <SelectBox key={category.title} title={category.title} />
                ))}
                <Buttom title="Filtrar" type="warning" press={() => {}} large />
              </ScrollView>
            </Container>
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
}
