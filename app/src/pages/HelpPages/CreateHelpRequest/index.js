import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView } from 'react-native';
import styles from './styles';
import Container from '../../../components/Container';
import Input from '../../../components/UI/input';
import Button from '../../../components/UI/button';
import SelectCategoryForm from '../../../components/SelectCategoryForm';

import showWarningFor from '../../../utils/warningPopUp';
import { requestHelpWarningMessage } from '../../../docs/warning';

export default function CreateHelp({ navigation }) {
    const [title, setTitle] = useState('');
    const [categoryIds, setCategoryIds] = useState([]);
    const [description, setDescription] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);

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

    const naviteToLocation = () => {
        navigation.navigate('location', {
            requestInfo: {
                title: title,
                category: categoryIds,
                description: description,
            },
            requestType: 'HelpRequest',
        });
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

    const createHelpBtn = () => (
        <Button
            title="Continuar"
            large
            disabled={buttonDisabled}
            press={naviteToLocation}
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
                            {createHelpBtn()}
                        </View>
                    </View>
                </Container>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}
