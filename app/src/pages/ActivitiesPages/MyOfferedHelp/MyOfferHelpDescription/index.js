import React, { useState, useContext, useEffect } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    Linking,
    Platform,
} from 'react-native';
import { Icon } from 'react-native-elements';
import Button from '../../../../components/UI/button';
import ConfirmationModal from '../../../../components/modals/confirmationModal';
import getYearsSince from '../../../../utils/getYearsSince';
import styles from './styles';
import HelpService from '../../../../services/Help';
import { alertSuccess } from '../../../../utils/Alert';
import { UserContext } from '../../../../store/contexts/userContext';
import useService from '../../../../services/useService';
import shortenName from '../../../../utils/shortenName';
import helpService from '../../../../services/Help';

export default function OfferHelpDescription({ route, navigation }) {
    const { helpId, routeId } = route.params;
    const { user } = useContext(UserContext);
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(
        false,
    );
    const [isFinishRequestLoading, setFinishRequestLoading] = useState(false);
    const [help, setHelp] = useState(null);
    const goBackToMyOfferedHelpPage = () => navigation.goBack();

    useEffect(() => {
        async function setupPage() {
            const helpTemp = await useService(
                helpService,
                `get${routeId}WithAggregationById`,
                [helpId],
            );

            setHelp(helpTemp);
        }
        setupPage();
    }, []);

    function openGoogleMaps() {
        const scheme = Platform.select({
            ios: 'maps:0,0?q=',
            android: 'geo:0,0?q=',
        });
        const helpLatitude = help.user.location.coordinates[1];
        const helpLongitude = help.user.location.coordinates[0];

        const helpCoordinates = `${helpLatitude},${helpLongitude}`;
        const helpLabel = 'Pedido de Ajuda de ' + help.user.name;
        const url = Platform.select({
            ios: `${scheme}${helpLabel}@${helpCoordinates}`,
            android: `${scheme}${helpCoordinates}(${helpLabel})`,
        });
        Linking.openURL(url);
    }

    function openWhatsapp() {
        Linking.openURL(
            `whatsapp://send?phone=${
                help.user.phone
            }&text=${'Olá, precisa de ajuda?'}`,
        );
    }

    async function finishHelp() {
        setFinishRequestLoading(true);
        const finishHelpRequest = await useService(
            HelpService,
            'finishHelpByHelper',
            [help._id, user._id],
        );
        if (!finishHelpRequest.error) {
            alertSuccess(
                'Você finalizou sua ajuda! Aguarde o dono do pedido finalizar para concluí-la',
            );
        }
        goBackToMyOfferedHelpPage();
    }

    const renderOnGoingHelpButtons = () => {
        if (help.status != 'finished' && user._id != help.ownerId) {
            return (
                <View style={styles.ViewLink}>
                    <View style={styles.ViewLinkBox}>
                        <TouchableOpacity onPress={openWhatsapp}>
                            <Icon
                                name="whatsapp"
                                type="font-awesome"
                                size={50}
                                color="#25d366"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={openGoogleMaps}>
                            <Icon
                                name="directions"
                                type="font-awesome-5"
                                size={50}
                                color="#4285F4"
                            />
                        </TouchableOpacity>
                    </View>

                    <Button
                        title="Finalizar ajuda"
                        large
                        press={() => setConfirmationModalVisible(true)}
                    />
                </View>
            );
        }
    };

    const renderWaitingHelpOwnerMessage = () => {
        return (
            <Text style={styles.waitingText}>
                Aguarde o dono da ajuda escolher seu ajudante.
            </Text>
        );
    };

    const renderHelpOwnerInformation = () => {
        const ownerNameFormated = shortenName(help.user.name);
        const ownerPhoto = (help && help.user && help.user.photo) || user.photo;

        return (
            <View style={styles.userInfo}>
                <Image
                    source={{
                        uri: `data:image/png;base64,${ownerPhoto}`,
                    }}
                    style={styles.profileImage}
                />
                <View style={styles.infoTextView}>
                    <Text style={[styles.infoText, styles.infoTextFont]}>
                        {ownerNameFormated}
                    </Text>
                    <Text style={styles.infoText}>
                        <Text style={styles.infoTextFont}>Idade: </Text>
                        {getYearsSince(help.user.birthday)}
                    </Text>
                    <Text style={styles.infoText}>
                        <Text style={styles.infoTextFont}>Cidade: </Text>
                        {help.user.address.city}
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

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <ConfirmationModal
                    visible={confirmationModalVisible}
                    setVisible={setConfirmationModalVisible}
                    action={finishHelp}
                    message={
                        'Você tem certeza que deseja finalizar essa ajuda?'
                    }
                    isLoading={isFinishRequestLoading}
                />
                {help && (
                    <>
                        {renderHelpOwnerInformation()}
                        {renderHelpInformation()}
                        {help.status == 'waiting'
                            ? renderWaitingHelpOwnerMessage()
                            : renderOnGoingHelpButtons()}
                    </>
                )}
            </View>
        </ScrollView>
    );
}
