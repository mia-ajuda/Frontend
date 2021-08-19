import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View, Image, Text } from 'react-native';
import getYearsSince from '../../utils/getYearsSince';
import NoPossibleInteresteds from '../../components/NoHelps';
import styles from './styles';
import shortenName from '../../utils/shortenName';
import ConfirmationModal from '../modals/confirmationModal';
import helpService from '../../services/Help';
import useService from '../../services/useService';
import { alertSuccess } from '../../utils/Alert';

export default function ListPossibleInteresteds({ route, navigation }) {
    const { possibleInteresteds, message, method, helpId } = route.params;
    const [confirmationModalVisible, setConfirmationModalVisible] =
        useState(false);
    const [isChooseRequestLoading, setChooseRequestLoading] = useState(false);
    const [selectedInterestedId, setSelectedInterestedId] = useState(false);

    const chooseInterested = async () => {
        setChooseRequestLoading(true);
        const chooseInterestedUserRequest = await useService(
            helpService,
            method,
            [helpId, selectedInterestedId],
        );
        if (!chooseInterestedUserRequest.error) {
            alertSuccess('O interessado foi escolhido com sucesso!');
        }

        navigation.navigate('Atividades');
    };

    const renderPossibleInterestedsList = () => {
        const renderClickAction = (interestedId) => {
            setSelectedInterestedId(interestedId);
            setConfirmationModalVisible(true);
        };

        return possibleInteresteds.map((interested) => (
            <TouchableOpacity
                key={interested._id}
                onPress={() => renderClickAction(interested._id)}>
                <View style={styles.interested}>
                    <Image
                        style={styles.imageProfile}
                        source={{
                            uri: `data:image/png;base64,${interested.photo}`,
                        }}
                    />
                    <View>
                        <Text style={[styles.infoText, styles.infoTextFont]}>
                            {shortenName(interested.name)}
                        </Text>
                        {getYearsSince(interested.birthday) != 0 && (
                            <Text>
                                <Text
                                    style={[
                                        styles.infoText,
                                        styles.infoTextFont,
                                    ]}>
                                    Idade:{' '}
                                </Text>
                                {getYearsSince(interested.birthday)}
                            </Text>
                        )}
                        <Text>
                            <Text
                                style={[styles.infoText, styles.infoTextFont]}>
                                Cidade:{' '}
                            </Text>
                            {interested.address.city}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        ));
    };

    const renderNoPossibleInterestedsMessage = () => {
        return (
            <View style={styles.noPossibleInteresteds}>
                <NoPossibleInteresteds
                    title={'Você ainda não possui interessados na ajuda.'}
                />
            </View>
        );
    };

    const renderList = () => {
        return (
            <ScrollView contentContainerStyle={styles.container}>
                {possibleInteresteds.length > 0
                    ? renderPossibleInterestedsList()
                    : renderNoPossibleInterestedsMessage()}
                <ConfirmationModal
                    visible={confirmationModalVisible}
                    setVisible={setConfirmationModalVisible}
                    action={chooseInterested}
                    message={message}
                    isLoading={isChooseRequestLoading}
                />
            </ScrollView>
        );
    };

    return renderList();
}
