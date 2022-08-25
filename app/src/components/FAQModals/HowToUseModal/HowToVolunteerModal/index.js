import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import howToVolunteerRecomendations from '../../../../docs/FAQ/HowToBeVolunteer';
import styles from './styles';

export default function renderHowToVolunteerStepsList() {
    return (
        <View style={styles.modalContent}>
            <ScrollView indicatorStyle="white">
                {howToVolunteerRecomendations.map((item) => (
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
