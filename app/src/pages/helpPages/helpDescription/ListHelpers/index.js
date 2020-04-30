import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

import styles from './styles';

export default function ListHelpers({ clickAction, stateAction }) {
  return (
    <View  style={[styles.container, stateAction ? { justifyContent: 'flex-start'} : {justifyContent: 'flex-end'}]}>
      <TouchableOpacity 
        style={styles.buttonHelpers}
        onPress={() => clickAction(!stateAction)}
      >
        <Text style={styles.textBtn}>Possíveis ajudantes</Text>
      </TouchableOpacity>
      {
        stateAction ? (
          <View style={styles.listPossibleHelpers}>
            <ScrollView>
            </ScrollView>
          </View>
        ) : (
          <></>
        )         
      }
    </View>
  );
}
