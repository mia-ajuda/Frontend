import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from './styles';
import Container from '../../../components/Container';
import Input from '../../../components/UI/input';
import Button from '../../../components/UI/button';
import showWarningFor from '../../../utils/warningPopUp';
import { requestHelpWarningMessage } from '../../../docs/warning';
import SelectCategoryForm from '../../../components/SelectCategoryForm';

export default function CreateHelp({ navigation }) {
    const [helpOfferTitle, setHelpOfferTitle] = useState('');
    const [helpOfferCategoryIds, setHelpOfferCategoryIds] = useState([]);
    const [helpOfferDescription, setHelpOfferDescription] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(true);

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

    const naviteToLocation = () => {
        navigation.navigate('location', {
            requestInfo: {
                title: helpOfferTitle,
                category: helpOfferCategoryIds,
                description: helpOfferDescription,
            },
            requestType: 'HelpOffer',
        });
    };

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

    const createHelpOfferBtn = () => (
        <Button
            title="Continuar"
            large
            disabled={buttonDisabled}
            press={naviteToLocation}
        />
    );

    return (
        <ScrollView>
            <Container>
                <View style={styles.view}>
                    {renderInputTitleForm()}
                    {renderInputDescriptionForm()}
                    <Text style={styles.label}>
                        Selecione no mínimo 1 categoria:
                    </Text>
                    <SelectCategoryForm
                        helpCategoryIds={helpOfferCategoryIds}
                        setHelpCategoryIds={setHelpOfferCategoryIds}
                        helpType={'offer'}
                    />
                    <View style={styles.btnContainer}>
                        {createHelpOfferBtn()}
                    </View>
                </View>
            </Container>
        </ScrollView>
    );
}
