import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Picker,
    Text,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import styles from './styles';
import Container from '../../../components/Container';
import Input from '../../../components/UI/input';
import Button from '../../../components/UI/button';
import colors from '../../../../assets/styles/colorVariables';
import { CategoryContext } from '../../../store/contexts/categoryContext';
import NewHelpModalSuccess from '../../../components/modals/newHelpModal/success';
import helpService from '../../../services/Help';
import { UserContext } from '../../../store/contexts/userContext';
import useService from '../../../services/useService';
import showWarningFor from '../../../utils/warningPopUp';
import { requestHelpWarningMessage } from '../../../docs/warning';

export default function CreateHelp({ navigation }) {
    const [helpOfferTitle, setHelpOfferTitle] = useState('');
    const [helpOfferCategory, setHelpOfferCategory] = useState({});
    const [helpOfferDescription, setHelpOfferDescription] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [modalSuccessModalVisible, setModalSuccessMoldalVisible] = useState(
        false,
    );
    const [createHelpOfferLoading, setCreateHelpOfferLoading] = useState(false);

    const { categories } = useContext(CategoryContext);
    const { user } = useContext(UserContext);

    useEffect(() => {
        showWarningFor('createHelp', requestHelpWarningMessage);
    }, []);

    useEffect(() => {
        if (helpOfferTitle && helpOfferCategory && helpOfferDescription) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [helpOfferTitle, helpOfferDescription, helpOfferCategory]);

    async function createHelpOffer() {
        const { _id: userId } = user;
        setCreateHelpOfferLoading(true);
        const createHelpRequest = await useService(
            helpService,
            'createHelpOffer',
            [
                helpOfferTitle,
                helpOfferCategory['_id'],
                helpOfferDescription,
                userId,
            ],
        );
        if (!createHelpRequest.error) {
            setModalSuccessMoldalVisible(true);
        } else {
            navigation.navigate('main');
        }
        setCreateHelpOfferLoading(false);
    }

    const renderPickerCategoryForm = () => (
        <View style={styles.catagoryPicker}>
            <Text style={styles.label}>Categoria</Text>
            <View style={styles.picker}>
                <Picker
                    label="Categoria"
                    selectedValue={helpOfferCategory}
                    onValueChange={(itemValue) =>
                        setHelpOfferCategory(itemValue)
                    }>
                    {categories.map((category) => (
                        <Picker.Item
                            key={category._id}
                            color={colors.dark}
                            label={category.name}
                            value={category}
                        />
                    ))}
                </Picker>
            </View>
        </View>
    );

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
                    {renderPickerCategoryForm()}
                    {renderInputDescriptionForm()}

                    <View style={styles.btnContainer}>
                        {createHelpOfferLoading
                            ? renderLoadingIdicator()
                            : createHelpOfferBtn()}
                    </View>
                </View>
            </Container>
            <NewHelpModalSuccess
                visible={modalSuccessModalVisible}
                onOkPressed={() => navigation.navigate('main')}
            />
        </ScrollView>
    );
}
