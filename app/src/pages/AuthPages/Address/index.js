import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    KeyboardAvoidingView,
    Text,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import Input from '../../../components/UI/input';
import Button from '../../../components/UI/button';
import styles from './styles';
import { Icon } from 'react-native-elements';
import useService from '../../../services/useService';
import ViaCep from '../../../ExternalServices/ViaCep';
import colors from '../../../../assets/styles/colorVariables';
import { DeviceInformationContext } from '../../../store/contexts/deviceInformationContext';

export default function Address({ route, navigation }) {
    const { keyboard } = useContext(DeviceInformationContext);
    const { userDataFromPersonalPage } = route.params;
    const [cep, setCep] = useState('');
    const [isCepValid, setCepValid] = useState(true);
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const [complement, setComplement] = useState('');
    const [numberPlace, setNumberPlace] = useState('');
    const [isCepRequestLoading, setCepRequestLoading] = useState(false);

    useEffect(() => {
        const shouldResquestCepInformation = cep.length === 8;
        if (shouldResquestCepInformation) {
            getCepInformation(cep);
        }
    }, [cep]);

    async function getCepInformation(currentCep) {
        keyboard.dismiss();
        setCepRequestLoading(true);
        const cepInformation = await useService(ViaCep, 'getCepInformation', [
            currentCep,
        ]);
        if (!cepInformation.error) {
            const { bairro, localidade, logradouro, uf } = cepInformation;
            setUf(uf);
            setCity(localidade);
            setComplement(`${logradouro}/${bairro}`);
            setCepValid(true);
        }
        setCepRequestLoading(false);
    }

    const renderPageDescription = () => {
        if (keyboard.visible === false) {
            return (
                <Text style={styles.pageDescription}>
                    Precisamos de algumas informações sobre onde você mora. Por
                    favor, preencha as informações abaixo.
                </Text>
            );
        }
    };
    const renderLoadingIndicator = () => (
        <View style={styles.loadingIndicator}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );

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
            ...userDataFromPersonalPage,
        };
        navigation.navigate('photo', { userDataFromAddressPage });
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior='padding'>
            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContainer}>
                <View style={styles.backIcon}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name={'arrow-back'} color={'black'} />
                    </TouchableOpacity>
                </View>

                {renderPageDescription()}

                {isCepRequestLoading
                    ? renderLoadingIndicator()
                    : renderRegistrationForm()}
            </ScrollView>

            {renderContinueButton()}
        </KeyboardAvoidingView>
    ) ;
}
