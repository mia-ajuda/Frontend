import React from 'react';
import { View, Text } from 'react-native';
import CategoryTag from '../CategoryTag';
import styles from './styles';

export default function HelpInfo({ help }) {
    return (
        <View
            style={{
                alignItems: 'center',
                flexGrow: 1,
            }}>
            <Text style={styles.title}>{help.title}</Text>
            <CategoryTag category={help.category[0].name} />
            <Text style={(styles.text, styles.description)}>
                {help.description}
            </Text>
        </View>
    );
}
