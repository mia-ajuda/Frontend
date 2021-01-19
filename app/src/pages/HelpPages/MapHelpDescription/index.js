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
import actions from '../../../store/actions';
import useService from '../../../services/useService';
import shortenName from '../../../utils/shortenName';

import colors from '../../../../assets/styles/colorVariables';

export default function MapHelpDescription({ route, navigation }) {
    const { help, helpType } = route.params;
    const { helpList, dispatch } = useContext(HelpContext);
    const { user } = useContext(UserContext);
    const [isOwnerRequestLoading, setOwnerRequestLoading] = useState(true);
    const [ownerInfo, setOwnerInfo] = useState({});

    const [confirmationModalVisible, setConfirmationModalVisible] = useState(
        false,
    );
    const [isChooseHelpRequestLoading, setChooseHelpRequestLoading] = useState(
        false,
    );
    const goBackToMapPage = () => navigation.goBack();

    useEffect(() => {
        getOwnerInfo();
    }, []);

    async function getOwnerInfo() {
        setOwnerRequestLoading(true);
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

    function removeHelpFromMap() {
        console.log(filteredHelpList);
        let filteredHelpList = helpList.filter((helpFromMap) => {
            return helpFromMap._id != help._id;
        });
        dispatch({ type: actions.help.storeList, helps: filteredHelpList });
    }

    async function offerHelp() {
        setChooseHelpRequestLoading(true);
        const offerHelpRequest = await useService(HelpService, 'offerHelp', [
            help._id,
            user._id,
        ]);
        if (!offerHelpRequest.error) {
            removeHelpFromMap();
            goBackToMapPage();
            alertSuccess(
                'Oferta enviada com sucesso e estará no aguardo para ser aceita',
            );
        } else {
            goBackToMapPage();
        }
    }

    const applyToHelp = async () => {
        setChooseHelpRequestLoading(true);
        const applyToHelpRequest = await useService(
            HelpService,
            'applyToHelp',
            [help._id, user._id],
        );
        if (!applyToHelpRequest.error) {
            removeHelpFromMap();
            goBackToMapPage();
            alertSuccess(
                'Pedido enviado com sucesso e estará no aguardo para ser aceita',
            );
        } else {
            goBackToMapPage();
        }
    };

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

    const renderHelpButton = () => (
        <Button
            title="Oferecer Ajuda"
            large
            press={() => setConfirmationModalVisible(true)}
        />
    );
    const renderOfferButton = () => (
        <Button
            title="Se candidatar para essa oferta"
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
                        action={helpType === 'offer' ? applyToHelp : offerHelp}
                        message={'Você deseja confirmar a sua ajuda?'}
                        isLoading={isChooseHelpRequestLoading}
                    />

                    {renderHelpOwnerInformation()}
                    {renderHelpInformation()}

                    <View style={styles.helpButtons}>
                        {helpType == 'offer'
                            ? renderOfferButton()
                            : renderHelpButton()}
                    </View>
                </View>
            )}
        </ScrollView>
    );
}
