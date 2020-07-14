import React, { useState, useEffect, useContext } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { UserContext } from '../../../../store/contexts/userContext';
import Button from '../../../../components/UI/button';
import Input from '../../../../components/UI/input';
import UserService from '../../../../services/User';
import styles from './styles';
import actions from '../../../../store/actions';
import ConfirmationModal from '../../../../components/modals/confirmationModal';
import { alertSuccess, alertError } from '../../../../utils/Alert';

export default function EditNameField({ route, navigation }) {
    const [fieldToEdit, setFieldToEdit] = useState('');
    const { dispatch } = useContext(UserContext);
    const [loadingModal, setLoadingModal] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        setFieldToEdit(route.params.user.name);
    }, []);

    const handleFiledToEditChange = (value) => {
        setFieldToEdit(value);
    };

    const handleEditRequest = async () => {
        let data = {
            ...route.params.user,
            name: fieldToEdit,
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
                    <View style={styles.cep}>
                        <Input
                            change={handleFiledToEditChange}
                            label={'Nome'}
                            placeholder={'Digite seu nome'}
                            value={fieldToEdit}
                            keyboard={'default'}
                        />
                    </View>
                </View>
                <Button
                    style={styles.btnEdit}
                    title="Editar"
                    disabled={fieldToEdit === ''}
                    large
                    press={() => setModalVisible(true)}
                />
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
