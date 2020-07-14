import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    ActivityIndicator,
    Platform,
} from 'react-native';
import { UserContext } from '../../../../store/contexts/userContext';
import Button from '../../../../components/UI/button';
import Input from '../../../../components/UI/input';
import colors from '../../../../../assets/styles/colorVariables';
import UserService from '../../../../services/User';
import axios from 'axios';
import styles from './styles';
import actions from '../../../../store/actions';
import ConfirmationModal from '../../../../components/modals/confirmationModal';
import { alertSuccess, alertError } from '../../../../utils/Alert';

export default function EditCepField({ route, navigation }) {
    const [fieldToEdit, setFieldToEdit] = useState('');
    const [isFieldEditedValid, setFieldEditedValid] = useState(true);
    const [numberPlace, setNumberPlace] = useState('');
    const [state, setState] = useState('');
    const [newCity, setCity] = useState('');
    const [complement, setComplement] = useState('');
    const [loading, setLoading] = useState('');
    const { dispatch } = useContext(UserContext);
    const [loadingModal, setLoadingModal] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const address = route.params.user.address;
        setFieldToEdit(address.cep || '');
        setCity(address.city || '');
        setNumberPlace(String(address.number) || '');
        setComplement(address.complement || '');
        setState(address.state || '');
    }, []);

    const cepHandle = async (currentCep) => {
        setFieldToEdit(currentCep.substring(0, 8));
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

                    setFieldEditedValid(true);
                    setState(uf);
                    setCity(localidade);
                    setComplement(logradouro + ' / ' + bairro);
                } else {
                    setFieldEditedValid(false);
                }
            } catch {
                setFieldEditedValid(true);
            }
        } else {
            setFieldEditedValid(false);
        }

        setLoading(false);
    };

    const stateHandle = (enteredName) => {
        if (enteredName.length > 2) {
            const subUf = enteredName.substring(0, 2);
            setState(subUf);
        } else {
            setState(enteredName);
        }
    };

    const handleEditRequest = async () => {
        let data = {
            cep: fieldToEdit,
            number: numberPlace,
            complement,
            city: newCity,
            state,
        };
        try {
            setLoadingModal(true);
            const resp = await UserService.editUserAdress(data);
            dispatch({ type: actions.user.storeUserInfo, data: resp });
            alertSuccess('Alteração feita com sucesso!');
            setLoadingModal(false);
            setModalVisible(false);
            navigation.goBack();
        } catch (err) {
            alertError(err, null, 'Ooops..');
            setLoadingModal(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 5 : 0}>
            <ConfirmationModal
                visible={isModalVisible}
                setVisible={setModalVisible}
                action={handleEditRequest}
                message={'Tem certeza que deseja modificar esta informação?'}
                isLoading={loadingModal}
            />
            <ScrollView
                style={styles.cep}
                contentContainerStyle={styles.scroll}>
                {loading ? (
                    <View style={styles.scrollLoading}>
                        <ActivityIndicator
                            size="large"
                            color={colors.primary}
                        />
                    </View>
                ) : (
                    <>
                        <Text style={styles.titleEdit}>
                            Preencha o campo com a nova informação e pressione
                            &quot;Editar&quot; para modificar.
                        </Text>
                        <View style={styles.content}>
                            <View style={styles.cep}>
                                <Input
                                    change={cepHandle}
                                    valid={isFieldEditedValid}
                                    label={'CEP'}
                                    placeholder={'Digite seu CEP'}
                                    value={fieldToEdit}
                                    keyboard={'numeric'}
                                />
                            </View>
                            <View style={styles.cep}>
                                <View style={styles.viewMargin}></View>
                                <Input
                                    change={(city) => setCity(city)}
                                    value={newCity}
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
                                    change={(number) => setNumberPlace(number)}
                                    label="Número"
                                    value={numberPlace}
                                    keyboard="numeric"
                                    placeholder="Digite o número de sua residência"
                                />
                                <View style={styles.viewMargin}></View>
                                <Input
                                    change={(complement) =>
                                        setComplement(complement)
                                    }
                                    label="Complemento"
                                    value={complement}
                                    placeholder="Opcional"
                                />
                                <View style={styles.viewMargin}></View>
                            </View>
                        </View>
                        <Button
                            style={styles.btnEdit}
                            title="Editar"
                            disabled={
                                fieldToEdit === '' ||
                                !isFieldEditedValid ||
                                (route.params.attribute === 'cep' &&
                                    (state === '' ||
                                        newCity === '' ||
                                        numberPlace === '' ||
                                        complement === ''))
                            }
                            large
                            press={() => setModalVisible(true)}
                        />
                    </>
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
