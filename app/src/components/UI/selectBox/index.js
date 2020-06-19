import React, { useState, useEffect } from "react";
import { CheckBox } from "react-native-elements";
import styles from "./styles";
export default function SelectBox({
  setSelectedCategoryArray,
  filterCategoryArray,
  category,
  selectedCategoryArray,
}) {
  const [selectedItem, setSelectItem] = useState(
    filterCategoryArray.some((categoryId) => categoryId === category._id)
  );

  useEffect(() => {
    if (selectedItem) {
      setSelectedCategoryArray([...selectedCategoryArray, category._id]);
    } else {
      const removeFilter = filterCategoryArray.filter(
        (id) => id !== category._id
      );
      setSelectedCategoryArray(removeFilter);
    }
  }, [selectedItem]);

  return (
    <>
      <CheckBox
        title={category.name}
        textStyle={styles.checkBoxText}
        checkedIcon="check-square"
        checked={selectedItem}
        onPress={() => setSelectItem(!selectedItem)}
      />
    </>
  );
}
