import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

export default function ListHelpers({ clickAction, stateAction }) {
  return (
    <View  style={styles.container}>
      <TouchableOpacity 
        style={styles.buttonHelpers}
        onPress={() => clickAction(!stateAction)}
      >
        <Text style={styles.textBtn}>Possíveis ajudantes</Text>
      </TouchableOpacity>
    </View>
  );
}
