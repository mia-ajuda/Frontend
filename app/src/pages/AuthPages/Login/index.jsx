import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    KeyboardAvoidingView,
    Image,
    TextInput,
    TouchableOpacity,
    Text,
} from 'react-native';
import SessionService from '../../../services/Session';
import Button from '../../../components/UI/button';
import styles from './styles';
import { DeviceInformationContext } from '../../../store/contexts/deviceInformationContext';
import callService from '../../../services/callService';
import { LoadingContext } from '../../../store/contexts/loadingContext';

export default function Login({ navigation }) {
    const { keyboard } = useContext(DeviceInformationContext);
    const { isLoading, setIsLoading } = useContext(LoadingContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(false);

    useEffect(() => {
        if (email && password) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [email, password]);

    const loginHandler = async () => {
        setIsLoading(true);
        const data = { email: email.trim(), password };
        keyboard.dismiss();
        await callService(SessionService, 'signIn', [data]);
        setIsLoading(false);
    };

    const renderLoginButton = () => (
        <Button
            large
            type="white"
            title="ENTRAR"
            press={loginHandler}
            disabled={buttonDisabled || isLoading}
        />
    );

    return (
        <KeyboardAvoidingView style={styles.container} behavior="height">
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
                    style={styles.forgotPasswordButton}
                >
                    <Text style={styles.forgotPasswordtext}>
                        Esqueceu a senha?
                    </Text>
                </TouchableOpacity>
                <View style={styles.login}>
                    {!isLoading && renderLoginButton()}
                </View>
                <TouchableOpacity
                    style={styles.signUP}
                    onPress={() => {
                        navigation.navigate('registrationData');
                    }}
                >
                    <Text style={styles.signupText}>Criar Conta</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}
