import React, { useState, useContext } from "react";
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
import CategoryDescriptionModal from "../categoryDescription";
import { CategoryContext } from "../../../../store/contexts/categoryContext";
import { HelpContext } from "../../../../store/contexts/helpContext";
import { UserContext } from "../../../../store/contexts/userContext";
import HelpService from "../../../../services/Help";
import actions from "../../../../store/actions";

export default function CategoryList({ visible, setVisible }) {
  const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
  const [selectedCategoryArray, setSelectedCategoryArray] = useState([]);
  const { categories, setSelectedCategories, selectedCategories } = useContext(CategoryContext);
  const { user } = useContext(UserContext);

  async function filterHelplist() {
    setSelectedCategories(selectedCategoryArray)
    setVisible(!visible);
  }

  async function clearFilterHelplist() {
    setSelectedCategories([])
    setVisible(!visible);
  }

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={() => setVisible(false)}
    >
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
            <CategoryDescriptionModal
              visible={descriptionModalVisible}
              setVisible={setDescriptionModalVisible}
            />
            <ScrollView style={styles.modalBody}>
              {categories.map((category) => (
                <SelectBox
                  key={category._id}
                  title={category.name}
                  filterCategoryArray={selectedCategories}
                  setSelectedCategoryArray={setSelectedCategoryArray}
                  selectedCategoryArray={selectedCategoryArray}
                  category={category}
                />
              ))}
            </ScrollView>
            {selectedCategories.length ? (
              <View style={styles.filterButtons}>
                <Buttom
                  title="Filtrar"
                  type="warning"
                  press={() => {
                    filterHelplist();
                  }}
                />
                <Buttom
                  title="Limpar"
                  type="primary"
                  press={() => {
                    clearFilterHelplist();
                  }}
                />
              </View>
            ) : (
              <Buttom
                title="Filtrar"
                type="warning"
                large
                press={() => {
                  filterHelplist();
                }}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      </TouchableOpacity>
    </Modal>
  );
}
