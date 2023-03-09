import React, { useState, useContext } from 'react';
import {
    View,
    ScrollView,
    KeyboardAvoidingView,
    ActivityIndicator,
} from 'react-native';
import { UserContext } from '../../../../store/contexts/userContext';
import Button from '../../../../components/UI/button';
import Input from '../../../../components/UI/input';
import colors from '../../../../../assets/styles/colorVariables';
import UserService from '../../../../services/User';
import EntityService from '../../../../services/Entity';
import ViaCep from '../../../../ExternalServices/ViaCep';
import styles from './styles';
import actions from '../../../../store/actions';
import ConfirmationModal from '../../../../components/modals/confirmationModal';
import { alertSuccess } from '../../../../utils/Alert';
import { DeviceInformationContext } from '../../../../store/contexts/deviceInformationContext';
import callService from '../../../../services/callService';
import { LoadingContext } from '../../../../store/contexts/loadingContext';

export default function EditCepField({ route, navigation }) {
    const address = route.params.user?.address;
    const isEntityUser = route.params.user.cnpj;

    const { keyboard } = useContext(DeviceInformationContext);
    const { isLoading, setIsLoading } = useContext(LoadingContext);
    const { dispatch } = useContext(UserContext);

    const [newCep, setNewCep] = useState(address?.cep || '');
    const [isCepValid, setCepValid] = useState(true);
    const [newNumber, setNewNumber] = useState(String(address?.number || ''));
    const [newState, setNewState] = useState(address?.state || '');
    const [newCity, setNewCity] = useState(address?.city || '');
    const [newComplement, setNewComplement] = useState(
        address?.complement || '',
    );
    const [confiramtionModalVisible, setConfirmationModalVisible] =
        useState(false);

    const goBackToUserProfilePage = () => navigation.goBack();

    async function onCepChange(cep) {
        setNewCep(cep);
        const shouldResquestCepInformation = cep.length === 8;
        if (shouldResquestCepInformation) {
            getCepInformation(cep);
        }
    }

    async function getCepInformation(currentCep) {
        keyboard.dismiss();
        setIsLoading(true);
        const cepInformation = await callService(ViaCep, 'getCepInformation', [
            currentCep,
        ]);
        if (!cepInformation.error) {
            const { bairro, localidade, logradouro, uf } = cepInformation;

            setNewState(uf);
            setNewCity(localidade);
            setNewComplement(`${logradouro}/${bairro}`);
            setCepValid(true);
        } else {
            setCepValid(false);
        }
        setIsLoading(false);
    }

    const handleEditRequest = async () => {
        let data = {
            cep: newCep,
            number: newNumber,
            complement: newComplement,
            city: newCity,
            state: newState,
        };

        setIsLoading(true);
        const resp = isEntityUser
            ? await callService(EntityService, 'editEntityAdress', [data])
            : await callService(UserService, 'editUserAdress', [data]);
        if (!resp.error) {
            dispatch({ type: actions.user.storeUserInfo, data: resp });
            alertSuccess('Alteração feita com sucesso!');
        }
        goBackToUserProfilePage();
    };

    const renderEditionForm = () => (
        <View style={styles.content}>
            <View style={styles.cep}>
                <Input
                    change={onCepChange}
                    label="CEP"
                    placeholder="Digite seu CEP"
                    value={newCep}
                    keyboard="numeric"
                    maxLength={8}
                    valid={isCepValid}
                />
            </View>
            <View style={styles.cep}>
                <View style={styles.viewMargin}></View>
                <Input
                    change={(city) => setNewCity(city)}
                    value={newCity}
                    label="Cidade"
                    placeholder="Digite sua cidade"
                />
                <View style={styles.viewMargin}></View>
                <Input
                    change={(state) => setNewState(state)}
                    value={newState}
                    label="UF"
                    placeholder="UF"
                    maxLength={2}
                />
                <View style={styles.viewMargin}></View>
                <Input
                    change={(number) => setNewNumber(number)}
                    label="Número"
                    value={newNumber}
                    keyboard="numeric"
                    placeholder="Digite o número de sua residência"
                />
                <View style={styles.viewMargin}></View>
                <Input
                    change={(complement) => setNewComplement(complement)}
                    label="Complemento"
                    value={newComplement}
                    placeholder="Opcional"
                />
                <View style={styles.viewMargin}></View>
            </View>
        </View>
    );
    const renderEditButton = () => (
        <Button
            style={styles.btnEdit}
            title="Editar"
            disabled={
                newCep === '' ||
                !isCepValid ||
                newState === '' ||
                newCity === '' ||
                newNumber === '' ||
                newComplement === ''
            }
            large
            press={() => setConfirmationModalVisible(true)}
        />
    );

    return (
        <KeyboardAvoidingView style={styles.container} behavior={'height'}>
            <ConfirmationModal
                visible={confiramtionModalVisible}
                setVisible={setConfirmationModalVisible}
                action={handleEditRequest}
                message={'Tem certeza que deseja modificar esta informação?'}
                isLoading={isLoading}
            />
            <ScrollView
                style={styles.cep}
                contentContainerStyle={styles.scroll}
            >
                {!isLoading && renderEditionForm()}
            </ScrollView>
            {renderEditButton()}
        </KeyboardAvoidingView>
    );
}
