import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import offerHelpRecomendations from '../../../../docs/FAQ/HowToOfferHelp';
import styles from './styles';

export default function renderHowToOfferHelpStepsList() {
    return (
        <View style={styles.modalContent}>
            <ScrollView indicatorStyle="white">
                {offerHelpRecomendations.map((item) => (
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
