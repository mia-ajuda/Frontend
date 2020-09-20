import React from 'react';
import { View, Image, StatusBar } from 'react-native';
import styles from './styles';

export default function Splash() {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <View style={styles.container}>
                <Image
                    source={require('../../../assets/images/splash.png')}
                    style={styles.image}
                />
            </View>
        </>
    );
}
