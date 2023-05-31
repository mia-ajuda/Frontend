import React from 'react';
import { Modal, ScrollView, Text, View } from 'react-native';
import styles from './styles';
import { FloatingIconButton } from '../molecules/FloatingIconButton';

export const ModalComponent = (props) => {

    return (
        <Modal
            visible={props.visible}
            transparent
            onRequestClose={() => props.setVisible(false)}
            animationType="fade"
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <FloatingIconButton
                        iconName={'close'}
                        onPress={() => {
                            props.setVisible(false);
                        }}
                    />
                    <ScrollView indicatorStyle="white">
                        {props.list.map((numbers) => {
                            return (
                                <View key={numbers.id}>
                                    <Text style={styles.title}> {numbers.number} </Text>
                                    <Text style={styles.description}>
                                        {' '}
                                        {numbers.description}{' '}
                                    </Text>
                                </View>
                            );
                        })}
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};
