import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Modal,
    ActivityIndicator,
} from 'react-native';
import Button from '../../UI/button';
import styles from './styles';
import colors from '../../../../assets/styles/colorVariables';

export default function ConfirmationModal({
    visible,
    setVisible,
    action,
    message,
    isLoading,
    attention,
}) {
    function whileRequestLoading() {
        if (!isLoading) {
            setVisible(false);
        }
    }

    const renderLoadingIndicator = () => (
        <ActivityIndicator size="large" color={colors.primary} />
    );

    function renderModalContent() {
        const attentionWarning = <Text style={styles.warning}>Atenção!</Text>;
        return (
            <>
                {attention == true ? attentionWarning : null}
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
                onPress={() => whileRequestLoading()}
                activeOpacity={1}>
                <TouchableWithoutFeedback>
                    <View style={styles.content}>
                        {isLoading
                            ? renderLoadingIndicator()
                            : renderModalContent()}
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    );
}
