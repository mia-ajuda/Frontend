import React from 'react';
import { Modal, ScrollView, TouchableOpacity, View, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import Container from '../../Container';
import colors from '../../../../assets/styles/colorVariables';
import emergencyNumbers from '../../../docs/FAQ/EmergencyNumbers';
import styles from './styles';

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
        <Modal
            visible={visible}
            transparent
            onRequestClose={() => setVisible(false)}
            animationType="fade"
        >
            <View style={styles.modalContainer}>
                <Container>
                    <TouchableOpacity
                        onPress={() => {
                            setVisible(false);
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
                    {renderEmergencyNumbersList()}
                </Container>
            </View>
        </Modal>
    );
}
