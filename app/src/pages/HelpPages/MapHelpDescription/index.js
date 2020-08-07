import React, { useState, useContext, useEffect } from 'react';
import { View, Image, Text, ScrollView, ActivityIndicator } from 'react-native';
import ConfirmationModal from '../../../components/modals/confirmationModal';
import Button from '../../../components/UI/button';
import getYearsSince from '../../../utils/getYearsSince';
import styles from './styles';
import HelpService from '../../../services/Help';
import { alertSuccess } from '../../../utils/Alert';
import { UserContext } from '../../../store/contexts/userContext';
import { HelpContext } from '../../../store/contexts/helpContext';
import actions from '../../../store/actions';
import useService from '../../../services/useService';
import shortenName from '../../../utils/shortenName';

import colors from '../../../../assets/styles/colorVariables';

export default function MapHelpDescription({ route, navigation }) {
    const { help } = route.params;
    const { helpList, dispatch } = useContext(HelpContext);
    const { user } = useContext(UserContext);
    const [isHelpLoading, setHelpLoading] = useState(true);
    const [helpInfo, setHelpInfo] = useState();

    const [confirmationModalVisible, setConfirmationModalVisible] = useState(
        false,
    );
    const [isChooseHelpRequestLoading, setChooseHelpRequestLoading] = useState(
        false,
    );

    const goBackToMapPage = () => navigation.goBack();
    useEffect(() => {
        getHelpInfo();
    }, []);

    async function getHelpInfo() {
        const result = await useService(HelpService, 'getHelpInfo', [help._id]);
        if (!result.error) {
            setHelpInfo(result);
            setHelpLoading(false);
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

    const renderHelpOwnerInformation = () => {
        const helpOwnerPhoto = helpInfo.user.photo;
        const ownerNameFormated = shortenName(help.user.name);
        return (
            <View style={styles.userInfo}>
                <Image
                    source={{
                        uri: `data:image/png;base64,${helpOwnerPhoto}`,
                    }}
                    style={styles.profileImage}
                />
                <View style={styles.infoTextView}>
                    <Text style={[styles.infoText, styles.infoTextFont]}>
                        {ownerNameFormated}
                    </Text>
                    <Text style={styles.infoText}>
                        <Text style={styles.infoTextFont}>Idade: </Text>
                        {getYearsSince(helpInfo.user.birthday)}
                    </Text>
                    <Text style={styles.infoText}>
                        <Text style={styles.infoTextFont}>Cidade: </Text>
                        {helpInfo.user.address.city}
                    </Text>
                </View>
            </View>
        );
    };
    const renderHelpInformation = () => (
        <View style={styles.helpInfo}>
            <View style={styles.helpInfoText}>
                <Text style={styles.titleFont}>{help.title}</Text>
                <View style={styles.categoryWarning}>
                    <Text style={styles.categoryName}>
                        {helpInfo.category.name}
                    </Text>
                </View>
                <Text style={[styles.infoText, styles.infoTextBottom]}>
                    {helpInfo.description}
                </Text>
            </View>
        </View>
    );

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {isHelpLoading ? (
                renderLoadingIndicator()
            ) : (
                <View style={styles.container}>
                    <ConfirmationModal
                        visible={confirmationModalVisible}
                        setVisible={setConfirmationModalVisible}
                        action={offerHelp}
                        message={'Você deseja confirmar a sua ajuda?'}
                        isLoading={isChooseHelpRequestLoading}
                    />

                    {renderHelpOwnerInformation()}
                    {renderHelpInformation()}

                    <View style={styles.helpButtons}>
                        <Button
                            title="Oferecer Ajuda"
                            large
                            press={() => setConfirmationModalVisible(true)}
                        />
                    </View>
                </View>
            )}
        </ScrollView>
    );
}
