import React, { useState, useEffect, useContext } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { Badge } from 'react-native-elements';
import api from '../../../../services/Api';
import moment from 'moment';
import { UserContext } from '../../../../store/contexts/userContext';
import Button from '../../../../components/UI/button';
import colors from '../../../../../assets/styles/colorVariables';

import ConfirmationModal from '../../../../components/modals/confirmationModal';
import styles from './styles';

export default function ListHelpers({
    clickAction,
    stateAction,
    helpId,
    navigation,
}) {
    const { user } = useContext(UserContext);
    const [visible, setVisible] = useState(false);
    const [helperImage, setHelperImage] = useState(
        'https://upload.wikimedia.org/wikipedia/commons/0/03/Flag_Blank.svg',
    );
    const [helperName, setHelperName] = useState('');
    const [, setHelperAge] = useState('');
    const [helperCity, setHelperCity] = useState('');
    const [helperPhone, setHelperPhone] = useState('');
    const [help, setHelp] = useState({});
    const [possibleHelpers, setPossibleHelpers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modalAction, setModalAction] = useState(() => {});
    const [modalMessage, setModalMessage] = useState('');

    const [loading, setLoading] = useState(false);
    const helperPhoto = (photo) =>
        photo.includes('http')
            ? { uri: photo }
            : { uri: `data:image/png;base64,${photo}` };

    const loadHelpInfo = async () => {
        setLoading(true);
        try {
            const helps = await api.get(`/help?id=${user._id}`);
            const helpFinal = helps.data.filter((help) => help._id === helpId);
            setHelp(helpFinal[0]);
            setPossibleHelpers(helpFinal[0].possibleHelpers);

            if (helpFinal[0].helperId) {
                const resp = await api.get(
                    `user/getUser/${helpFinal[0].helperId}`,
                );
                setHelperImage(resp.data.photo);
                setHelperAge(moment().diff(resp.data.birthday, 'year'));
                setHelperName(resp.data.name);

                setHelperCity(resp.data.address.city);
                setHelperPhone(resp.data.phone);
            }
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err.response);
        }
    };

    async function ownerFinishedHelp() {
        try {
            await api.put(`/help/ownerConfirmation/${helpId}/${user._id}`);
            setVisible(false);
            Alert.alert(
                'Sucesso!',
                'Ajuda finalizada com sucesso! Aguarde a confirmação do ajudante!',
                [{ text: 'OK', onPress: () => {} }],
                {
                    cancelable: false,
                },
            );
            navigation.navigate('em andamento');
        } catch (err) {
            Alert.alert(
                'Opsss!',
                'Erro ao finalizar ajuda, tente mais tarde!',
                [{ text: 'OK', onPress: () => {} }],
                {
                    cancelable: false,
                },
            );
        }
    }

    useEffect(() => {
        clickAction(false);
        loadHelpInfo();
    }, [helpId, visible]);

    async function chooseHelper(helperId) {
        try {
            await api.put(`/help/chooseHelper/${helpId}/${helperId}`);
            setVisible(false);
            setIsLoading(false);
            Alert.alert(
                'Sucesso!',
                'Ajudante escolhido com sucesso!',
                [{ text: 'OK', onPress: () => {} }],
                {
                    cancelable: false,
                },
            );
        } catch (err) {
            Alert.alert(
                'Ooops..',
                err.error || 'Algo deu errado, tente novamente mais tarde',
                [{ text: 'OK', onPress: () => {} }],
                {
                    cancelable: false,
                },
            );
        }
    }

    function openModal(action, helperId = null) {
        switch (action) {
            case 'finish':
                setModalAction(() => () => {
                    ownerFinishedHelp();
                    setIsLoading(true);
                });
                setModalMessage(
                    'Você tem certeza que deseja finalizar este pedido de ajuda?',
                );
                break;
            case 'choose':
                setModalAction(() => () => {
                    chooseHelper(helperId);
                    setIsLoading(true);
                });
                setModalMessage(
                    'Você tem certeza que deseja este usuário como seu ajudante?',
                );
                break;
            default:
                return;
        }
        setVisible(true);
    }

    return (
        <View
            style={[
                styles.container,
                stateAction
                    ? { justifyContent: 'flex-start' }
                    : { justifyContent: 'flex-end' },
            ]}>
            {loading ? (
                <ActivityIndicator color={colors.primary} size="large" />
            ) : help && help.status && help.status !== 'waiting' ? (
                help.status === 'on_going' ||
                help.status === 'helper_finished' ? (
                    <View>
                        <Text style={styles.textVolunteer}>Voluntário:</Text>
                        <View style={styles.volunteerContainer}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image
                                    style={styles.volunteerImage}
                                    source={helperPhoto(helperImage)}
                                />
                                <View style={{ width: '80%' }}>
                                    <Text
                                        style={[
                                            {
                                                fontFamily:
                                                    'montserrat-semibold',
                                            },
                                        ]}>
                                        {helperName}
                                    </Text>
                                    <Text style={{ flexWrap: 'wrap' }}>
                                        <Text
                                            style={[
                                                {
                                                    fontFamily:
                                                        'montserrat-semibold',
                                                },
                                            ]}>
                                            Cidade:{' '}
                                        </Text>
                                        {helperCity}
                                    </Text>
                                    <Text>
                                        <Text
                                            style={[
                                                {
                                                    fontFamily:
                                                        'montserrat-semibold',
                                                },
                                            ]}>
                                            Telefone:{' '}
                                        </Text>
                                        {helperPhone}
                                    </Text>
                                </View>
                            </View>
                            {help.status === 'on_going' ||
                            help.status === 'helper_finished' ? (
                                <Button
                                    press={() => openModal('finish')}
                                    title="Finalizar Ajuda"
                                    large
                                />
                            ) : (
                                <></>
                            )}
                        </View>
                    </View>
                ) : null
            ) : possibleHelpers.length ? (
                <TouchableOpacity
                    style={styles.buttonHelpers}
                    onPress={() => clickAction(!stateAction)}>
                    <Text style={styles.textBtn}>Possíveis ajudantes</Text>

                    <Badge
                        value={
                            <Text style={styles.labelBadge}>
                                {possibleHelpers.length}
                            </Text>
                        }
                        badgeStyle={styles.badgeStyle}
                        containerStyle={styles.containerBadge}
                    />
                </TouchableOpacity>
            ) : (
                <View style={styles.wrapperNoHelperWarn}>
                    <Text style={styles.textNoHelpers}>
                        Não há ajudantes para este pedido!
                    </Text>
                </View>
            )}

            {stateAction ? (
                <View style={styles.listPossibleHelpers}>
                    <ScrollView>
                        {possibleHelpers.map((helper) => (
                            <TouchableOpacity
                                key={helper._id}
                                onPress={() => {
                                    openModal('choose', helper._id);
                                }}>
                                <View style={styles.helper}>
                                    <Image
                                        style={styles.imageProfile}
                                        source={helperPhoto(helper.photo)}
                                    />
                                    <View>
                                        <Text
                                            style={[
                                                styles.infoText,
                                                {
                                                    fontFamily:
                                                        'montserrat-semibold',
                                                },
                                            ]}>
                                            {helper.name}
                                        </Text>
                                        <Text>
                                            <Text
                                                style={[
                                                    styles.infoText,
                                                    {
                                                        fontFamily:
                                                            'montserrat-semibold',
                                                    },
                                                ]}>
                                                Idade:{' '}
                                            </Text>
                                            {moment().diff(
                                                helper.birthday,
                                                'year',
                                            )}
                                        </Text>
                                        <Text>
                                            <Text
                                                style={[
                                                    styles.infoText,
                                                    {
                                                        fontFamily:
                                                            'montserrat-semibold',
                                                    },
                                                ]}>
                                                Cidade:{' '}
                                            </Text>
                                            {helper.address.city}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            ) : (
                <></>
            )}
            <ConfirmationModal
                visible={visible}
                setVisible={setVisible}
                action={modalAction}
                message={modalMessage}
                isLoading={isLoading}
            />
        </View>
    );
}
