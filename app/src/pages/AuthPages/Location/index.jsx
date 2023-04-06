import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import MapView from 'react-native-maps';
import styles from './styles';
import { UserContext } from '../../../store/contexts/userContext';
import NewHelpModalSuccess from '../../../components/modals/newHelpModal/success';

import Button from '../../../components/UI/button';
import ConfirmationModal from '../../../components/modals/confirmationModal';
import showWarningFor from '../../../utils/warningPopUp';
import { userPositionWarningMessage } from '../../../docs/warning';
import texts from './texts.json';
import { useNavigation } from '@react-navigation/native';
import campaignService from '../../../services/Campaign';
import helpService from '../../../services/Help';
import callService from '../../../services/callService';
import { LoadingContext } from '../../../store/contexts/loadingContext';
export default function Location({ route }) {
    const { requestInfo, requestType } = route.params;

    const { userPosition, user } = useContext(UserContext);
    const { isLoading, setIsLoading } = useContext(LoadingContext);

    const [markLocation, setMarkerLocation] = useState({
        type: 'Point',
        coordinates: [],
    });
    const [confirmationModalVisible, setConfirmationModalVisible] =
        useState(false);
    const [modalSuccessModalVisible, setModalSuccessModalVisible] =
        useState(false);
    const navigation = useNavigation();
    useEffect(() => {
        showWarningFor('userPosition', userPositionWarningMessage);
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
            setModalSuccessModalVisible(true);
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

            <ConfirmationModal
                message={texts[requestType].confirmPosition}
                visible={confirmationModalVisible && !isLoading}
                setVisible={setConfirmationModalVisible}
                action={confirmPosition}
            />
            <NewHelpModalSuccess
                visible={modalSuccessModalVisible}
                onOkPressed={() => navigation.navigate('home')}
                message={texts[requestType].successText}
            />
        </>
    );
}