import React, { useState, useContext } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { UserContext } from '../../../../store/contexts/userContext';
import Button from '../../../../components/UI/button';
import Input from '../../../../components/UI/input';
import UserService from '../../../../services/User';
import styles from './styles';
import actions from '../../../../store/actions';
import ConfirmationModal from '../../../../components/modals/confirmationModal';
import { alertSuccess } from '../../../../utils/Alert';
import useService from '../../../../services/useService';

export default function EditNameField({ route, navigation }) {
    const userName = route.params.user.name;
    const { dispatch } = useContext(UserContext);
    const [newName, setNewName] = useState(userName);
    const [editRequestLoading, setEditRequestLoading] = useState(false);
    const [isConfirmationModalVisible, setConfirmationModalVisible] = useState(
        false,
    );
    const goBackToUserProfilePage = () => navigation.goBack();

    const handleEditRequest = async () => {
        const data = {
            ...route.params.user,
            name: newName,
        };
        setEditRequestLoading(true);
        const user = await useService(UserService, 'editUser', [data]);
        if (!user.error) {
            dispatch({ type: actions.user.storeUserInfo, data: user });
            alertSuccess('Alteração feita com sucesso!');
        }
        goBackToUserProfilePage();
        setConfirmationModalVisible(false);
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
            <ConfirmationModal
                visible={isConfirmationModalVisible}
                setVisible={setConfirmationModalVisible}
                action={handleEditRequest}
                message={'Tem certeza que deseja modificar esta informação?'}
                isLoading={editRequestLoading}
            />

            <View style={styles.content}>
                <View style={styles.nameInput}>
                    <Input
                        change={(name) => setNewName(name)}
                        label={'Nome'}
                        placeholder={'Digite seu nome'}
                        value={newName}
                        keyboard={'default'}
                    />
                </View>
            </View>
            <Button
                style={styles.btnEdit}
                title="Editar"
                disabled={newName === ''}
                large
                press={() => setConfirmationModalVisible(true)}
            />
        </KeyboardAvoidingView>
    );
}
