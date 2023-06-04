import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './styles';
import { StatusBar } from 'react-native';
import colors from '../../../colors';

export const ScreenTemplate = ({ children }) => {
    return (
        <SafeAreaView style={styles.templateContainer}>
            <StatusBar
                backgroundColor={colors.new_background}
                barStyle={'dark-content'}
            />
            {children}
        </SafeAreaView>
    );
};
