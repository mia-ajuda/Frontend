import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    TouchableOpacity,
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
import CategorySelector from '../../../components/modals/category/CategorySelector';

import NewHelpModalSuccess from '../../../components/modals/newHelpModal/success';

import helpService from '../../../services/Help';
import { UserContext } from '../../../store/contexts/userContext';
import useService from '../../../services/useService';
import showWarningFor from '../../../utils/warningPopUp';
import { requestHelpWarningMessage } from '../../../docs/warning';

export default function CreateHelp({ navigation }) {
    const [title, setTitle] = useState('');
    const [categoryIds, setCategoryIds] = useState([]);
    const [description, setDescription] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [modalSuccessModalVisible, setModalSuccessMoldalVisible] = useState(
        false,
    );
    const [categoryModalVisible, setCategoryModalVisible] = useState(false);
    const [createHelpLoading, setCreateHelpLoading] = useState(false);

    const { categories } = useContext(CategoryContext);
    const { user } = useContext(UserContext);

    const openCategoryModal = () => setCategoryModalVisible(true);
    const hideCategoryModal = () => setCategoryModalVisible(false);

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
        const createHelpRequest = await useService(
            helpService,
            'createHelpRequest',
            [title, categoryIds, description, userId],
        );
        if (!createHelpRequest.error) {
            setModalSuccessMoldalVisible(true);
        } else {
            navigation.navigate('main');
        }
        setCreateHelpLoading(false);
    }

    const renderPickerCategoryForm = () => (
        <TouchableOpacity
            style={styles.addCategory}
            onPress={openCategoryModal}>
            <Text style={styles.addCategoryText}>Categorias +</Text>
        </TouchableOpacity>
    );

    const renderSelectedCategories = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginTop: 10,
                }}>
                {categories.map((category) => {
                    if (categoryIds.includes(category._id)) {
                        return (
                            <Text
                                style={{
                                    backgroundColor: colors.secondary,
                                    padding: 5,
                                    elevation: 2,
                                    margin: 5,
                                    borderRadius: 2,
                                }}>
                                {category.name}
                            </Text>
                        );
                    }
                })}
            </View>
        );
    };
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
                <CategorySelector
                    modalVisible={categoryModalVisible}
                    openModal={openCategoryModal}
                    hideModal={hideCategoryModal}
                    setHelpCategoryIds={setCategoryIds}
                    categoryIds={categoryIds}
                />
                <View style={styles.view}>
                    {renderInputTitleForm()}
                    {renderInputDescriptionForm()}
                    {renderPickerCategoryForm()}
                    {renderSelectedCategories()}

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
