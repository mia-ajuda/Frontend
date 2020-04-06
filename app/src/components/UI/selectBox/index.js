import React, { useState, useEffect } from "react";
import { CheckBox } from "react-native-elements";
import styles from "./styles";
export default function SelectBox({ title }) {
  const [selected, setSelect] = useState(false);

  return (
    <>
      <CheckBox
        title={title}
        textStyle={styles.checkBoxText}
        checkedIcon="check-square"
        checked={selected}
        onPress={() => setSelect(!selected)}
      />
    </>
  );
}
