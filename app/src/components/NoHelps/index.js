import React from 'react';
import styles from './styles';
import { View, Text, Image } from 'react-native';
export default function NoHelps({ title }) {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../../assets/images/blueCat.png')}
                style={styles.emptyListImage}
            />
            <Text style={styles.emptyListText}>{title}</Text>
        </View>
    );
}
