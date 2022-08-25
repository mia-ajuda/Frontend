import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import helpOfferedRecomendations from '../../../../docs/FAQ/HelpRequestRecomendations';
import styles from './styles';
import { ModalComponent } from '../../modal';

export default function HelpRequestModal({ visible, setVisible }) {
    const renderImportantRecomendations = () => (
        <View style={styles.modalContent}>
            <ScrollView indicatorStyle="white">
                {helpOfferedRecomendations.map((item) => (
                    <View key={item.id}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.description}>
                            {item.description}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );

    return (
        <ModalComponent visible={visible} setVisible={setVisible}>
            {renderImportantRecomendations()}
        </ModalComponent>
    );
}
