import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import styles from './styles';
import { Icon } from 'react-native-elements';

export default function PlusIconTextButton({ text, onPress }) {
    return (
        <View style={styles.createNewOfferButtonView}>
            <TouchableOpacity
                style={styles.plusButton}
                activeOpacity={0.8}
                onPress={onPress}
            >
                <Icon name="plus" type="font-awesome" color="#fff" size={16} />
                <Text style={styles.plusButtonText}>{text}</Text>
            </TouchableOpacity>
        </View>
    );
}
