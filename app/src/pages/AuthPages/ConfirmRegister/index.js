import React, { useState } from 'react';
import { Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { CheckBox } from 'react-native-elements';

import { alertSuccess } from '../../../utils/Alert';
import SessionService from '../../../services/Session';
import TermsModal from '../../../components/modals/conditionTermsModal';
import PrivacyPolicyModal from '../../../components/modals/privacyPolicyModal';
import Buttom from '../../../components/UI/button';
import useService from '../../../services/useService';
import colors from '../../../../assets/styles/colorVariables';

import styles from './styles';

export default function ConfirmRegister({ route, navigation }) {
    const { completeRegistragionData } = route.params;
    const isEntityUser = completeRegistragionData.cnpj;
    const [termsModalVisible, setTermsModalVisible] = useState(false);
    const [checked, setChecked] = useState(false);
    const [privacyModalVisible, setPrivacyModalVisible] = useState(false);
    const [loadingUserRegistration, setLoadingUserRegistration] =
        useState(false);
    const navigateBackToPhotoPage = () => navigation.goBack();

    async function continueHandler() {
        setLoadingUserRegistration(true);

        const signUpRequest = await useService(SessionService, 'signUp', [
            completeRegistragionData,
        ]);
        if (!signUpRequest.error) {
            alertSuccess('Seu cadastro foi realizado com sucesso');
        }
        navigation.navigate('login');
    }

    const titleCheckBox = (
        <View style={styles.checkBoxTitle}>
            <View style={styles.checkBoxContent}>
                <Text style={styles.checkBoxText}> Li e concordo com os </Text>
                <TouchableOpacity onPress={() => setTermsModalVisible(true)}>
                    <Text style={styles.hyperLink}> Termos de Uso </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.checkBoxContent}>
                <Text style={styles.checkBoxText}>e as </Text>
                <TouchableOpacity onPress={() => setPrivacyModalVisible(true)}>
                    <Text style={styles.hyperLink}>
                        Políticas de privacidade
                    </Text>
                </TouchableOpacity>
                <Text style={styles.checkBoxText}>.</Text>
            </View>
        </View>
    );
    const renderLoadingIndicator = () => (
        <ActivityIndicator size="large" color={colors.primary} />
    );
    return (
        <View style={styles.container}>
            <View style={styles.selectText}>
                <Text style={styles.text}>
                    Clique em continuar para prosseguir com o cadastro.
                </Text>
            </View>
            <View style={styles.checkBox}>
                <CheckBox
                    title={titleCheckBox}
                    style={styles.checkbox}
                    iconRight
                    size={28}
                    checked={checked}
                    onPress={() => setChecked(!checked)}
                    onIconPress={() => setChecked(!checked)}
                />
            </View>
            <View style={styles.buttonPreview}>
                {loadingUserRegistration ? (
                    renderLoadingIndicator()
                ) : (
                    <>
                        <Buttom
                            title="Voltar"
                            type="notSelected"
                            press={() => {
                                navigateBackToPhotoPage();
                            }}
                        />
                        <Buttom
                            disabled={!checked}
                            title={isEntityUser ? 'Concluir' : 'Continuar'}
                            press={() => {
                                continueHandler();
                            }}
                        />
                    </>
                )}
            </View>

            <TermsModal
                visible={termsModalVisible}
                setVisible={setTermsModalVisible}
            />
            <PrivacyPolicyModal
                visible={privacyModalVisible}
                setVisible={setPrivacyModalVisible}
            />
        </View>
    );
}
