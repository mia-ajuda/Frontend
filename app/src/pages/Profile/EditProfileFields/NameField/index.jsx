import React, { useState, useContext } from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { UserContext } from '../../../../store/contexts/userContext';
import Button from '../../../../components/UI/button';
import Input from '../../../../components/UI/input';
import UserService from '../../../../services/User';
import EntityService from '../../../../services/Entity';
import styles from './styles';
import actions from '../../../../store/actions';
import ConfirmationModal from '../../../../components/modals/confirmationModal';
import { alertSuccess } from '../../../../utils/Alert';
import callService from '../../../../services/callService';
import { LoadingContext } from '../../../../store/contexts/loadingContext';

export default function EditNameField({ route, navigation }) {
    const userName = route.params.user.name;
    const isEntityUser = route.params.user.cnpj;

    const { dispatch } = useContext(UserContext);
    const { isLoading, setIsLoading } = useContext(LoadingContext);

    const [newName, setNewName] = useState(userName);
    const [isConfirmationModalVisible, setConfirmationModalVisible] =
        useState(false);
    const goBackToUserProfilePage = () => navigation.goBack();

    const handleEditRequest = async () => {
        const data = {
            ...route.params.user,
            name: newName,
        };
        setIsLoading(true);
        const user = isEntityUser
            ? await callService(EntityService, 'editEntity', [data])
            : await callService(UserService, 'editUser', [data]);
        setIsLoading(false);
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
                isLoading={isLoading}
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
