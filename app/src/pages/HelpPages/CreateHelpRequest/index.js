import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';
import styles from './styles';
import Container from '../../../components/Container';
import Input from '../../../components/UI/input';
import Button from '../../../components/UI/button';
import colors from '../../../../assets/styles/colorVariables';
import SelectCategoryForm from '../../../components/SelectCategoryForm';

import NewHelpModalSuccess from '../../../components/modals/newHelpModal/success';

import helpService from '../../../services/Help';
import { UserContext } from '../../../store/contexts/userContext';
import callService from '../../../services/callService';
import showWarningFor from '../../../utils/warningPopUp';
import { requestHelpWarningMessage } from '../../../docs/warning';

export default function CreateHelp({ navigation }) {
    const [title, setTitle] = useState('');
    const [categoryIds, setCategoryIds] = useState([]);
    const [description, setDescription] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [modalSuccessModalVisible, setModalSuccessMoldalVisible] =
        useState(false);
    const [createHelpLoading, setCreateHelpLoading] = useState(false);
    const { user } = useContext(UserContext);

    useEffect(() => {
        showWarningFor('createHelp', requestHelpWarningMessage);
    }, []);

    useEffect(() => {
        if (title && categoryIds.length && description) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [title, description, categoryIds]);

    async function createHelp() {
        const { _id: userId } = user;
        setCreateHelpLoading(true);
        const createHelpRequest = await callService(
            helpService,
            'createHelpRequest',
            [title, categoryIds, description, userId],
        );
        if (!createHelpRequest.error) {
            setModalSuccessMoldalVisible(true);
        } else {
            navigation.navigate('home');
        }
        setCreateHelpLoading(false);
    }

    const renderInputDescriptionForm = () => (
        <View style={styles.descriptionInput}>
            <Input
                label="Descrição"
                textarea
                change={(text) => setDescription(text)}
            />
            <Text>{description.length}/300</Text>
        </View>
    );

    const renderInputTitleForm = () => (
        <Input label="Título do pedido" change={(text) => setTitle(text)} />
    );
    const renderLoadingIdicator = () => (
        <ActivityIndicator size="large" color={colors.primary} />
    );

    const createHelpBtn = () => (
        <Button
            title="Criar pedido"
            large
            disabled={buttonDisabled}
            press={createHelp}
        />
    );

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior={'padding'}>
                <Container>
                    <View style={styles.view}>
                        {renderInputTitleForm()}
                        {renderInputDescriptionForm()}
                        <Text style={styles.label}>
                            Selecione no mínimo 1 categoria:
                        </Text>
                        <SelectCategoryForm
                            helpCategoryIds={categoryIds}
                            setHelpCategoryIds={setCategoryIds}
                        />
                        <View style={styles.btnContainer}>
                            {createHelpLoading
                                ? renderLoadingIdicator()
                                : createHelpBtn()}
                        </View>
                    </View>
                </Container>
                <NewHelpModalSuccess
                    visible={modalSuccessModalVisible}
                    onOkPressed={() => navigation.navigate('home')}
                    message="Sua solicitação de ajuda foi criada com sucesso!"
                />
            </KeyboardAvoidingView>
        </ScrollView>
    );
}
