import React, { useState, useContext } from 'react';
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
import cpfValidator from '../../../utils/cpfValidator';
import dateValidator from '../../../utils/dateValidator';
import phoneValidator from '../../../utils/phoneValidator';
import removeSpecialCharsFrom from '../../../utils/removeSpecialChars';
import formatDate from '../../../utils/formatDate';
import { DeviceInformationContext } from '../../../store/contexts/deviceInformationContext';
import useService from '../../../services/useService';
import { alertError } from '../../../utils/Alert';

export default function PersonalData({ route, navigation }) {
    const { keyboard } = useContext(DeviceInformationContext);
    const { userDatafromRegistrationPage } = route.params;
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [cpf, setCPF] = useState('');
    const [cellPhone, setCellPhone] = useState('');
    const [mentalHealthProfessional, setMentalHealthProfessional] = useState(
        false,
    );
    const [loadingCpfVerification, setloadingCpfVerification] = useState(false);

    const verifyCpfExistence = async () => {
        keyboard.dismiss();
        setloadingCpfVerification(true);
        const cpfOnlyNumbers = removeSpecialCharsFrom(cpf);
        const cpfExist = await useService(UserService, 'verifyUserInfo', [
            cpfOnlyNumbers,
        ]);
        setloadingCpfVerification(false);
        if (!cpfExist.error) {
            if (cpfExist) {
                alertError(
                    null,
                    'Esse Cpf já está sendo utilizado por outro usuário',
                );
            } else {
                continueHandler();
            }
        }
    };

    const continueHandler = async () => {
        const phone = `+55${removeSpecialCharsFrom(cellPhone)}`;
        const birthdayFormated = formatDate(birthday);
        const userDataFromPersonalPage = {
            name,
            birthday: birthdayFormated,
            cpf,
            phone,
            mentalHealthProfessional,
            ...userDatafromRegistrationPage,
        };
        navigation.navigate('address', { userDataFromPersonalPage });
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
                />
            </View>
        );
    };

    const renderNameInputForm = () => (
        <Input
            value={name}
            change={(name) => setName(name)}
            label="Nome Completo"
            placeholder="Nome Completo"
        />
    );

    const renderCpfInputForm = () => {
        const isCpfValid = cpfValidator(cpf) || cpf == '';
        return (
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
                        isCpfValid ? styles.valid : styles.invalid,
                    ]}
                    placeholder="Digite seu CPF"
                />
            </View>
        );
    };

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

    const renderContinueButton = () => {
        const fieldsValid =
            cpfValidator(cpf) &&
            phoneValidator(cellPhone) &&
            dateValidator(birthday);
        return (
            <Button
                title="Continuar"
                disabled={fieldsValid == false}
                large
                press={verifyCpfExistence}
            />
        );
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
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
