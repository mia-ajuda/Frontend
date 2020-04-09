import React, { useState, useEffect } from "react";
import { CheckBox } from "react-native-elements";
import styles from "./styles";
export default function SelectBox({
  setFilterCategoryArray,
  filterCategoryArray,
  category,
}) {
  const [selected, setSelect] = useState(
    filterCategoryArray.some((categoryId) => categoryId === category._id)
  );

  useEffect(() => {
    if (selected) {
      setFilterCategoryArray([...filterCategoryArray, category._id]);
    } else {
      const removeFilter = filterCategoryArray.filter(
        (id) => id !== category._id
      );
      setFilterCategoryArray(removeFilter);
    }
  }, [selected]);

  return (
    <>
      <CheckBox
        title={category.name}
        textStyle={styles.checkBoxText}
        checkedIcon="check-square"
        checked={selected}
        onPress={() => setSelect(!selected)}
      />
    </>
  );
}
