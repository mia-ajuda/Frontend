import React from 'react';
import { Modal, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../../../assets/styles/colorVariables';
import Container from '../Container';
import styles from './styles';

export const ModalComponent = (props) => {
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
                    {props.children}
                </Container>
            </View>
        </Modal>
    );
};
