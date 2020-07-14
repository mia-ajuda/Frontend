import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { UserContext } from '../../../../store/contexts/userContext';
import { TextInputMask } from 'react-native-masked-text';
import Button from '../../../../components/UI/button';
import UserService from '../../../../services/User';
import styles from './styles';
import actions from '../../../../store/actions';
import ConfirmationModal from '../../../../components/modals/confirmationModal';
import removeSpecialCharsFrom from '../../../../utils/removeSpecialChars';
import { alertSuccess, alertError } from '../../../../utils/Alert';

export default function EditPhoneField({ route, navigation }) {
    const [fieldToEdit, setFieldToEdit] = useState('');
    const [isFieldEditedValid, setFieldEditedValid] = useState(true);
    const { dispatch } = useContext(UserContext);
    const [loadingModal, setLoadingModal] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setFieldToEdit(route.params.user.phone.slice(3, 14));
    }, []);

    const formatPhone = () => {
        const filterdPhone = `+55${removeSpecialCharsFrom(fieldToEdit)}`;
        return filterdPhone;
    };

    const handleEditRequest = async () => {
        let data = {
            ...route.params.user,
            phone: formatPhone(),
        };
        navigation.goBack();
        try {
            setLoadingModal(true);
            console.log(data);
            const resp = await UserService.editUser(data);
            dispatch({ type: actions.user.storeUserInfo, data: resp });
            alertSuccess('Alteração feita com sucesso!');
        } catch (err) {
            alertError(err, null, 'Ooops..');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 5 : 0}>
            <ConfirmationModal
                visible={isModalVisible}
                setVisible={setModalVisible}
                action={handleEditRequest}
                message={'Tem certeza que deseja modificar esta informação?'}
                isLoading={loadingModal}
            />
            <ScrollView
                style={styles.cep}
                contentContainerStyle={styles.scroll}>
                <View style={styles.content}>
                    <View style={styles.phoneView}>
                        <Text style={styles.label}>Telefone</Text>
                        <TextInputMask
                            style={[
                                styles.inputMask,
                                fieldToEdit === '' || isFieldEditedValid
                                    ? styles.valid
                                    : styles.invalid,
                            ]}
                            type={'cel-phone'}
                            options={{
                                maskType: 'BRL',
                                withDDD: true,
                                dddMask: '(99) ',
                            }}
                            value={fieldToEdit}
                            onChangeText={(text) => {
                                setFieldToEdit(text);

                                if (text.length >= 14) {
                                    setFieldEditedValid(true);
                                } else {
                                    setFieldEditedValid(false);
                                }
                            }}
                            placeholder="Digite seu telefone"
                        />
                    </View>
                </View>
                <Button
                    style={styles.btnEdit}
                    title="Confirmar"
                    disabled={fieldToEdit === '' || !isFieldEditedValid}
                    large
                    press={() => setModalVisible(true)}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
