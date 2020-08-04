import React, { useState, useContext } from 'react';
import { View, Text, KeyboardAvoidingView } from 'react-native';
import { UserContext } from '../../../../store/contexts/userContext';
import { TextInputMask } from 'react-native-masked-text';
import Button from '../../../../components/UI/button';
import UserService from '../../../../services/User';
import EntityService from '../../../../services/Entity';
import styles from './styles';
import actions from '../../../../store/actions';
import ConfirmationModal from '../../../../components/modals/confirmationModal';
import removeSpecialCharsFrom from '../../../../utils/removeSpecialChars';
import { alertSuccess, alertError } from '../../../../utils/Alert';

export default function EditPhoneField({ route, navigation }) {
    const phone = route.params.user?.phone.slice(3, 14);
    const useCnpj = route.params.user.cnpj;
    const [newPhone, setNewPhone] = useState(phone);
    const [isNewPhoneValid, setNewPhoneValid] = useState(true);
    const { dispatch } = useContext(UserContext);
    const [loadingModal, setLoadingModal] = useState(false);
    const [isConfirmationModalVisible, setConfirmationModalVisible] = useState(
        false,
    );
    const goBackToUserProfilePage = () => navigation.goBack();

    const formatPhone = () => {
        const filterdPhone = `+55${removeSpecialCharsFrom(newPhone)}`;
        return filterdPhone;
    };

    const handleEditRequest = async () => {
        let data = {
            ...route.params.user,
            phone: formatPhone(),
        };
        try {
            setLoadingModal(true);
            const user = useCnpj
                ? await EntityService.editEntity(data)
                : await UserService.editUser(data);
            dispatch({ type: actions.user.storeUserInfo, data: user });
            alertSuccess('Alteração feita com sucesso!');
            goBackToUserProfilePage();
        } catch (err) {
            alertError(err, null, 'Ooops..');
            goBackToUserProfilePage();
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
            <ConfirmationModal
                visible={isConfirmationModalVisible}
                setVisible={setConfirmationModalVisible}
                action={handleEditRequest}
                message={'Tem certeza que deseja modificar esta informação?'}
                isLoading={loadingModal}
            />

            <View style={styles.content}>
                <View style={styles.phoneView}>
                    <Text style={styles.label}>Telefone</Text>
                    <TextInputMask
                        style={[
                            styles.inputMask,
                            newPhone === '' || isNewPhoneValid
                                ? styles.valid
                                : styles.invalid,
                        ]}
                        type={'cel-phone'}
                        options={{
                            maskType: 'BRL',
                            withDDD: true,
                            dddMask: '(99) ',
                        }}
                        value={newPhone}
                        onChangeText={(phone) => {
                            setNewPhone(phone);

                            if (phone.length >= 14) {
                                setNewPhoneValid(true);
                            } else {
                                setNewPhoneValid(false);
                            }
                        }}
                        placeholder="Digite seu telefone"
                    />
                </View>
            </View>
            <Button
                style={styles.btnEdit}
                title="Confirmar"
                disabled={newPhone === '' || !isNewPhoneValid}
                large
                press={() => setConfirmationModalVisible(true)}
            />
        </KeyboardAvoidingView>
    );
}
