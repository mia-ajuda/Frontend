import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    KeyboardAvoidingView,
    Text,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import ToastMessage from '../../../utils/ToastAndroid';
import Input from '../../../components/UI/input';
import Button from '../../../components/UI/button';
import styles from './styles';
import { Icon } from 'react-native-elements';
import ViaCep from '../../../services/ExternalServices/ViaCep';
import colors from '../../../../assets/styles/colorVariables';
import { DeviceInformation } from '../../../store/contexts/deviceInformationContext';

export default function Address({ route, navigation }) {
    const { keyboard } = useContext(DeviceInformation);
    const { userData } = route.params;

    const [cep, setCep] = useState('');
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
        keyboard.hide();
        try {
            setCepRequestLoading(true);
            const cepInformation = await ViaCep.getCepInformation(currentCep);
            const { bairro, localidade, logradouro, uf } = cepInformation;

            setUf(uf);
            setCity(localidade);
            setComplement(`${logradouro}/${bairro}`);
        } catch (error) {
            ToastMessage(
                error.message || 'Não foi possível recuperar este cep',
            );
        } finally {
            setCepRequestLoading(false);
        }
    }

    const continueButtonPressed = () => {
        const address = { cep, city, uf, number: numberPlace, complement };
        const newUserData = { address, ...userData };
        navigation.navigate('photo', { userData: newUserData });
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
        const disableButton = !(
            cep.length ||
            city.length ||
            uf.length ||
            numberPlace.length
        );

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

    return (
        <KeyboardAvoidingView style={styles.container} behavior="height">
            <ScrollView
                style={{ width: '100%' }}
                contentContainerStyle={styles.scroll}>
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
    );
}
