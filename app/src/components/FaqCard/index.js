import React from 'react';
import { View, Text, Image } from 'react-native';

import styles from './styles';

export default function FaqCard() {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.info}>
                <Image
                    style={styles.image}
                    source={require('../../../assets/images/blueCat.png')}></Image>
                <Text style={styles.title} numberOfLines={2}>
                    Como usar o Mia-Ajuda?
                </Text>
            </View>
        </View>
    );
}
