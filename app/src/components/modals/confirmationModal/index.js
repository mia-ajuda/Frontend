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

    return (
        <Modal visible={visible} transparent animationType="fade">
            <Text>{visible}</Text>
            <TouchableOpacity
                style={styles.container}
                onPress={() => whileRequestLoading()}
                activeOpacity={1}>
                <TouchableWithoutFeedback>
                    <View style={styles.content}>
                        {isLoading ? (
                            <ActivityIndicator
                                size="large"
                                color={colors.primary}
                            />
                        ) : (
                            <>
                                {attention ? (
                                    <Text style={styles.warning}>
                                        {' '}
                                        Atenção!{' '}
                                    </Text>
                                ) : null}
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
                        )}
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    );
}
