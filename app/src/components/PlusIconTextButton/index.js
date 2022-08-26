import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

import styles from './styles';

export default function PlusIconTextButton({ text, onPress }) {
    return (
        <View style={styles.createNewOfferButtonView}>
            <TouchableOpacity
                style={styles.plusButton}
                activeOpacity={0.8}
                onPress={onPress}
            >
                <FontAwesome name="plus" size={16} color="#fff" />
                <Text style={styles.plusButtonText}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
}
