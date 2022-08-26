import React from 'react';
import { View, Image, StatusBar, ActivityIndicator } from 'react-native';
import colors from '../../../assets/styles/colorVariables';
import styles from './styles';

export default function Splash({ showLoading = false }) {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <View style={styles.container}>
                <Image
                    source={require('../../../assets/images/splash.png')}
                    style={styles.image}
                />
                {showLoading && (
                    <View style={styles.footer}>
                        <ActivityIndicator size="large" color={colors.light} />
                    </View>
                )}
            </View>
        </>
    );
}
