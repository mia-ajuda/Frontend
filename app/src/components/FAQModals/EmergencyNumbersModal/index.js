import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import emergencyNumbers from '../../../docs/FAQ/EmergencyNumbers';
import styles from './styles';
import { ModalComponent } from '../modal';

export default function EmergencyNumbers({ visible, setVisible }) {
    const renderEmergencyNumbersList = () => (
        <View style={styles.modalContent}>
            <ScrollView indicatorStyle="white">
                {emergencyNumbers.map((numbers) => {
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
        <ModalComponent visible={visible} setVisible={setVisible}>
            {renderEmergencyNumbersList()}
        </ModalComponent>
    );
}
