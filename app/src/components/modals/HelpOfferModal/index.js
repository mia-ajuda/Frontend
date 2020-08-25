import React, { useState } from 'react';
import {
    View,
    Modal,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from 'react-native';
import Button from '../../UI/button';
import Input from '../../UI/input';

import styles from './styles';

export default function HelpOfferModal({ visible, setVisible }) {
    const [offerRequestDescription, setOfferRequestDescription] = useState(
        false,
    );
    console.log(offerRequestDescription);

    return (
        <Modal transparent visible={visible} animationType="fade">
            <TouchableOpacity
                style={styles.container}
                activeOpacity={1}
                onPress={() => setVisible(false)}>
                <TouchableWithoutFeedback>
                    <View style={styles.modalContent}>
                        <Input
                            label="Descreva um pouco de sua situção. Por que precisa dessa
                        ajuda?"
                            textarea
                            change={(text) => setOfferRequestDescription(text)}
                        />
                        <View style={styles.buttonContainer}>
                            <Button
                                customStyle={{ width: '40%' }}
                                title="Concluido"
                                press={() => setVisible(false)}
                            />
                            <Button
                                customStyle={{ width: '40%' }}
                                type="danger"
                                title="Cancelar"
                                press={() => setVisible(false)}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </TouchableOpacity>
        </Modal>
    );
}
