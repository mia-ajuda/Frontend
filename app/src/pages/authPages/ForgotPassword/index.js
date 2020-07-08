import React, { useState, useContext } from 'react';

import {
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import Input from '../../../components/UI/input';
import colors from '../../../../assets/styles/colorVariables';
import Button from '../../../components/UI/button';
import { Icon } from 'react-native-elements';
import styles from './styles';
import validationEmail from '../../../utils/emailValidation';
import firebaseService from '../../../services/Firebase';
import { alertSuccess } from '../../../utils/Alert';
import { ServiceContext } from '../../../store/contexts/serviceContext';

export default function ForgotPassword({ navigation }) {
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [requestLoading, setRequestLoading] = useState(false);
    const { useService } = useContext(ServiceContext);

    const handlerSubmit = async () => {
        setRequestLoading(true);
        const foundEmail = await useService(
            firebaseService,
            'resetUserPassword',
            [email.trim().toLowerCase()],
        );
        // Quando encontra encontra um email o retorno da função é undefined
        if (foundEmail === undefined) {
            navigation.goBack();
            alertSuccess(
                'Email enviado com sucesso! Por favor, verifique sua a caixa de entrada com as instruções de mudança de senha!',
            );
        } else {
            setRequestLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}>
                <View style={styles.backIcon}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" color="black" />
                    </TouchableOpacity>
                </View>
                {requestLoading ? (
                    <View style={styles.loading}>
                        <ActivityIndicator
                            color={colors.primary}
                            size="large"
                        />
                    </View>
                ) : (
                    <View style={styles.content}>
                        <View style={styles.contentText}>
                            <Icon
                                name="unlock"
                                size={80}
                                type="foundation"
                                color={colors.primary}
                            />
                            <Text style={styles.textTitle}>
                                Esqueceu sua senha?
                            </Text>
                            <Text style={styles.subtitle}>
                                Será enviado instruções de como redefinir sua
                                senha por e-mail.
                            </Text>
                            <View style={styles.inputWrapper}>
                                <Input
                                    placeholder="Digite seu email"
                                    value={email}
                                    change={(value) => {
                                        setIsEmailValid(validationEmail(value));
                                        setEmail(value);
                                    }}
                                    valid={isEmailValid}
                                />
                            </View>
                        </View>
                        <Button
                            large
                            press={handlerSubmit}
                            title="Enviar"
                            disabled={email === '' && isEmailValid}
                        />
                    </View>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
