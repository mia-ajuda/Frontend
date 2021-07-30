import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import styles from './styles';
import Container from '../../../components/Container';
import Input from '../../../components/UI/input';
import Button from '../../../components/UI/button';
import colors from '../../../../assets/styles/colorVariables';
import NewHelpModalSuccess from '../../../components/modals/newHelpModal/success';
import helpService from '../../../services/Help';
import { UserContext } from '../../../store/contexts/userContext';
import useService from '../../../services/useService';
import showWarningFor from '../../../utils/warningPopUp';
import { requestHelpWarningMessage } from '../../../docs/warning';
import SelectCategoryForm from '../../../components/SelectCategoryForm';

export default function CreateHelp({ navigation }) {
    const [helpOfferTitle, setHelpOfferTitle] = useState('');
    const [helpOfferCategoryIds, setHelpOfferCategoryIds] = useState([]);
    const [helpOfferDescription, setHelpOfferDescription] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [modalSuccessModalVisible, setModalSuccessMoldalVisible] =
        useState(false);
    const [createHelpOfferLoading, setCreateHelpOfferLoading] = useState(false);

    const { user } = useContext(UserContext);

    useEffect(() => {
        showWarningFor('createHelp', requestHelpWarningMessage);
    }, []);

    useEffect(() => {
        if (
            helpOfferTitle &&
            helpOfferCategoryIds.length &&
            helpOfferDescription
        ) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [helpOfferTitle, helpOfferDescription, helpOfferCategoryIds]);

    async function createHelpOffer() {
        const { _id: userId } = user;
        setCreateHelpOfferLoading(true);
        const createHelpRequest = await useService(
            helpService,
            'createHelpOffer',
            [
                helpOfferTitle,
                helpOfferCategoryIds,
                helpOfferDescription,
                userId,
            ],
        );
        if (!createHelpRequest.error) {
            setModalSuccessMoldalVisible(true);
        } else {
            navigation.navigate('home');
        }
        setCreateHelpOfferLoading(false);
    }

    const renderInputDescriptionForm = () => (
        <View style={styles.descriptionInput}>
            <Input
                label="Descrição"
                textarea
                change={(text) => setHelpOfferDescription(text)}
            />
            <Text>{helpOfferDescription.length}/300</Text>
        </View>
    );

    const renderInputTitleForm = () => (
        <Input
            label="Título da oferta"
            change={(text) => setHelpOfferTitle(text)}
        />
    );
    const renderLoadingIdicator = () => (
        <ActivityIndicator size="large" color={colors.primary} />
    );

    const createHelpOfferBtn = () => (
        <Button
            title="Criar oferta"
            large
            disabled={buttonDisabled}
            press={createHelpOffer}
        />
    );

    return (
        <ScrollView>
            <Container>
                <View style={styles.view}>
                    {renderInputTitleForm()}
                    {renderInputDescriptionForm()}
                    <SelectCategoryForm
                        helpCategoryIds={helpOfferCategoryIds}
                        setHelpCategoryIds={setHelpOfferCategoryIds}
                        helpType={'offer'}
                    />
                    <View style={styles.btnContainer}>
                        {createHelpOfferLoading
                            ? renderLoadingIdicator()
                            : createHelpOfferBtn()}
                    </View>
                </View>
            </Container>
            <NewHelpModalSuccess
                visible={modalSuccessModalVisible}
                onOkPressed={() => navigation.navigate('home')}
                message="Sua oferta de ajuda foi criada com sucesso!"
            />
        </ScrollView>
    );
}
