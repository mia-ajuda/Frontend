import React, { useState, useContext } from 'react';
import {
    Text,
    KeyboardAvoidingView,
    ScrollView,
    View,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import UserService from '../../../services/User';
import EntityService from '../../../services/Entity';
import colors from '../../../../assets/styles/colorVariables';
import Input from '../../../components/UI/input';
import Button from '../../../components/UI/button';
import styles from './styles';
import emailValidator from '../../../utils/emailValidator';
import passwordValidator from '../../../utils/passwordValidator';
import { DeviceInformationContext } from '../../../store/contexts/deviceInformationContext';
import { Icon } from 'react-native-elements';
import useService from '../../../services/useService';
import { alertError } from '../../../utils/Alert';

export default function RegistrationData({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loadingEmailAdressVerification, setLoadingEmailVerification] =
        useState(false);
    const { keyboard } = useContext(DeviceInformationContext);

    const continueHandler = () => {
        const userDatafromRegistrationPage = {
            email,
            password,
        };
        navigation.navigate('personalData', { userDatafromRegistrationPage });
    };

    const verifyEmailAdress = async () => {
        setLoadingEmailVerification(true);
        keyboard.dismiss();

        let isARegularUser = await useService(UserService, 'verifyUserInfo', [
            email.toLowerCase(),
        ]);
        if (!isARegularUser)
            isARegularUser = await useService(
                EntityService,
                'verifyEntityInfo',
                [email.toLowerCase()],
            );
        if (!isARegularUser.error) {
            if (isARegularUser) {
                alertError(
                    null,
                    'Esse email já está sendo usado por outro usuário',
                );
            } else {
                continueHandler();
            }
        }
        setLoadingEmailVerification(false);
    };

    const renderPageHeader = () => {
        if (keyboard.visible == false) {
            return (
                <View>
                    <View style={styles.backIcon}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.button}
                        >
                            <Icon name="arrow-back" color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.title}>
                        <Text style={styles.text1}>
                            Vamos começar seu cadastro, preencha seu email e
                            senha.
                        </Text>
                    </View>
                </View>
            );
        }
    };

    const renderInputEmailForm = () => {
        const emptyInput = email == '';
        const isEmailValid = emailValidator(email) || emptyInput;
        return (
            <Input
                style={styles.firstInput}
                change={(value) => setEmail(value.trim())}
                label="Email"
                value={email}
                placeholder="email@exemplo.com"
                valid={isEmailValid}
                autoComplete={'off'}
            />
        );
    };

    const renderInputPasswordForm = () => {
        const emptyInput = password == '';
        const isPasswordValid = passwordValidator(password) || emptyInput;
        return (
            <Input
                type="password"
                change={(password) => setPassword(password)}
                label="Senha (pelo menos 8 caracteres)"
                placeholder="Senha"
                valid={isPasswordValid}
            />
        );
    };

    const renderInputConfirmationPasswordForm = () => {
        const passwordMatch = confirmPassword == password;
        const passwordFormatValid = passwordValidator(confirmPassword);
        const emptyInput = confirmPassword == '';

        const isConfirmationPasswordValid =
            (passwordMatch && passwordFormatValid) || emptyInput;

        return (
            <Input
                change={(password) => setConfirmPassword(password)}
                label="Confirmar senha"
                placeholder="Confirme sua senha"
                type="password"
                valid={isConfirmationPasswordValid}
            />
        );
    };

    const renderLoadingIndicator = () => (
        <View style={styles.btnView}>
            <ActivityIndicator color={colors.primary} size="large" />
        </View>
    );

    const renderContinueButton = () => {
        const fieldsValid =
            emailValidator(email) &&
            passwordValidator(password) &&
            passwordValidator(confirmPassword);

        return (
            <Button
                disabled={!fieldsValid}
                title="Continuar"
                large
                press={verifyEmailAdress}
            />
        );
    };

    return (
        <KeyboardAvoidingView behavior="height" style={styles.safeAreaView}>
            {renderPageHeader()}
            <ScrollView
                style={
                    keyboard.visible ? styles.scrollOnUserTyping : styles.scroll
                }
                contentContainerStyle={styles.scrollContainerStyle}
            >
                <View style={styles.form}>
                    {renderInputEmailForm()}
                    {renderInputPasswordForm()}
                    {renderInputConfirmationPasswordForm()}
                </View>
            </ScrollView>
            {loadingEmailAdressVerification
                ? renderLoadingIndicator()
                : renderContinueButton()}
        </KeyboardAvoidingView>
    );
}
