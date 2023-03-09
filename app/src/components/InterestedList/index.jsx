import React, { useContext, useState } from 'react';
import { ScrollView, TouchableOpacity, View, Image, Text } from 'react-native';
import getYearsSince from '../../utils/getYearsSince';
import NoPossibleInteresteds from '../NoHelps';
import callService from '../../services/callService';
import styles from './styles';
import shortenName from '../../utils/shortenName';
import helpService from '../../services/Help';
import ConfirmationModal from '../modals/confirmationModal';
import { alertSuccess } from '../../utils/Alert';
import { LoadingContext } from '../../store/contexts/loadingContext';

export default function ListPossibleInteresteds({ route, navigation }) {
    const { possibleInteresteds, message, method, helpId, setUpdateData } =
        route.params;
    const [confirmationModalVisible, setConfirmationModalVisible] =
        useState(false);
    const [selectedInterestedId, setSelectedInterestedId] = useState(false);

    const chooseInterested = async () => {
        setIsLoading(true);
        const chooseHelperRequest = await callService(helpService, method, [
            helpId,
            selectedInterestedId,
        ]);
        setIsLoading(false);
        if (!chooseHelperRequest.error) {
            alertSuccess('Interessado escolhido com sucesso!');
        }
        if (setUpdateData) setUpdateData(true);
        navigation.goBack();
    };

    const renderPossibleInterestedsList = () => {
        const renderClickAction = (interestedId) => {
            setSelectedInterestedId(interestedId);
            setConfirmationModalVisible(true);
        };

        return possibleInteresteds.map((interested) => (
            <TouchableOpacity
                key={interested._id}
                onPress={() => renderClickAction(interested._id)}
            >
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
                                    ]}
                                >
                                    Idade:{' '}
                                </Text>
                                {getYearsSince(interested.birthday)}
                            </Text>
                        )}
                        <Text>
                            <Text
                                style={[styles.infoText, styles.infoTextFont]}
                            >
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

    const renderView = () => {
        if (possibleInteresteds.length > 0)
            return renderPossibleInterestedsList();
        else return renderNoPossibleInterestedsMessage();
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {renderView()}
            <ConfirmationModal
                visible={confirmationModalVisible && !isLoading}
                setVisible={setConfirmationModalVisible}
                action={chooseInterested}
                message={message}
            />
        </ScrollView>
    );
}
