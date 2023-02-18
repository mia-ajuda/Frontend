import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import Button from '../../../components/UI/button';
import IntroSlides from '../../IntroSlides';
import styles from './styles';
export default function InitialScreen({ navigation }) {
    const [finishSlide, setFinishSlide] = useState(false);

    useEffect(() => {
        checkIfIsNewUser();
    }, []);

    const checkIfIsNewUser = async () => {
        const oldUser = await AsyncStorage.getItem('firstTimeUsingApp');
        if (oldUser) setFinishSlide(true);
    };

    const handleNavigateToLogin = () => navigation.navigate('login');

    const handleNavigateToRegister = () =>
        navigation.navigate('registrationData');
    return (
        <View style={styles.initialScreenContainer}>
            <IntroSlides
                finishSlide={finishSlide}
                setFinishSlide={setFinishSlide}
            />
            <Image
                style={styles.logo}
                source={require('../../../../assets/images/whileLogo.png')}
            />
            <Text style={styles.title}>
                Ajude pessoas perto de você e espalhe amor pelo mundo
            </Text>
            <Text style={styles.description}>
                Venha fazer parte de uma comunidade onde você pode ajudar
                pessoas ou ser ajudado
            </Text>
            <View style={styles.buttonsContainer}>
                <Button
                    title={'ACESSAR CONTA'}
                    press={handleNavigateToLogin}
                    type="white"
                    large
                />
                <Button
                    title={'CRIAR CONTA'}
                    press={handleNavigateToRegister}
                    type="outlined"
                    large
                />
            </View>
        </View>
    );
}
