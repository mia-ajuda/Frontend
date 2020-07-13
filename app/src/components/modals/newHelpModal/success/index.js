import React from 'react';
import { Modal, View, Text } from 'react-native';
import Button from '../../../UI/button';
import styles from './styles';

export default function NewHelpModal({ visible, setVisible }) {
    return (
        <View style={styles.modalContainer}>
            <Modal
                transparent={true}
                style={styles.modal}
                animationType="fade"
                visible={visible}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>
                        Sua solicitação de ajuda foi criada com sucesso!
                    </Text>

                    <Button
                        large
                        press={() => {
                            setVisible(!visible);
                        }}
                        title="OK"
                    />
                </View>
            </Modal>
        </View>
    );
}
