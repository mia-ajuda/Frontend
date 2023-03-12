import React, { useState, useContext } from 'react';
import {
    View,
    KeyboardAvoidingView,
    Text,
    ScrollView,
    TouchableOpacity,
    Switch,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { TextInputMask } from 'react-native-masked-text';
import Input from '../../../components/UI/input';
import Button from '../../../components/UI/button';
import styles from './styles';
import UserService from '../../../services/User';
import EntityService from '../../../services/Entity';
import colors from '../../../../assets/styles/colorVariables';
import cpfValidator from '../../../utils/cpfValidator';
import cnpjValidator from '../../../utils/cnpjValidator';
import dateValidator from '../../../utils/dateValidator';
import phoneValidator from '../../../utils/phoneValidator';
import removeSpecialCharsFrom from '../../../utils/removeSpecialChars';
import formatDate from '../../../utils/formatDate';
import { DeviceInformationContext } from '../../../store/contexts/deviceInformationContext';
import callService from '../../../services/callService';
import { alertError } from '../../../utils/Alert';
import { LoadingContext } from '../../../store/contexts/loadingContext';

export default function PersonalData({ route, navigation }) {
    const { keyboard } = useContext(DeviceInformationContext);
    const { setIsLoading } = useContext(LoadingContext);
    const { userDatafromRegistrationPage } = route.params;

    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [cpf, setCPF] = useState('');
    const [cnpj, setCNPJ] = useState('');
    const [cellPhone, setCellPhone] = useState('');
    const [ismentalHealthProfessional, setMentalHealthProfessional] =
        useState(false);
    const [isEntityUser, setIsEntityUser] = useState(false);

    const verifyIdExistence = async () => {
        setIsLoading(true);
        const idLabel = isEntityUser ? 'CNPJ' : 'CPF';
        const idOnlyNumbers = isEntityUser
            ? removeSpecialCharsFrom(cnpj)
            : removeSpecialCharsFrom(cpf);
        const idExist = isEntityUser
            ? await callService(EntityService, 'verifyEntityInfo', [
                  idOnlyNumbers,
              ])
            : await callService(UserService, 'verifyUserInfo', [idOnlyNumbers]);

        if (!idExist.error) {
            setIsLoading(false);
            if (idExist) {
                alertError(
                    null,
                    `Esse ${idLabel} já está sendo utilizado por outro usuário`,
                );
            } else {
                continueHandler();
            }
        }
    };

    const continueHandler = async () => {
        const phone = `+55${removeSpecialCharsFrom(cellPhone)}`;
        const completeRegistragionData = {
            name,
            cnpj,
            phone,
            ...userDatafromRegistrationPage,
        };
        if (isEntityUser) {
            navigation.navigate('confirmRegister', {
                completeRegistragionData,
            });
        } else {
            setIsLoading(false);
            const birthdayFormated = formatDate(birthday);
            const userDataFromPersonalPage = {
                name,
                birthday: birthdayFormated,
                cpf,
                phone,
                ismentalHealthProfessional,
                ...userDatafromRegistrationPage,
            };
            navigation.navigate('riskGroup', { userDataFromPersonalPage });
        }
    };

    const renderPageHeader = () => {
        if (!keyboard.visible) {
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
                            Informe alguns dados para continuarmos com o seu
                            cadastro.
                        </Text>
                    </View>
                </View>
            );
        }
    };

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

    const renderBirthdayInputForm = () => {
        const isBirthdateValid = dateValidator(birthday) || birthday == '';
        if (isEntityUser) return;
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
        const inputLabel = isEntityUser ? 'da Instituição' : 'Completo';
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

        if (isEntityUser) {
            idType = 'CNPJ';
            isIDValid = cnpjValidator(cnpj) || cnpj == '';
        }
        return (
            <View>
                <Text style={styles.label}>{idType}</Text>
                <TextInputMask
                    type={idType.toLowerCase()}
                    value={isEntityUser ? cnpj : cpf}
                    onChangeText={(text) => {
                        if (isEntityUser) setCNPJ(text);
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
        if (isEntityUser) return;
        return (
            <View style={styles.switchViewMentalHelthProfessional}>
                <Text style={styles.switchLabel}>
                    Sou profissional de saúde mental
                </Text>
                <Switch
                    trackColor={{
                        false: colors.dark,
                        true: colors.primaryContrast,
                    }}
                    thumbColor={
                        ismentalHealthProfessional
                            ? colors.primary
                            : colors.light
                    }
                    ios_backgroundColor={colors.dark}
                    onValueChange={() => {
                        setMentalHealthProfessional(
                            !ismentalHealthProfessional,
                        );
                        setCNPJ('');
                    }}
                    value={ismentalHealthProfessional}
                />
            </View>
        );
    };

    const renderEntityButton = () => (
        <View style={styles.switchViewEntity}>
            <Text style={styles.switchLabel}>Sou uma ONG ou instituição</Text>
            <Switch
                trackColor={{
                    false: colors.dark,
                    true: colors.primaryContrast,
                }}
                thumbColor={isEntityUser ? colors.primary : colors.light}
                ios_backgroundColor={colors.dark}
                onValueChange={() => {
                    setIsEntityUser(!isEntityUser);
                    setMentalHealthProfessional(false);
                    setCNPJ('');
                    setCPF('');
                }}
                value={isEntityUser}
            />
        </View>
    );

    const renderContinueButton = () => {
        let fieldsValid =
            cpfValidator(cpf) &&
            phoneValidator(cellPhone) &&
            dateValidator(birthday);
        if (isEntityUser)
            fieldsValid = phoneValidator(cellPhone) && cnpjValidator(cnpj);
        return (
            <Button
                title="Continuar"
                disabled={!fieldsValid}
                large
                press={verifyIdExistence}
            />
        );
    };

    return (
        <>
            <KeyboardAvoidingView style={styles.container} behavior="height">
                {renderPageHeader()}
                <ScrollView
                    style={styles.formScroll}
                    contentContainerStyle={
                        keyboard.visible
                            ? styles.scrollContainerOnTyping
                            : styles.scrollContainer
                    }
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.inputView}>
                        {renderEntityButton()}
                        {renderNameInputForm()}
                        {renderBirthdayInputForm()}
                        {renderPhoneInputForm()}
                        {renderIdInputForm()}
                        {renderProfessionalHealthCheckbox()}
                    </View>
                </ScrollView>

                {renderContinueButton()}
            </KeyboardAvoidingView>
        </>
    );
}
