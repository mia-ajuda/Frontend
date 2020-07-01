import React, { useState, useEffect } from 'react';
import {
    View,
    KeyboardAvoidingView,
    Text,
    ScrollView,
    Keyboard,
    TouchableOpacity,
    ActivityIndicator,
    ToastAndroid,
    Platform,
} from 'react-native';
import Input from '../../../components/UI/input';
import Button from '../../../components/UI/button';
import styles from './styles';
import { Icon } from 'react-native-elements';
import axios from 'axios';
import colors from '../../../../assets/styles/colorVariables';

export default function Address({ route, navigation }) {
    const { userData } = route.params;

    const [cep, setCep] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [complement, setComplement] = useState('');
    const [numberPlace, setNUmberPlace] = useState('');
    const [keyboardShow, setKeyboardShow] = useState(false);
    const [isCepValid, setIsCepValid] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

        // cleanup function
        return () => {
            Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
            Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
        };
    }, []);

    const _keyboardDidShow = () => {
        setKeyboardShow(true);
    };

    const _keyboardDidHide = () => {
        setKeyboardShow(false);
    };

    const cepHandle = async (currentCep) => {
        setCep(currentCep.substring(0, 8));

        if (currentCep.length === 8) {
            try {
                setLoading(true);
                const response = await axios.get(
                    `https://viacep.com.br/ws/${currentCep}/json/`,
                );

                if (!response.data.erro) {
                    const {
                        localidade,
                        uf,
                        logradouro,
                        bairro,
                    } = response.data;

                    setIsCepValid(true);
                    setState(uf);
                    setCity(localidade);
                    setComplement(logradouro + ' / ' + bairro);
                } else {
                    ToastAndroid.showWithGravityAndOffset(
                        'CEP não encontrado!',
                        ToastAndroid.LONG,
                        ToastAndroid.CENTER,
                        25,
                        50,
                    );

                    setIsCepValid(false);
                }
            } catch {
                setIsCepValid(true);
            }
        }

        setLoading(false);
    };

    const cityHandle = (enteredName) => {
        setCity(enteredName);
    };

    const stateHandle = (enteredName) => {
        if (enteredName.length > 2) {
            const subUf = enteredName.substring(0, 2);
            setState(subUf);
        } else {
            setState(enteredName);
        }
    };

    const complementHandle = (enteredName) => {
        setComplement(enteredName);
    };

    const numberHandle = (enteredName) => {
        setNUmberPlace(enteredName);
    };

    const continueHandler = () => {
        const address = { cep, city, state, number: numberPlace, complement };
        const newUserData = { address, ...userData };
        userData.photo
            ? navigation.navigate('riskGroup', { userData: newUserData })
            : navigation.navigate('photo', { userData: newUserData });
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 5 : 0}>
            {!keyboardShow && !loading ? (
                <View>
                    <View style={styles.backIcon}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.button}>
                            <Icon name={'arrow-back'} color={'black'} />
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.text1}>
                            Precisamos de algumas informações sobre onde você
                            mora!! Por favor preencha as informações abaixo?
                        </Text>
                    </View>
                </View>
            ) : (
                <></>
            )}

            {!loading ? (
                <>
                    <ScrollView
                        style={styles.scroll1}
                        contentContainerStyle={styles.scroll}>
                        <View style={styles.inputView}>
                            <Input
                                change={cepHandle}
                                valid={isCepValid}
                                label="CEP"
                                placeholder="Digite seu CEP"
                                value={cep}
                                keyboard="numeric"
                            />
                            <View style={styles.viewMargin}></View>
                            <Input
                                change={cityHandle}
                                value={city}
                                label="Cidade"
                                placeholder="Digite sua cidade"
                            />
                            <View style={styles.viewMargin}></View>
                            <Input
                                change={stateHandle}
                                value={state}
                                label="UF"
                                placeholder="UF"
                            />
                            <View style={styles.viewMargin}></View>
                            <Input
                                change={numberHandle}
                                label="Número"
                                placeholder="Digite o número de sua residência"
                                value={numberPlace}
                                keyboard="numeric"
                            />
                            <View style={styles.viewMargin}></View>
                            <Input
                                change={complementHandle}
                                label="Complemento"
                                value={complement}
                                placeholder="Opcional"
                            />
                            <View style={styles.viewMargin}></View>
                        </View>
                    </ScrollView>
                    <View style={styles.btnView}>
                        <Button
                            title="Continuar"
                            disabled={
                                cep === '' ||
                                city === '' ||
                                state === '' ||
                                numberPlace === '' ||
                                !isCepValid
                            }
                            large
                            press={continueHandler}
                        />
                    </View>
                </>
            ) : (
                <>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <ActivityIndicator
                            size="large"
                            color={colors.primary}
                        />
                    </View>
                </>
            )}
        </KeyboardAvoidingView>
    );
}
