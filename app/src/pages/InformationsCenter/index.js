import React from 'react';
import { View, Text } from 'react-native';

import FaqCard from '../../components/FaqCard';

import styles from './styles';

export default function InformationsCenter() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}> Central de Informações </Text>
            </View>
            <View style={styles}>
                <FaqCard />
            </View>
        </View>
    );
}
