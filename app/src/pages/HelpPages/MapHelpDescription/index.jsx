import React, { useState, useContext, useEffect } from 'react';
import { View, Image, Text, ScrollView } from 'react-native';
import Button from '../../../components/UI/button';
import getYearsSince from '../../../utils/getYearsSince';
import styles from './styles';
import HelpService from '../../../services/Help';
import UserService from '../../../services/User';
import { alertSuccess } from '../../../utils/Alert';
import { UserContext } from '../../../store/contexts/userContext';
import { HelpContext } from '../../../store/contexts/helpContext';
import { HelpOfferContext } from '../../../store/contexts/helpOfferContext';
import actions from '../../../store/actions';
import callService from '../../../services/callService';
import shortenName from '../../../utils/shortenName';
import messageOperation from '../../../utils/messageOperation';

import formatDate from '../../../utils/formatDate';
import { LoadingContext } from '../../../store/contexts/loadingContext';
import { CategoriesList } from '../../../components/molecules/CategoriesList';
import { BadgeContext } from '../../../store/contexts/badgeContext';
import { Dialog } from '../../../components/molecules/Dialog';

export default function MapHelpDescription({ route, navigation }) {
    const { user } = useContext(UserContext);
    const { setHelpOfferList } = useContext(HelpOfferContext);
    const { helpList, dispatch } = useContext(HelpContext);
    const { isLoading, setIsLoading } = useContext(LoadingContext);
    const { increaseUserBadge } = useContext(BadgeContext);

    const { help, routeId } = route.params;

    const [ownerInfo, setOwnerInfo] = useState(null);
    const [confirmationModalVisible, setConfirmationModalVisible] =
        useState(false);
    const [titleMessage, setTitleMessage] = useState(false);
    const [modalMessage, setModalMessage] = useState(false);
    const [userParticipating, setUserParticipating] = useState(false);

    const goBackToMapPage = () =>
        navigation.reset({
            index: 0,
            routes: [{ name: 'home' }],
        });

    useEffect(() => {
        getOwnerInfo().catch(console.error);
    }, []);

    async function getOwnerInfo() {
        setIsLoading(true);
        if (routeId == 'offer') {
            setTitleMessage('Se candidatar para essa oferta');
            setModalMessage('Você deseja confirmar a sua candidatura?');

            const isPossibleHelpedUser = help.possibleHelpedUsers.some(
                (it) => it._id === user._id,
            );

            const isHelpedUser = help.helpedUserId.some(
                (it) => it === user._id,
            );

            if (isPossibleHelpedUser || isHelpedUser) {
                setUserParticipating(true);
            }
        } else {
            setTitleMessage('Oferecer Ajuda');
            setModalMessage('Você deseja confirmar a sua ajuda?');
        }
        const result = await callService(UserService, 'requestUserData', [
            help.ownerId,
        ]);
        if (!result.error) {
            setOwnerInfo(result);
            setIsLoading(false);
        } else {
            goBackToMapPage();
        }
    }

    function removeElementFromMap() {
        if (routeId == 'offer') {
            setHelpOfferList((currentValue) =>
                currentValue.filter((helpOffer) => helpOffer._id != help._id),
            );
        } else {
            let filteredHelpList = helpList.filter((helpFromMap) => {
                return helpFromMap._id != help._id;
            });
            dispatch({ type: actions.help.storeList, helps: filteredHelpList });
        }
    }

    async function modalAction() {
        setIsLoading(true);
        const functionName = messageOperation[routeId](false);
        const request = await callService(HelpService, functionName, [
            help._id,
            user._id,
        ]);
        if (!request.error) {
            await increaseUserBadge(user._id, 'offer', navigation);
            alertSuccess(messageOperation[routeId](true, removeElementFromMap));
            goBackToMapPage();
        }
        setIsLoading(false);
        setConfirmationModalVisible(false);
    }

    const renderHelpOwnerInformation = () => {
        const ownerNameFormated = shortenName(help.user.name);
        return (
            <View style={styles.userInfo}>
                <Image
                    source={{
                        uri: `data:image/png;base64,${ownerInfo.photo}`,
                    }}
                    style={styles.profileImage}
                />
                <View style={styles.infoTextView}>
                    <Text style={[styles.infoText, styles.infoTextFont]}>
                        {ownerNameFormated}
                    </Text>
                    <Text style={styles.infoText}>
                        <Text style={styles.infoTextFont}>Idade: </Text>
                        {getYearsSince(ownerInfo.birthday)}
                    </Text>
                    <Text style={styles.infoText}>
                        <Text style={styles.infoTextFont}>Cidade: </Text>
                        {ownerInfo.address.city}
                    </Text>
                    <Text style={styles.infoText}>
                        <Text style={styles.infoTextFont}>Criada em: </Text>
                        {formatDate(help.creationDate, '-')}
                    </Text>
                </View>
            </View>
        );
    };
    const renderHelpInformation = () => (
        <View style={styles.helpInfo}>
            <View style={styles.helpInfoText}>
                <Text style={styles.titleFont}>{help.title}</Text>
                <CategoriesList
                    categories={help.categories}
                    customStyle="w-full mt-4"
                />
                <Text style={[styles.infoText, styles.infoTextBottom]}>
                    {help.description}
                </Text>
            </View>
        </View>
    );

    const renderButton = () => (
        <Button
            title={titleMessage}
            large
            press={() => setConfirmationModalVisible(true)}
        />
    );

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <Dialog
                    isVisible={confirmationModalVisible && !isLoading}
                    title="Confirmar candidatura?"
                    description={modalMessage}
                    cancelText="Não"
                    confirmText="Sim"
                    onCloseDialog={() => setConfirmationModalVisible(false)}
                    onConfirmPress={modalAction}
                />

                {ownerInfo && (
                    <>
                        {renderHelpOwnerInformation()}
                        {renderHelpInformation()}

                        {userParticipating ? (
                            <></>
                        ) : (
                            <View style={styles.helpButtons}>
                                {renderButton()}
                            </View>
                        )}
                    </>
                )}
            </View>
        </ScrollView>
    );
}
