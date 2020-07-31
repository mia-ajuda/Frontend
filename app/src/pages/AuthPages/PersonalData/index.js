import React, { useState, useContext } from 'react';
import {
    View,
    KeyboardAvoidingView,
    Text,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { Icon, CheckBox } from 'react-native-elements';
import { TextInputMask } from 'react-native-masked-text';
import Input from '../../../components/UI/input';
import Button from '../../../components/UI/button';
import styles from './styles';
import UserService from '../../../services/User';
import colors from '../../../../assets/styles/colorVariables';
import cpfValidator from '../../../utils/cpfValidator';
import cnpjValidator from '../../../utils/cnpjValidator';
import dateValidator from '../../../utils/dateValidator';
import phoneValidator from '../../../utils/phoneValidator';
import removeSpecialCharsFrom from '../../../utils/removeSpecialChars';
import formatDate from '../../../utils/formatDate';
import { DeviceInformationContext } from '../../../store/contexts/deviceInformationContext';

export default function PersonalData({ route, navigation }) {
    const { keyboard } = useContext(DeviceInformationContext);
    const { userDatafromRegistrationPage } = route.params;
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [cpf, setCPF] = useState('');
    const [cnpj, setCNPJ] = useState('');
    const [cellPhone, setCellPhone] = useState('');
    const [mentalHealthProfessional, setMentalHealthProfessional] = useState(
        false,
    );
    const [useCNPJ, setUseCNPJ] = useState(false);
    const [loadingCpfVerification, setloadingCpfVerification] = useState(false);
    const [
        validateDocumentErrorMessage,
        setValidateDocumentErrorMessage,
    ] = useState();

    const verifyIdExistence = async () => {
        setloadingCpfVerification(true);
        const idLabel = useCNPJ ? 'CNPJ' : 'CPF';
        const idOnlyNumbers = useCNPJ
            ? removeSpecialCharsFrom(cnpj)
            : removeSpecialCharsFrom(cpf);
        const idExist = await UserService.verifyUserInfo(idOnlyNumbers);
        setloadingCpfVerification(false);
        if (idExist)
            throw `Esse ${idLabel} já está sendo utilizado por outro usuário`;
    };

    const continueHandler = async () => {
        keyboard.dismiss();
        try {
            await verifyIdExistence();
            let userDataFromPersonalPage;
            const phone = `+55${removeSpecialCharsFrom(cellPhone)}`;
            if (useCNPJ) {
                userDataFromPersonalPage = {
                    name,
                    cnpj,
                    phone,
                    ...userDatafromRegistrationPage,
                };
            } else {
                const birthdayFormated = formatDate(birthday);
                userDataFromPersonalPage = {
                    name,
                    birthday: birthdayFormated,
                    cpf,
                    phone,
                    mentalHealthProfessional,
                    ...userDatafromRegistrationPage,
                };
            }

            navigation.navigate('address', { userDataFromPersonalPage });
        } catch (error) {
            setValidateDocumentErrorMessage(error);
        }
    };

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

    const renderLoadingIdicator = () => (
        <View style={styles.btnView}>
            <ActivityIndicator color={colors.primary} size="large" />
        </View>
    );

    const renderPhoneInputForm = () => {
        const isPhoneValid = phoneValidator(cellPhone) || cellPhone == '';
        return (
            <View>
                <Text style={styles.label}>Telefone</Text>
                <TextInputMask
                    style={[
                        styles.inputMask,
                        isPhoneValid ? styles.valid : styles.invalid,
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
                    }}
                    placeholder="Digite seu telefone"
                />
            </View>
        );
    };

    const renderBirthDtInputForm = () => {
        const isBirthdateValid = dateValidator(birthday) || birthday == '';
        if (useCNPJ) return;
        return (
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
                    disabled={true}
                />
            </View>
        );
    };

    const renderNameInputForm = () => {
        const inputLabel = useCNPJ ? 'da Instituição' : 'Completo';
        return (
            <Input
                value={name}
                change={(name) => setName(name)}
                label={`Nome ${inputLabel}`}
                placeholder={`Nome ${inputLabel}`}
            />
        );
    };

    const renderIdInputForm = () => {
        let idType = 'CPF';
        let isIDValid = cpfValidator(cpf) || cpf == '';

        if (useCNPJ) {
            idType = 'CNPJ';
            isIDValid = cnpjValidator(cnpj) || cnpj == '';
        }
        return (
            <View>
                <Text style={styles.label}>{idType}</Text>
                <TextInputMask
                    type={idType.toLowerCase()}
                    value={useCNPJ ? cnpj : cpf}
                    onChangeText={(text) => {
                        if (useCNPJ) setCNPJ(text);
                        else setCPF(text);
                    }}
                    style={[
                        styles.inputMask,
                        isIDValid ? styles.valid : styles.invalid,
                    ]}
                    placeholder={`Digite seu ${idType}`}
                />
            </View>
        );
    };

    const renderProfessionalHealthCheckbox = () => {
        if (useCNPJ) return;
        return (
            <View style={styles.toggleView}>
                <View style={styles.checkboxView}>
                    <CheckBox
                        title="Sou profissional de saúde mental"
                        checked={mentalHealthProfessional}
                        onPress={() => {
                            setMentalHealthProfessional(
                                !mentalHealthProfessional,
                            );
                            setCNPJ('');
                        }}
                    />
                </View>
            </View>
        );
    };

    const renderEntityButton = () => (
        <View style={styles.checkboxView}>
            <CheckBox
                title="Sou uma ONG ou instituição"
                checked={useCNPJ}
                onPress={() => {
                    setUseCNPJ(!useCNPJ);
                    setMentalHealthProfessional(false);
                    setCNPJ('');
                    setCPF('');
                }}
            />
        </View>
    );

    const renderContinueButton = () => {
        let fieldsValid =
            cpfValidator(cpf) &&
            phoneValidator(cellPhone) &&
            dateValidator(birthday);
        if (useCNPJ)
            fieldsValid = phoneValidator(cellPhone) && cnpjValidator(cnpj);
        return (
            <Button
                title="Continuar"
                disabled={fieldsValid == false}
                large
                press={continueHandler}
            />
        );
    };

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
                    {validateDocumentErrorMessage && (
                        <Text style={styles.errorMessage}>
                            {validateDocumentErrorMessage}
                        </Text>
                    )}
                    {renderEntityButton()}
                    {renderNameInputForm()}
                    {renderBirthDtInputForm()}
                    {renderPhoneInputForm()}
                    {renderIdInputForm()}
                    {renderProfessionalHealthCheckbox()}
                </View>
            </ScrollView>

            {loadingCpfVerification
                ? renderLoadingIdicator()
                : renderContinueButton()}
        </KeyboardAvoidingView>
    );
}
