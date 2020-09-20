import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar } from 'react-native';
import MapView from 'react-native-maps';
import styles from './styles';
import { UserContext } from '../../../store/contexts/userContext';

import Button from '../../../components/UI/button';
import ConfirmationModal from '../../../components/modals/confirmationModal';
import { Icon } from 'react-native-elements';
import showWarningFor from '../../../utils/warningPopUp';
import { userPositionWarningMessage } from '../../../docs/warning';

export default function Location({ navigation }) {
    const { userPosition, setUserPosition } = useContext(UserContext);
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(
        false,
    );
    const [
        resquestPositionCardVisible,
        setResquestPositionCardVisible,
    ] = useState(true);

    useEffect(() => {
        showWarningFor('userPosition', userPositionWarningMessage);
    }, []);

    const renderPositionRequestCard = () => {
        let iconName;
        let explanationText;

        if (resquestPositionCardVisible) {
            iconName = 'sort-down';
            explanationText = (
                <Text style={styles.descriptionText}>
                    A posição escolhida será usada para definir a localização
                    das ajudas criadas por você. Por isso, preste bastante
                    atenção ao escolhê-la, pois ela{' '}
                    <Text style={styles.descriptionTextAlert}>
                        não poderá ser alterada.
                    </Text>
                </Text>
            );
        } else {
            iconName = 'sort-up';
            explanationText = null;
        }
        return (
            <View style={styles.description}>
                <TouchableOpacity
                    onPress={() => {
                        setResquestPositionCardVisible(
                            !resquestPositionCardVisible,
                        );
                    }}>
                    <Icon name={iconName} type="font-awesome" />
                    <Text style={styles.descriptionTextTitle}>
                        Por que precisamos de sua posição?
                    </Text>
                    {explanationText}
                </TouchableOpacity>
            </View>
        );
    };
    function continueRegistration() {
        const { latitude, longitude } = userPosition;
        const userDataFromLocationPage = {
            latitude,
            longitude,
        };
        setConfirmationModalVisible(false);
        navigation.navigate('registrationData', { userDataFromLocationPage });
    }

    return (
        <>
            <StatusBar
                translucent
                backgroundColor={
                    confirmationModalVisible ? 'rgba(0,0,0,0.4)' : 'transparent'
                }
                barStyle={
                    confirmationModalVisible ? 'light-content' : 'dark-content'
                }
            />
            <View style={styles.adjustPositionBox}>
                <Text style={styles.adjustPositionText}>
                    Arraste para ajustar sua posição
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
                onRegionChangeComplete={(region) => setUserPosition(region)}
            />

            {renderPositionRequestCard()}

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
                message="Podemos confirmar sua posição atual?"
                visible={confirmationModalVisible}
                setVisible={setConfirmationModalVisible}
                action={continueRegistration}
            />
        </>
    );
}
