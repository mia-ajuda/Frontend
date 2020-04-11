import React, { useState, useEffect } from "react";
import { CheckBox } from "react-native-elements";
import styles from "./styles";
import colors from "../../../../assets/styles/colorVariables"

export default function SelectBox({
  setSelectedCategoryArray,
  filterCategoryArray,
  category,
  selectedCategoryArray,
  title,
  onChange,
  select=false
}) {
  const [selected, setSelect] = useState(
    filterCategoryArray.some((categoryId) => categoryId === category._id)
  );

  useEffect(() => {
    if (selected) {
      setSelectedCategoryArray([...selectedCategoryArray, category._id]);
    } else {
      const removeFilter = filterCategoryArray.filter(
        (id) => id !== category._id
      );
      setSelectedCategoryArray(removeFilter);
    }
  }, [selected]);

  return (
    <>
      <CheckBox
        title={category.name || title}
        textStyle={styles.checkBoxText}
        checkedIcon="check-square"
        checked={select}
        onPress={onChange}
        containerStyle={styles.container}
        checkedColor={colors.primary}
        uncheckedColor={colors.primary}
      />
    </>
  );
}
