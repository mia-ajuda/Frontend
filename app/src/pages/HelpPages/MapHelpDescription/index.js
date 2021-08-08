import React, { useState, useContext, useEffect } from 'react';
import { View, Image, Text, ScrollView, ActivityIndicator } from 'react-native';
import ConfirmationModal from '../../../components/modals/confirmationModal';
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
import useService from '../../../services/useService';
import shortenName from '../../../utils/shortenName';
import messageOperation from '../../../utils/messageOperation';

import colors from '../../../../assets/styles/colorVariables';

export default function MapHelpDescription({ route, navigation }) {
    const { help, helpType } = route.params;
    const { helpList, dispatch } = useContext(HelpContext);
    const { user } = useContext(UserContext);
    const [isOwnerRequestLoading, setOwnerRequestLoading] = useState(true);
    const [ownerInfo, setOwnerInfo] = useState({});
    const { helpOfferList, setHelpOfferList } = useContext(HelpOfferContext);

    const [confirmationModalVisible, setConfirmationModalVisible] =
        useState(false);
    const [isChooseHelpRequestLoading, setChooseHelpRequestLoading] =
        useState(false);

    const [titleMessage, setTitleMessage] = useState(false);
    const [modalMessage, setModalMessage] = useState(false);

    const goBackToMapPage = () => navigation.goBack();

    useEffect(() => {
        getOwnerInfo();
    }, []);

    async function getOwnerInfo() {
        setOwnerRequestLoading(true);
        if (helpType == 'offer') {
            setTitleMessage('Se candidatar para essa oferta');
            setModalMessage('Você deseja confirmar a sua candidatura?');
        } else {
            setTitleMessage('Oferecer Ajuda');
            setModalMessage('Você deseja confirmar a sua ajuda?');
        }
        const result = await useService(UserService, 'requestUserData', [
            help.ownerId,
        ]);
        if (!result.error) {
            setOwnerInfo(result);
            setOwnerRequestLoading(false);
        } else {
            goBackToMapPage();
        }
    }

    const renderLoadingIndicator = () => (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );

    function removeElementFromMap() {
        if (helpType == 'offer') {
            let filteredOfferList = helpOfferList.filter((OfferFromMap) => {
                return OfferFromMap._id != help._id;
            });
            setHelpOfferList(filteredOfferList);
        } else {
            let filteredHelpList = helpList.filter((helpFromMap) => {
                return helpFromMap._id != help._id;
            });
            dispatch({ type: actions.help.storeList, helps: filteredHelpList });
        }
    }

    async function modalAction() {
        setChooseHelpRequestLoading(true);
        const functionName = messageOperation[helpType](false);
        const request = await useService(HelpService, functionName, [
            help._id,
            user._id,
        ]);
        goBackToMapPage();
        if (!request.error) {
            alertSuccess(
                messageOperation[helpType](true, removeElementFromMap),
            );
        }
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
                </View>
            </View>
        );
    };
    const renderHelpInformation = () => (
        <View style={styles.helpInfo}>
            <View style={styles.helpInfoText}>
                <Text style={styles.titleFont}>{help.title}</Text>
                <View style={styles.categoryContainer}>
                    {help.categories.map((category) => (
                        <View key={category._id} style={styles.categoryWarning}>
                            <Text style={styles.categoryName}>
                                {category.name}
                            </Text>
                        </View>
                    ))}
                </View>
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
            {isOwnerRequestLoading ? (
                renderLoadingIndicator()
            ) : (
                <View style={styles.container}>
                    <ConfirmationModal
                        visible={confirmationModalVisible}
                        setVisible={setConfirmationModalVisible}
                        action={modalAction}
                        message={modalMessage}
                        isLoading={isChooseHelpRequestLoading}
                    />

                    {renderHelpOwnerInformation()}
                    {renderHelpInformation()}

                    <View style={styles.helpButtons}>{renderButton()}</View>
                </View>
            )}
        </ScrollView>
    );
}
