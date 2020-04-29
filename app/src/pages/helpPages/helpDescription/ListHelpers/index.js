import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import styles from './styles';

export default function ListHelpers() {
  return (
    <View  style={styles.container}>
      <TouchableOpacity style={styles.buttonHelpers}>
        <Text style={styles.textBtn}>Possíveis ajudantes</Text>
      </TouchableOpacity>
    </View>
  );
}
