import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import styles from './styles';

export default function FaqCard({ faq }) {
    return (
        <View style={styles.cardContainer}>
            <TouchableOpacity>
                <View style={styles.info}>
                    <Image source={faq.icon}></Image>
                    <Text style={styles.title} numberOfLines={2}>
                        {faq.description}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
