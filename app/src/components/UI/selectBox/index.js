import React, { useState, useEffect } from "react";
import { CheckBox } from "react-native-elements";
import styles from "./styles";
import colors from "../../../../assets/styles/colorVariables"

export default function SelectBox({ title, onChange, select=false }) {
  // const [selected, setSelect] = useState(false);

  return (
    <>
      <CheckBox
        title={title}
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
