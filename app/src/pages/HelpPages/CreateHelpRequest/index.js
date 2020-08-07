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
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(null);
    const [description, setDescription] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [modalSuccessModalVisible, setModalSuccessMoldalVisible] = useState(
        false,
    );
    const [createHelpLoading, setCreateHelpLoading] = useState(false);

    const { categories } = useContext(CategoryContext);
    const { user } = useContext(UserContext);

    useEffect(() => {
        showWarningFor('createHelp', requestHelpWarningMessage);
    }, []);

    useEffect(() => {
        if (title && category && description) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [title, description, category]);

    async function createHelp() {
        const { _id: userId } = user;
        setCreateHelpLoading(true);
        const createHelpRequest = await useService(
            helpService,
            'createHelpRequest',
            [title, category['_id'], description, userId],
        );
        if (!createHelpRequest.error) {
            setModalSuccessMoldalVisible(true);
        } else {
            navigation.navigate('main');
        }
        setCreateHelpLoading(false);
    }

    const renderPickerCategoryForm = () => (
        <View style={styles.catagoryPicker}>
            <Text style={styles.label}>Categoria</Text>
            <View style={styles.picker}>
                <Picker
                    label="Categoria"
                    selectedValue={category}
                    onValueChange={(itemValue) => setCategory(itemValue)}>
                    <Picker.Item label="" value={''} />
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
            title="Preciso de ajuda"
            large
            disabled={buttonDisabled}
            press={createHelp}
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
                        {createHelpLoading
                            ? renderLoadingIdicator()
                            : createHelpBtn()}
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
