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
            <View style={styles.cardDescription}>
                <Text numberOfLines={3} style={styles.descriptionContent}>
                    {help.description}
                </Text>
                <View style={styles.bottomItens}>
                    <View style={styles.categoryContainer}>
                        {help.categories.map((category) => (
                            <View
                                key={category._id}
                                style={styles.categoryWarning}>
                                <Text style={styles.categoryName}>
                                    {category.name}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
            {children}
        </View>
    );
}
