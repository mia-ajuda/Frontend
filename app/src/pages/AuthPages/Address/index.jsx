import React, { useState, useEffect, useContext } from 'react';
import { View, KeyboardAvoidingView, Text, ScrollView } from 'react-native';
import Input from '../../../components/UI/input';
import Button from '../../../components/UI/button';
import styles from './styles';
import callService from '../../../services/callService';
import ViaCep from '../../../ExternalServices/ViaCep';
import { DeviceInformationContext } from '../../../store/contexts/deviceInformationContext';
import { LoadingContext } from '../../../store/contexts/loadingContext';

export default function Address({ navigation, route }) {
    const { keyboard } = useContext(DeviceInformationContext);
    const { isLoading, setIsLoading } = useContext(LoadingContext);

    const [cep, setCep] = useState('');
    const [isCepValid, setCepValid] = useState(true);
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const [complement, setComplement] = useState('');
    const [numberPlace, setNumberPlace] = useState('');

    useEffect(() => {
        const shouldResquestCepInformation = cep.length === 8;
        if (shouldResquestCepInformation) {
            getCepInformation(cep);
        }
    }, [cep]);

    async function getCepInformation(currentCep) {
        keyboard.dismiss();
        setIsLoading(true);
        const cepInformation = await callService(ViaCep, 'getCepInformation', [
            currentCep,
        ]);
        if (!cepInformation.error) {
            const { bairro, localidade, logradouro, uf } = cepInformation;
            setUf(uf);
            setCity(localidade);
            setComplement(`${logradouro}/${bairro}`);
            setCepValid(true);
        }
        setIsLoading(false);
    }

    const renderPageDescription = () => {
        if (keyboard.visible === false) {
            return (
                <Text style={styles.pageDescription}>
                    Utilizamos seu endereço como forma de autenticação. Por
                    favor, preencha as informações abaixo.
                </Text>
            );
        }
    };

    const renderRegistrationForm = () => (
        <View style={styles.inputView}>
            <Input
                change={(cep) => setCep(cep)}
                label="CEP"
                placeholder="Digite seu CEP"
                value={cep}
                keyboard="numeric"
                maxLength={8}
                valid={isCepValid}
            />
            <View style={styles.viewMargin}></View>
            <Input
                change={(city) => setCity(city)}
                value={city}
                label="Cidade"
                placeholder="Digite sua cidade"
            />
            <View style={styles.viewMargin}></View>
            <Input
                change={(uf) => setUf(uf)}
                value={uf}
                label="UF"
                placeholder="UF"
                maxLength={2}
            />
            <View style={styles.viewMargin}></View>
            <Input
                change={(number) => setNumberPlace(number)}
                label="Número"
                placeholder="Digite o número de sua residência"
                value={numberPlace}
                keyboard="numeric"
            />
            <View style={styles.viewMargin}></View>
            <Input
                change={(complement) => setComplement(complement)}
                label="Complemento"
                value={complement}
                placeholder="Opcional"
            />
            <View style={styles.viewMargin}></View>
        </View>
    );

    const renderContinueButton = () => {
        const disableButton =
            cep.length == 0 ||
            city.length == 0 ||
            uf.length == 0 ||
            numberPlace.length == 0;

        return (
            <View style={styles.btnView}>
                <Button
                    title="Continuar"
                    disabled={disableButton}
                    large
                    press={continueButtonPressed}
                />
            </View>
        );
    };

    const continueButtonPressed = () => {
        const address = {
            cep,
            city,
            state: uf,
            number: numberPlace,
            complement,
        };
        const userDataFromAddressPage = {
            address,
            ...route.params,
        };
        navigation.navigate('photo', { userDataFromAddressPage });
    };

    return (
        <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContainer}
        >
            <KeyboardAvoidingView style={styles.container}>
                {renderPageDescription()}

                {!isLoading && renderRegistrationForm()}

                {renderContinueButton()}
            </KeyboardAvoidingView>
        </ScrollView>
    );
}
