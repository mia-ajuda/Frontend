import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    ScrollView,
    KeyboardAvoidingView,
    ActivityIndicator,
    Platform,
} from 'react-native';
import { UserContext } from '../../../store/contexts/userContext';
import { TextInputMask } from 'react-native-masked-text';
import Button from '../../../components/UI/button';
import Input from '../../../components/UI/input';
import colors from '../../../../assets/styles/colorVariables';
import UserService from '../../../services/User';
import axios from 'axios';
import styles from './styles';
import actions from '../../../store/actions';
import ConfirmationModal from '../../../components/modals/confirmationModal';
import removeSpecialCharsFrom from '../../../utils/removeSpecialChars';
import { alertSuccess, alertError } from '../../../utils/Alert';

export default function EditProfile({ route, navigation }) {
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
        if (route.params.attribute === 'phone') {
            setFieldToEdit(route.params.user.phone.slice(3, 14));
        } else if (route.params.attribute === 'name') {
            setFieldToEdit(route.params.user.name);
        } else {
            const address = route.params.user.address;
            setFieldToEdit(address.cep || '');
            setCity(address.city || '');
            setNumberPlace(String(address.number) || '');
            setComplement(address.complement || '');
            setState(address.state || '');
        }
    }, []);

    const formatPhone = () => {
        const filterdPhone = `+55${removeSpecialCharsFrom(fieldToEdit)}`;
        return filterdPhone;
    };

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

    const handleFiledToEditChange = (value) => {
        setFieldToEdit(value);
    };

    const handleEditRequest = async () => {
        let data = {};
        if (route.params.attribute === 'cep') {
            data = {
                cep: fieldToEdit,
                number: numberPlace,
                complement,
                city: newCity,
                state,
            };
        } else if (route.params.attribute === 'name') {
            data = {
                ...route.params.user,
                name: fieldToEdit,
            };
        } else {
            data = {
                ...route.params.user,
                phone: formatPhone(),
            };
        }

        try {
            setLoadingModal(true);
            const resp = await UserService.editUser(
                data,
                route.params.attribute === 'cep' ? '/address' : '',
            );
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
                        {route.params.attribute !== 'cep' ? (
                            <Text style={styles.titleEdit}>
                                Preencha o campo com a nova informação e
                                pressione &quot;Editar&quot; para modificar.
                            </Text>
                        ) : (
                            <></>
                        )}
                        <View style={styles.content}>
                            {route.params.attribute === 'phone' ? (
                                <View style={styles.phoneView}>
                                    <Text style={styles.label}>Telefone</Text>
                                    <TextInputMask
                                        style={[
                                            styles.inputMask,
                                            fieldToEdit === '' ||
                                            isFieldEditedValid
                                                ? styles.valid
                                                : styles.invalid,
                                        ]}
                                        type={'cel-phone'}
                                        options={{
                                            maskType: 'BRL',
                                            withDDD: true,
                                            dddMask: '(99) ',
                                        }}
                                        value={fieldToEdit}
                                        onChangeText={(text) => {
                                            setFieldToEdit(text);

                                            if (text.length >= 14) {
                                                setFieldEditedValid(true);
                                            } else {
                                                setFieldEditedValid(false);
                                            }
                                        }}
                                        placeholder="Digite seu telefone"
                                    />
                                </View>
                            ) : (
                                <View style={styles.cep}>
                                    <Input
                                        change={
                                            route.params.attribute === 'cep'
                                                ? cepHandle
                                                : handleFiledToEditChange
                                        }
                                        valid={isFieldEditedValid}
                                        label={
                                            route.params.attribute === 'cep'
                                                ? 'CEP'
                                                : 'Nome'
                                        }
                                        placeholder={`Digite seu ${
                                            route.params.attribute === 'cep'
                                                ? 'CEP'
                                                : 'Nome'
                                        }`}
                                        value={fieldToEdit}
                                        keyboard={
                                            route.params.attribute === 'cep'
                                                ? 'numeric'
                                                : 'default'
                                        }
                                    />
                                </View>
                            )}

                            {route.params.attribute === 'cep' ? (
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
                                        change={(number) =>
                                            setNumberPlace(number)
                                        }
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
                            ) : (
                                <></>
                            )}
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
