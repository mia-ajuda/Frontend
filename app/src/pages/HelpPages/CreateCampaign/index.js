import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './styles';
import Container from '../../../components/Container';
import Input from '../../../components/UI/input';
import Button from '../../../components/UI/button';
import showWarningFor from '../../../utils/warningPopUp';
import { requestHelpWarningMessage } from '../../../docs/warning';
import SelectCategoryForm from '../../../components/SelectCategoryForm';
import navigateToCreateFlow from '../../../utils/navigateToCreateFlow';

export default function CreateCampaign({ navigation }) {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState([]);
    const [description, setDescription] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);

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
        navigateToCreateFlow(
            navigation,
            title,
            category,
            description,
            'Campaign',
        );
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
        <Input label="Título da campanha" change={(text) => setTitle(text)} />
    );

    const createCampaignBtn = () => (
        <Button
            title="Criar campanha"
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
                    {renderInputDescriptionForm()}
                    <SelectCategoryForm
                        helpCategoryIds={category}
                        setHelpCategoryIds={setCategory}
                    />
                    <View style={styles.btnContainer}>
                        {createCampaignBtn()}
                    </View>
                </View>
            </Container>
        </ScrollView>
    );
}
