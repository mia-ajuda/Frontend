import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    KeyboardAvoidingView,
    Image,
    TextInput,
    TouchableOpacity,
    Text,
    ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SessionService from '../../../services/Session';
import Button from '../../../components/UI/button';
import colors from '../../../../assets/styles/colorVariables';
import IntroSlide from '../../../pages/IntroSlides';
import styles from './styles';
import { DeviceInformationContext } from '../../../store/contexts/deviceInformationContext';
import useService from '../../../services/useService';

export default function Login({ navigation }) {
    const { keyboard } = useContext(DeviceInformationContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loadingLoginRequest, setLoadingLoginRequest] = useState(false);
    const [isNewUser, setIsNewUser] = useState(false);
    const [finishSlide, setFinishSlide] = useState(false);

    useEffect(() => {
        checkIfIsNewUser();
        if (email && password) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [email, password]);

    const checkIfIsNewUser = async () => {
        const isNew = await AsyncStorage.getItem('firstTimeUsingApp');
        setIsNewUser(isNew);
    };

    const loginHandler = async () => {
        setLoadingLoginRequest(true);
        const data = { email: email.trim(), password };
        keyboard.dismiss();
        setLoadingLoginRequest(true);
        await useService(SessionService, 'signIn', [data]);
        setLoadingLoginRequest(false);
    };

    const renderIntroSlides = () => {
        if (isNewUser === null)
            return (
                <IntroSlide
                    finishSlide={finishSlide}
                    setFinishSlide={setFinishSlide}
                />
            );
    };
    const renderLoadingIndicator = () => (
        <ActivityIndicator size="large" color={colors.light} />
    );
    const renderLoginButton = () => (
        <Button
            large
            type="white"
            title="ENTRAR"
            press={loginHandler}
            disabled={buttonDisabled || loadingLoginRequest}
        />
    );

    return (
        <KeyboardAvoidingView style={styles.container} behavior="height">
            {renderIntroSlides()}
            <View style={styles.logo}>
                <Image
                    style={styles.logoImage}
                    source={require('../../../images/logo.png')}
                />
            </View>
            <View style={styles.input}>
                <TextInput
                    keyboardType="email-address"
                    style={styles.textInput}
                    placeholder="Email"
                    autoCorrect={false}
                    placeholderTextColor="#FFF"
                    onChangeText={(email) => setEmail(email)}
                    value={email}
                />

                <TextInput
                    style={styles.textInput}
                    secureTextEntry
                    placeholderTextColor="#FFF"
                    placeholder="Senha"
                    autoCorrect={false}
                    onChangeText={(password) => setPassword(password)}
                    value={password}
                />
            </View>
            <View style={styles.viewBtn}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('forgotPassword');
                    }}
                    style={styles.forgotPasswordButton}>
                    <Text style={styles.forgotPasswordtext}>
                        Esqueceu a senha?
                    </Text>
                </TouchableOpacity>
                <View style={styles.login}>
                    {loadingLoginRequest
                        ? renderLoadingIndicator()
                        : renderLoginButton()}
                </View>
                <TouchableOpacity
                    style={styles.signUP}
                    onPress={() => {
                        navigation.navigate('location');
                    }}>
                    <Text style={styles.signupText}>Criar Conta</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}
