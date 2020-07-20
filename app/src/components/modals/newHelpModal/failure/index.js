import React from 'react';
import { Modal, View, Text } from 'react-native';
import Button from '../../../UI/button';
import styles from './styles';

export default function NewHelpModal({ visible, onOkPressed, errorMessage }) {
    return (
        <View style={styles.modalContainer}>
            <Modal
                transparent={true}
                style={styles.modal}
                animationType="fade"
                visible={visible}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>
                        {errorMessage ||
                            'Houve algum problema com sua solicitação. Tente mais tarde.'}
                    </Text>

                    <Button
                        type="danger"
                        large
                        press={onOkPressed}
                        title="OK"
                    />
                </View>
            </Modal>
        </View>
    );
}
