import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import MapView from 'react-native-maps';
import styles from './styles';
import { UserContext } from '../../../store/contexts/userContext';

import Button from '../../../components/UI/button';
import showWarningFor from '../../../utils/warningPopUp';
import { userPositionWarningMessage } from '../../../docs/warning';
import texts from './texts.json';
import { useNavigation } from '@react-navigation/native';
import campaignService from '../../../services/Campaign';
import helpService from '../../../services/Help';
import callService from '../../../services/callService';
import { LoadingContext } from '../../../store/contexts/loadingContext';
import { BadgeContext } from '../../../store/contexts/badgeContext';
import { alertSuccess } from '../../../utils/Alert';
import { Dialog } from '../../../components/molecules/Dialog';
export default function Location({ route }) {
    const { requestInfo, requestType } = route.params;

    const { userPosition, user } = useContext(UserContext);
    const { isLoading, setIsLoading } = useContext(LoadingContext);
    const { increaseUserBadge } = useContext(BadgeContext);

    const [markLocation, setMarkerLocation] = useState({
        type: 'Point',
        coordinates: [],
    });
    const [confirmationModalVisible, setConfirmationModalVisible] =
        useState(false);
    const navigation = useNavigation();
    useEffect(() => {
        showWarningFor('userPosition', userPositionWarningMessage).catch(
            console.error,
        );
    }, []);

    async function confirmPosition() {
        setIsLoading(true);
        const { _id: userId } = user;
        let response;
        const params = [
            requestInfo.title,
            requestInfo.category,
            requestInfo.description,
            userId,
            markLocation,
        ];
        if (requestType === 'Campaign') {
            response = await callService(
                campaignService,
                'createCampaign',
                params,
            );
        } else {
            response = await callService(
                helpService,
                `create${requestType}`,
                params,
            );
        }
        setConfirmationModalVisible(false);

        if (!response.error) {
            let badgeResponse;
            if (requestType == 'HelpOffer')
                badgeResponse = await increaseUserBadge(
                    user._id,
                    'offer',
                    navigation,
                );
            alertSuccess(texts[requestType].successText);
            if (!badgeResponse?.recentUpdated) navigation.navigate('home');
        }
        setIsLoading(false);
    }

    return (
        <>
            <View style={styles.adjustPositionBox}>
                <Text style={styles.adjustPositionText}>
                    {texts[requestType].instruction}
                </Text>
            </View>
            <View style={styles.positionBlueCat}>
                <Image
                    source={require('../../../../assets/images/blueCat.png')}
                    style={styles.iconBlueCat}
                />
            </View>
            <MapView
                initialRegion={{
                    ...userPosition,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
                style={styles.map}
                onRegionChangeComplete={(region) =>
                    setMarkerLocation({
                        ...markLocation,
                        coordinates: [region.longitude, region.latitude],
                    })
                }
            />

            <View style={styles.buttons}>
                <Button
                    title="Voltar"
                    type="warning"
                    press={() => {
                        navigation.goBack();
                    }}
                />
                <Button
                    title="Confirmar"
                    type="primary"
                    press={() =>
                        setConfirmationModalVisible(!confirmationModalVisible)
                    }
                />
            </View>

            <Dialog
                isVisible={confirmationModalVisible && !isLoading}
                title="Confirmar localização?"
                description={texts[requestType].confirmPosition}
                cancelText="Não"
                confirmText="Sim"
                onCloseDialog={() => setConfirmationModalVisible(false)}
                onConfirmPress={confirmPosition}
            />
        </>
    );
}
