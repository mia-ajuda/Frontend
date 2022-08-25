import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import helpOfferedRecomendations from '../../../../docs/FAQ/HelpOfferedRecomendations';
import { ModalComponent } from '../../modal';
import styles from './styles';

export default function HelpOfferedModal({ visible, setVisible }) {
    const renderRecomendationsList = () => (
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
            {renderRecomendationsList()}
        </ModalComponent>
    );
}
