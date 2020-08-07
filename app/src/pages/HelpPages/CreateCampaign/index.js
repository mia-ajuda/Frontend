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
import campaignService from '../../../services/Campaign';
import { UserContext } from '../../../store/contexts/userContext';
import useService from '../../../services/useService';
import showWarningFor from '../../../utils/warningPopUp';
import { requestHelpWarningMessage } from '../../../docs/warning';

export default function CreateCampaign({ navigation }) {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState(null);
    const [description, setDescription] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [modalSuccessModalVisible, setModalSuccessMoldalVisible] = useState(
        false,
    );
    const [createCampaignLoading, setCreateCampaignLoading] = useState(false);

    const { categories } = useContext(CategoryContext);
    const { user } = useContext(UserContext);

    useEffect(() => {
        showWarningFor('createCampaign', requestHelpWarningMessage);
    }, []);

    useEffect(() => {
        if (title && category && description) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [title, description, category]);

    async function createCampaign() {
        const { _id: userId } = user;
        setCreateCampaignLoading(true);
        const createCampaign = await useService(
            campaignService,
            'createCampaign',
            [title, category['_id'], description, userId],
        );
        if (!createCampaign.error) {
            setModalSuccessMoldalVisible(true);
        } else {
            navigation.navigate('main');
        }
        setCreateCampaignLoading(false);
    }

    const renderPickerCategoryForm = () => (
        <View style={styles.catagoryPicker}>
            <Text style={styles.label}>Categoria</Text>
            <View style={styles.picker}>
                <Picker
                    label="Categoria"
                    selectedValue={category}
                    onValueChange={(itemValue) => {
                        setCategory(itemValue);
                    }}>
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
        <Input label="Título da campanha" change={(text) => setTitle(text)} />
    );
    const renderLoadingIdicator = () => (
        <ActivityIndicator size="large" color={colors.primary} />
    );

    const createCampaignBtn = () => (
        <Button
            title="Criar um campanha"
            large
            disabled={buttonDisabled}
            press={createCampaign}
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
                        {createCampaignLoading
                            ? renderLoadingIdicator()
                            : createCampaignBtn()}
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
