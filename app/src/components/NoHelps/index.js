import React from 'react';
import styles from './styles';
import { View, Text, Image } from 'react-native';
export default function NoHelps({ title, color }) {
    const catImageColor =
        color == 'light'
            ? require('../../../assets/images/whiteCat.png')
            : require('../../../assets/images/blueCat.png');
    return (
        <View style={styles.container}>
            <Image source={catImageColor} style={styles.emptyListImage} />
            <Text
                style={
                    color == 'light'
                        ? styles.emptyListTextLight
                        : styles.emptyListTextPrimary
                }>
                {title}
            </Text>
        </View>
    );
}
