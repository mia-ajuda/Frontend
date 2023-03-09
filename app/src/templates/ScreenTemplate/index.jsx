import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';

export const ScreenTemplate = ({ children }) => {
    return (
        <SafeAreaView style={styles.templateContainer}>{children}</SafeAreaView>
    );
};
