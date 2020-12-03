import React, { useState, useContext } from 'react';
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
import ConfirmationModal from '../../../../components/modals/confirmationModal';
import Button from '../../../../components/UI/button';
import getYearsSince from '../../../../utils/getYearsSince';
import styles from './styles';
import CampaignService from '../../../../services/Campaign';
import { alertSuccess } from '../../../../utils/Alert';
import { UserContext } from '../../../../store/contexts/userContext';
import useService from '../../../../services/useService';
import shortenName from '../../../../utils/shortenName';

export default function MyCampaignDescription({ route, navigation }) {
    const { help } = route.params;
    const { user } = useContext(UserContext);
    const { campaign } = route.params;
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(
        false,
    );
    const [isFinishRequestLoading, setFinishRequestLoading] = useState(false);
    const goBackToMyCampaignPage = () => navigation.goBack();
    const helpOwnerPhoto = help.user.photo || user.photo;

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

    async function finishCampaign() {
        setFinishRequestLoading(true);
        const finishCampaignRequest = await useService(
            CampaignService,
            'finishCampaign',
            [campaign._id, user._id],
        );
        if (!finishCampaignRequest.error) {
            alertSuccess('Você finalizou a sua Camapanha!');
        }
        goBackToMyCampaignPage();
    }

    const renderOnGoingHelpButtons = () => {
        if (help.status != 'finished') {
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

    const renderWaitingCampaignOwnerMessage = () => {
        if (campaign.status == 'waiting') {
            return (
                <Text style={styles.waitingText}>
                    Aguarde o dono da ajuda escolher seu ajudante.
                </Text>
            );
        }
    };
    //campaign
    const renderCampaignOwnerInformation = () => {
        const ownerNameFormated = shortenName(campaign.user.name);

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
                <Text style={styles.titleFont}>{campaign.title}</Text>
                <View style={styles.categoryContainer}>
                    {campaign.categories.map((category) => (
                        <View key={category._id} style={styles.categoryWarning}>
                            <Text style={styles.categoryName}>
                                {category.name}
                            </Text>
                        </View>
                    ))}
                </View>
                <Text style={[styles.infoText, styles.infoTextBottom]}>
                    {campaign.description}
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
                    action={finishCampaign}
                    message={
                        'Você tem certeza que deseja finalizar essa campanha?'
                    }
                    isLoading={isFinishRequestLoading}
                />
                {renderCampaignOwnerInformation()}
                {renderHelpInformation()}

                {campaign.status == 'waiting'
                    ? renderWaitingCampaignOwnerMessage()
                    : renderOnGoingHelpButtons()}
            </View>
        </ScrollView>
    );
}
