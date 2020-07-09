import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    KeyboardAvoidingView,
    Text,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
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
import formatBirthDate from '../../../utils/formatDate';
import { DeviceInformationContext } from '../../../store/contexts/deviceInformationContext';

export default function PersonalData({ route, navigation }) {
    const { keyboard } = useContext(DeviceInformationContext);
    const { userDatafromRegistrationPage } = route.params;
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [isBirthdateValid, setBirthValid] = useState(true);
    const [cpf, setCPF] = useState('');
    const [cpfIsValid, setCpfValid] = useState(true);
    const [cellPhone, setCellPhone] = useState('');
    const [isValidPhone, setValidPhone] = useState(true);
    const [mentalHealthProfessional, setMentalHealthProfessional] = useState(
        false,
    );
    const [loadingCpfVerification, setloadingCpfVerification] = useState(false);
    const [validateCpfErrorMessage, setValidateCpfErrorMessage] = useState();

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

    let refCpf;
    let refDate;

    const formatPhone = () => {
        const filterdPhone = `+55${removeSpecialCharsFrom(cellPhone)}`;
        return filterdPhone;
    };

    const verifyCpfExistence = async () => {
        setloadingCpfVerification(true);
        const cpfOnlyNumbers = removeSpecialCharsFrom(cpf);
        const cpfExist = await UserService.verifyUserInfo(cpfOnlyNumbers);
        setloadingCpfVerification(false);
        if (cpfExist)
            throw 'Esse Cpf já está sendo utilizado por outro usuário';
    };

    const continueHandler = async () => {
        keyboard.hide();
        try {
            await verifyCpfExistence();

            const phone = formatPhone();
            const birthdayFormated = formatBirthDate(birthday);
            const userDataFromPersonalPage = {
                name,
                birthday: birthdayFormated,
                cpf,
                phone,
                mentalHealthProfessional,
                ...userDatafromRegistrationPage,
            };
            navigation.navigate('address', { userDataFromPersonalPage });
        } catch (error) {
            setValidateCpfErrorMessage(error);
        }
    };

    const renderLoadingIdicator = () => (
        <View style={styles.btnView}>
            <ActivityIndicator color={colors.primary} size="large" />
        </View>
    );

    const renderContinueButton = () => (
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
    );

    const renderPageHeader = () => {
        if (keyboard.visible == false) {
            return (
                <View>
                    <View style={styles.backIcon}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.button}>
                            <Icon name="arrow-back" color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.title}>
                        <Text style={styles.text1}>
                            Informe alguns dados para continuarmos seu com o seu
                            cadastro.
                        </Text>
                    </View>
                </View>
            );
        }
    };

    const renderPhoneInputForm = () => (
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
    );

    const renderBirthDtInputForm = () => (
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
                    isBirthdateValid ? styles.valid : styles.invalid,
                ]}
                placeholder="Data de Nascimento"
                ref={(ref) => (refDate = ref)}
            />
        </View>
    );

    const renderNameInputForm = () => (
        <Input
            value={name}
            change={(name) => setName(name)}
            label="Nome Completo"
            placeholder="Nome Completo"
        />
    );

    const renderCpfInputForm = () => (
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
    );

    const renderProfessionalHealthCheckbox = () => (
        <View style={styles.toggleView}>
            <CheckBox
                title="Sou profissional de saúde mental"
                checked={mentalHealthProfessional}
                onPress={() => {
                    setMentalHealthProfessional(!mentalHealthProfessional);
                }}
            />
        </View>
    );

    return (
        <KeyboardAvoidingView style={styles.container} behavior="height">
            {renderPageHeader()}
            <ScrollView
                style={styles.formScroll}
                contentContainerStyle={
                    keyboard.visible
                        ? styles.scrollContainerOnTyping
                        : styles.scrollContainer
                }
                showsVerticalScrollIndicator={false}>
                <View style={styles.inputView}>
                    {validateCpfErrorMessage && (
                        <Text style={styles.errorMessage}>
                            {validateCpfErrorMessage}
                        </Text>
                    )}

                    {renderNameInputForm()}
                    {renderBirthDtInputForm()}
                    {renderPhoneInputForm()}
                    {renderCpfInputForm()}
                    {renderProfessionalHealthCheckbox()}
                </View>
            </ScrollView>

            {loadingCpfVerification
                ? renderLoadingIdicator()
                : renderContinueButton()}
        </KeyboardAvoidingView>
    );
}
