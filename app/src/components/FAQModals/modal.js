import React from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../../../assets/styles/colorVariables';
import Container from '../Container';
import styles from './styles';

export const ModalComponent = (props) => {
    const renderModalList = (list) => (
        <View style={styles.modalContent}>
            <ScrollView indicatorStyle="white">
                {list.map((numbers) => {
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
    );

    return (
        <Modal
            visible={props.visible}
            transparent
            onRequestClose={() => props.setVisible(false)}
            animationType="fade"
        >
            <View style={styles.modalContainer}>
                <Container>
                    <TouchableOpacity
                        onPress={() => {
                            props.setVisible(false);
                        }}
                        style={styles.icon}
                    >
                        <Icon
                            name="times-circle"
                            type="font-awesome"
                            color={colors.primary}
                            size={35}
                        />
                    </TouchableOpacity>
                    {props.list ? renderModalList(props.list) : props.children}
                </Container>
            </View>
        </Modal>
    );
};
