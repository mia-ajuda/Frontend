import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import howToChoseHelpOfferRecomendations from '../../../../docs/FAQ/HowToChooseHelpOffered';
import styles from './styles';

export default function renderHowToChoseHelpOfferStepsList() {
    return (
        <View style={styles.modalContent}>
            <ScrollView indicatorStyle="white">
                {howToChoseHelpOfferRecomendations.map((item) => (
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
}
