import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export default function HelpCard({ help, isRiskGroup, children }) {
    return (
        <View
            style={
                isRiskGroup
                    ? styles.cardContainerRiskGroup
                    : styles.cardContainer
            }>
            <View style={styles.cardTitle}>
                <Text numberOfLines={1} style={styles.titleContent}>
                    {help.title}
                </Text>
            </View>
            <View style={styles.categoryWarning}>
                <Text style={styles.categoryName}> {help.category.name} </Text>
            </View>
            {children}
        </View>
    );
}
