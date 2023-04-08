import React from 'react';
import NotFoundImage from '../../../../assets/images/notFoundImage';
import { styles } from './styles';
import { Text, View } from 'react-native';

export const NotFound = ({ title = 'Sem resultados', body }) => {
    return (
        <View style={styles.notFoundContainer}>
            <NotFoundImage />
            <Text style={styles.notFoundTitle}>{title}</Text>
            <Text style={styles.notFoundText}>{body}</Text>
        </View>
    );
};
