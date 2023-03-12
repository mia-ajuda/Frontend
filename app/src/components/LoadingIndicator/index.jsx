import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import colors from '../../../assets/styles/colorVariables';
import styles from './styles';

export const LoadingIndicator = () => {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );
};
