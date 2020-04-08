import React, { useState } from "react";
import { View, Text } from "react-native";
import Modal from 'react-native-modal';
import styles from './styles';

export default function LocationModal(props) {
  const { modalIsVisible, onBackdropPress } = props;
  return (
        <Modal 
            isVisible={modalIsVisible} 
            style={styles.modal}
            onBackdropPress={onBackdropPress}
        >
            <View style={{flex:1}}>
              <Text>This is the modal content for now!</Text>
            </View>
      </Modal>
    );
}