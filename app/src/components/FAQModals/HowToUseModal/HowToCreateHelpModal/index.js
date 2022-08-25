import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import createHelpRecomendations from '../../../../docs/FAQ/HowToCreateHelp';
import styles from './styles';

export default function renderHowToCreateHelpRequestStepsList() {
    return (
        <View style={styles.modalContent}>
            <ScrollView indicatorStyle="white">
                {createHelpRecomendations.map((item) => (
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
