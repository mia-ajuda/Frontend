import React, { useState, useContext } from 'react';

import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';
import Input from '../../../components/UI/input';
import colors from '../../../../assets/styles/colorVariables';
import Button from '../../../components/UI/button';
import { Icon } from 'react-native-elements';
import styles from './styles';
import checkEmailFormat from '../../../utils/emailValidator';
import firebaseService from '../../../services/Firebase';
import { alertSuccess } from '../../../utils/Alert';
import callService from '../../../services/callService';
import { LoadingContext } from '../../../store/contexts/loadingContext';

export default function ForgotPassword({ navigation }) {
    const { isLoading, setIsLoading } = useContext(LoadingContext);

    const navigateBackToLoginPage = () => navigation.goBack();

    const [email, setEmail] = useState('');
    const [isEmailFormatValid, setIsEmailFormatValid] = useState(false);
    const handlerSubmit = async () => {
        setIsLoading(true);
        const resetPasswordRequest = await callService(
            firebaseService,
            'resetUserPassword',
            [email.trim().toLowerCase()],
        );
        if (!resetPasswordRequest.error) {
            navigateBackToLoginPage();
            alertSuccess(
                'Email enviado com sucesso! Por favor, verifique sua a caixa de entrada com as instruções de mudança de senha!',
            );
        } else {
            setIsLoading(false);
        }
    };

    const forgotPasswordForm = () => {
        let buttonDisabled;
        let isEmailInputValid;

        if (email.length == 0 || !isEmailFormatValid) {
            buttonDisabled = true;
        } else {
            buttonDisabled = false;
        }

        if (email.length == 0 || isEmailFormatValid) {
            isEmailInputValid = true;
        } else {
            isEmailInputValid = false;
        }

        return (
            <View style={styles.content}>
                <View style={styles.contentText}>
                    <Icon
                        name="unlock"
                        size={80}
                        type="foundation"
                        color={colors.primary}
                    />
                    <Text style={styles.textTitle}>Esqueceu sua senha?</Text>
                    <Text style={styles.subtitle}>
                        Será enviado instruções de como redefinir sua senha por
                        e-mail.
                    </Text>
                    <View style={styles.inputWrapper}>
                        <Input
                            placeholder="Digite seu email"
                            value={email}
                            change={(email) => {
                                setIsEmailFormatValid(checkEmailFormat(email));
                                setEmail(email);
                            }}
                            valid={isEmailInputValid}
                        />
                    </View>
                </View>
                <Button
                    large
                    press={handlerSubmit}
                    title="Enviar"
                    disabled={buttonDisabled}
                />
            </View>
        );
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={'height'}>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.backIcon}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" color="black" />
                    </TouchableOpacity>
                </View>
                {!isLoading && forgotPasswordForm()}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
