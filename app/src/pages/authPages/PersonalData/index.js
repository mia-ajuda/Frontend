import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    KeyboardAvoidingView,
    Text,
    ScrollView,
    Keyboard,
    TouchableOpacity,
    ActivityIndicator,
    Platform,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { TextInputMask } from 'react-native-masked-text';
import Input from '../../../components/UI/input';
import Button from '../../../components/UI/button';
import { CheckBox } from 'react-native-elements';
import styles from './styles';
import UserService from '../../../services/User';
import colors from '../../../../assets/styles/colorVariables';
import removeSpecialCharsFrom from '../../../utils/removeSpecialChars';
import { ServiceContext } from '../../../store/contexts/serviceContext';
import { alertError } from '../../../utils/Alert';

export default function PersonalData({ route, navigation }) {
    const { userData } = route.params;
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [isBirthdateValid, setBirthValid] = useState(true);
    const [cpf, setCPF] = useState('');
    const [cpfIsValid, setCpfValid] = useState(true);
    const [cellPhone, setCellPhone] = useState('');
    const [isValidPhone, setValidPhone] = useState(true);
    const [keyboardVisible, setKeyboardVisible] = useState(false);
    const [mentalHealthProfessional, setMentalHealthProfessional] = useState(
        false,
    );
    const [cpfVerificationLoading, setCpfVerificationLoading] = useState(false);
    const [error] = useState(false);
    const { useService } = useContext(ServiceContext);

    useEffect(() => {
        if (cpf !== '') {
            setCpfValid(refCpf.isValid());
        }
        if (birthday !== '') {
            const birthdateValidation =
                refDate.isValid() && birthday.length === 10; // has to be a valid date and len of 10
            setBirthValid(birthdateValidation);
        }
    }, [cpf, birthday]);

    useEffect(() => {
        completeUserInfoIfGoogleAndFacebook();
        Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
        Keyboard.addListener('keyboardDidHide', () =>
            setKeyboardVisible(false),
        );

        // cleanup function
        return () => {
            Keyboard.removeListener('keyboardDidShow', () =>
                setKeyboardVisible(true),
            );
            Keyboard.removeListener('keyboardDidHide', () =>
                setKeyboardVisible(false),
            );
        };
    }, []);

    let refCpf;
    let refDate;

    const formatPhone = () => {
        const filterdPhone = `+55${removeSpecialCharsFrom(cellPhone)}`;
        return filterdPhone;
    };

    const formatBirthDate = (date) => {
        const dateArray = date.split('/');
        const year = dateArray[2];
        const month = dateArray[1];
        const day = dateArray[0];
        return `${year}-${month}-${day}`;
    };

    const verifyCpfExistence = async () => {
        setCpfVerificationLoading(true);
        const cpfOnlyNumbers = removeSpecialCharsFrom(cpf);
        const cpfExist = await useService(UserService, 'verifyUserInfo', [
            cpfOnlyNumbers,
        ]);
        setCpfVerificationLoading(false);
        if (cpfExist) {
            alertError(
                null,
                'Esse Cpf já está sendo utilizado por outro usuário',
            );
            return true;
        }
        return false;
    };

    const continueHandler = async () => {
        Keyboard.dismiss();
        const cpfExists = verifyCpfExistence();
        if (!cpfExists) {
            const phone = formatPhone();
            const birthdayFormated = formatBirthDate(birthday);
            const newUserData = {
                ...userData,
                name,
                birthday: birthdayFormated,
                cpf,
                phone,
                mentalHealthProfessional,
            };
            navigation.navigate('address', { userData: newUserData });
        }
    };

    function completeUserInfoIfGoogleAndFacebook() {
        if (userData.name) {
            setName(userData.name);
        }

        if (userData.birthday) {
            const dateSplit = userData.birthday.split('/');
            const date = dateSplit[1] + '/' + dateSplit[0] + '/' + dateSplit[2];
            setBirthday(date);
        }
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 5 : 0}>
            {keyboardVisible == false && (
                <View>
                    <View style={styles.backIcon}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.button}>
                            <Icon
                                name={'arrow-back'}
                                color={keyboardVisible ? '#f7f7f7' : 'black'}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.title}>
                        <Text style={styles.text1}>
                            Informe alguns dados para continuarmos seu com o seu
                            cadastro.
                        </Text>
                    </View>
                </View>
            )}
            <ScrollView
                style={styles.formScroll}
                contentContainerStyle={
                    keyboardVisible
                        ? styles.scrollContainerOnTyping
                        : styles.scrollContainer
                }
                showsVerticalScrollIndicator={false}>
                <View style={styles.inputView}>
                    {error && <Text style={styles.errorMessage}>{error}</Text>}

                    <Input
                        value={name}
                        change={(name) => setName(name)}
                        label="Nome Completo"
                        placeholder="Nome Completo"
                    />
                    <View style={styles.viewMargin}></View>
                    <View>
                        <Text style={styles.label}>Data de Nascimento</Text>
                        <TextInputMask
                            type={'datetime'}
                            options={{
                                format: 'DD/MM/YYYY',
                            }}
                            value={birthday}
                            onChangeText={(text) => {
                                setBirthday(text);
                            }}
                            style={[
                                styles.inputMask,
                                isBirthdateValid
                                    ? styles.valid
                                    : styles.invalid,
                            ]}
                            placeholder="Data de Nascimento"
                            ref={(ref) => (refDate = ref)}
                        />
                    </View>
                    <View style={styles.viewMargin}></View>
                    <View>
                        <Text style={styles.label}>CPF</Text>
                        <TextInputMask
                            type={'cpf'}
                            value={cpf}
                            onChangeText={(text) => {
                                setCPF(text);
                            }}
                            style={[
                                styles.inputMask,
                                cpfIsValid ? styles.valid : styles.invalid,
                            ]}
                            placeholder="Digite seu CPF"
                            ref={(ref) => (refCpf = ref)}
                        />
                    </View>
                    <View style={styles.viewMargin} />
                    <View>
                        <Text style={styles.label}>Telefone</Text>
                        <TextInputMask
                            style={[
                                styles.inputMask,
                                isValidPhone ? styles.valid : styles.invalid,
                            ]}
                            type={'cel-phone'}
                            options={{
                                maskType: 'BRL',
                                withDDD: true,
                                dddMask: '(99) ',
                            }}
                            value={cellPhone}
                            onChangeText={(phone) => {
                                setCellPhone(phone);

                                if (phone.length >= 14) {
                                    setValidPhone(true);
                                } else {
                                    setValidPhone(false);
                                }
                            }}
                            placeholder="Digite seu telefone"
                        />
                    </View>
                    <View style={styles.viewMargin} />
                    <View style={styles.toggleView}>
                        <CheckBox
                            title="Sou profissional de saúde mental"
                            checked={mentalHealthProfessional}
                            onPress={() => {
                                setMentalHealthProfessional(
                                    !mentalHealthProfessional,
                                );
                            }}
                        />
                    </View>
                </View>
            </ScrollView>
            <View style={styles.btnView}>
                {cpfVerificationLoading ? (
                    <ActivityIndicator color={colors.primary} size="large" />
                ) : (
                    <Button
                        title="Continuar"
                        disabled={
                            !(
                                cpf !== '' &&
                                cpfIsValid &&
                                birthday !== '' &&
                                isBirthdateValid &&
                                cellPhone !== '' &&
                                isValidPhone
                            )
                        }
                        large
                        press={continueHandler}
                    />
                )}
            </View>
        </KeyboardAvoidingView>
    );
}
