import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';
export default function HistoricCard({ object, isRiskGroup, children }) {
    return (
        <View
            style={
                isRiskGroup
                    ? styles.cardContainerRiskGroup
                    : styles.cardContainer
            }>
            <View style={styles.cardTitle}>
                <Text numberOfLines={1} style={styles.titleContent}>
                    {object.title}
                </Text>
            </View>
            <View style={styles.cardDescription}>
                <Text numberOfLines={3} style={styles.descriptionContent}>
                    {object.description}
                </Text>

                <Image
                    source={
                        isRiskGroup
                            ? require('../../../assets/images/exclamationRed.png')
                            : require('../../../assets/images/exclamation.png')
                    }
                    style={styles.imageBackground}></Image>
                <View style={styles.bottomItens}>
                    <View style={styles.categoryContainer}>
                        {object.categories.map((category) => (
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
