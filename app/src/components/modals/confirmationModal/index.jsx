import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal,
} from 'react-native';
import Button from '../../UI/button';
import styles from './styles';

export default function ConfirmationModal({
    visible,
    setVisible,
    action,
    message,
    attention,
}) {
    function renderModalContent() {
        const attentionWarning = <Text style={styles.warning}>Atenção!</Text>;
        return (
            <>
                {attention ? attentionWarning : null}
                <Text style={styles.title}>{message}</Text>
                <View style={styles.buttons}>
                    <Button
                        type="danger"
                        title="Não"
                        press={() => setVisible(false)}
                    />
                    <Button title="Sim" press={action} />
                </View>
            </>
        );
    }

    return (
        <Modal visible={visible} transparent animationType="fade">
            <TouchableOpacity
                style={styles.container}
                onPress={() => setVisible(false)}
                activeOpacity={1}
            >
                <TouchableWithoutFeedback>
                    <View style={styles.content}>{renderModalContent()}</View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    );
}
