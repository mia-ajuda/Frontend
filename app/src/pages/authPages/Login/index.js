import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    KeyboardAvoidingView,
    Image,
    TextInput,
    TouchableOpacity,
    Text,
    Alert,
    ActivityIndicator,
    Keyboard,
    Platform,
} from 'react-native';
import UserService from '../../../services/User';
import Button from '../../../components/UI/button';
import colors from '../../../../assets/styles/colorVariables';

import styles from './styles';
import { UserContext } from '../../../store/contexts/userContext';
import actions from '../../../store/actions';

export default function Login({ navigation }) {
    const { dispatch } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loadingLoginRequest, setLoadingLoginRequest] = useState(false);

    useEffect(() => {
        if (email && password) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [email, password]);

    const loginHandler = async () => {
        const data = { email: email.trim(), password };
        Keyboard.dismiss();

        try {
            setLoadingLoginRequest(true);
            const user = await UserService.logIn(data);
            setLoadingLoginRequest(false);
            if (user) {
                dispatch({ type: actions.user.storeUserInfo, data: user });
            }
        } catch (err) {
            console.log(err);
            setLoadingLoginRequest(false);
            Alert.alert(
                'Ooops..',
                err.message,
                [{ text: 'OK', onPress: () => {} }],
                {
                    cancelable: false,
                },
            );
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
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
                    {loadingLoginRequest ? (
                        <ActivityIndicator size="large" color={colors.light} />
                    ) : (
                        <Button
                            large
                            type="white"
                            title="ENTRAR"
                            press={loginHandler}
                            disabled={buttonDisabled || loadingLoginRequest}
                        />
                    )}
                </View>
                <TouchableOpacity
                    style={styles.signUP}
                    onPress={async () => {
                        navigation.navigate('location');
                    }}>
                    <Text style={styles.signupText}>Criar Conta</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}
