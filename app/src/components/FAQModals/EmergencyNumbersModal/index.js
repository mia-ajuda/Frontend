import React from 'react';
import { Modal, ScrollView, TouchableOpacity, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import Container from '../../Container';
import colors from '../../../../assets/styles/colorVariables';
import styles from './styles';

export default function EmergencyNumbers({ visible, setVisible }) {
    const emergencyNumbers = [
        { id: '1', number: '100', description: 'Disque Direitos Humanos' },
        { id: '2', number: '156', description: 'Governo no Distrito Federal' },
        {
            id: '3',
            number: '180',
            description: 'Delegacias especializadas de atendimento à mulher',
        },
        { id: '4', number: '181', description: 'Disque Denúncia (Geral)' },
        { id: '5', number: '190', description: 'Polícia Militar' },
        { id: '6', number: '191', description: 'Polícia Rodoviária Federal' },
        { id: '7', number: '192', description: 'SAMU' },
        { id: '8', number: '193', description: 'Corpo de Bombeiros' },
        { id: '9', number: '194', description: 'Polícia Federal' },
        { id: '10', number: '197', description: 'Polícia Civil' },
        { id: '11', number: '(61) 3207-4242', description: 'DECRIN' },
    ];

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
        <Modal
            visible={visible}
            transparent
            onRequestClose={() => setVisible(false)}
            animationType="fade">
            <View style={styles.modalContainer}>
                <Container>
                    <TouchableOpacity
                        onPress={() => {
                            setVisible(false);
                        }}
                        style={styles.icon}>
                        <Icon
                            name="times-circle"
                            type="font-awesome"
                            color={colors.primary}
                            size={35}
                        />
                    </TouchableOpacity>
                    {renderEmergencyNumbersList()}
                </Container>
            </View>
        </Modal>
    );
}
