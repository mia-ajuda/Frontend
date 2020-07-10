import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export default function CategoryTag({ category }) {
    return (
        <View style={styles.tag}>
            <Text style={styles.text}> {category} </Text>
        </View>
    );
}
