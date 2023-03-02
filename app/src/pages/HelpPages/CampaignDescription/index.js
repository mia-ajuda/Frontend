import React, { useContext, useState } from 'react';
import {
    View,
    Image,
    Text,
    ScrollView,
    Linking,
    Platform,
    TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';
import styles from './styles';
import shortenName from '../../../utils/shortenName';
import { UserContext } from '../../../store/contexts/userContext';
import ConfirmationModal from '../../../components/modals/confirmationModal';
import callService from '../../../services/callService';
import { alertSuccess } from '../../../utils/Alert';
import CampaignService from '../../../services/Campaign';
import Button from '../../../components/UI/button';
import openWhatsapp from '../../../utils/openWhatsapp';
import formatDate from '../../../utils/formatDate';

export default function CampaignDescription({ route, navigation }) {
    const { campaign } = route.params;
    const { user } = useContext(UserContext);
    const campaignOwnerPhoto = campaign.entity.photo;
    const [finishCampaignLoading, setFinishCampaignLoading] = useState(false);
    const [confirmationModalVisible, setConfirmationModalVisible] =
        useState(false);
    const isTheSameUser = user._id === campaign.ownerId;
    const goBackToMyResquestsPage = () => navigation.goBack();

    function openGoogleMaps() {
        const scheme = Platform.select({
            ios: 'maps:0,0?q=',
            android: 'geo:0,0?q=',
        });
        const campaignLatitude =
            campaign.location?.coordinates[1] ??
            campaign.entity.location.coordinates[1];
        const campaignLongitude =
            campaign.location?.coordinates[0] ??
            campaign.entity.location.coordinates[0];

        const campaignCoordinates = `${campaignLatitude},${campaignLongitude}`;
        const campaignLabel = 'Pedido de Ajuda de ' + campaign.entity.name;
        const url = Platform.select({
            ios: `${scheme}${campaignLabel}@${campaignCoordinates}`,
            android: `${scheme}${campaignCoordinates}(${campaignLabel})`,
        });
        Linking.openURL(url);
    }

    async function finishCampaign() {
        setFinishCampaignLoading(true);
        const finishHelpRequest = await callService(
            CampaignService,
            'finishCampaign',
            [campaign._id],
        );
        if (!finishHelpRequest.error) {
            alertSuccess('Campanha finalizada com sucesso!');
        }
        goBackToMyResquestsPage();
    }

    const renderContactEntityButtons = () => (
        <View style={styles.ViewLink}>
            <View style={styles.ViewLinkBox}>
                <TouchableOpacity
                    onPress={() => openWhatsapp(campaign.entity.phone)}
                >
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
        </View>
    );

    const renderHelpOwnerInformation = () => {
        const ownerNameFormated = shortenName(campaign.entity.name);
        return (
            <View style={styles.userInfo}>
                <Image
                    source={{
                        uri: `data:image/png;base64,${campaignOwnerPhoto}`,
                    }}
                    style={styles.profileImage}
                />
                <View style={styles.infoTextView}>
                    <Text style={[styles.infoText, styles.infoTextFont]}>
                        {ownerNameFormated}
                    </Text>
                    <Text style={styles.infoText}>
                        <Text style={styles.infoTextFont}>Cidade: </Text>
                        {campaign.entity.address.city}
                    </Text>
                    <Text style={styles.infoText}>
                        <Text style={styles.infoTextFont}>Telefone: </Text>
                        {campaign.entity.phone}
                    </Text>
                    <Text style={styles.infoText}>
                        <Text style={styles.infoTextFont}>
                            Data de criação:{' '}
                        </Text>
                        {formatDate(campaign.creationDate, '-')}
                    </Text>
                </View>
            </View>
        );
    };

    const renderHelpInformation = () => (
        <View style={styles.campaignInfo}>
            <View style={styles.campaignInfoText}>
                <Text style={styles.titleFont}>{campaign.title}</Text>
                <View style={styles.categoryWarning}>
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
    const renderFinishCampaignButton = () => (
        <Button
            press={() => setConfirmationModalVisible(true)}
            title="Finalizar Campanha"
            large
        />
    );
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                {renderHelpOwnerInformation()}
                {renderHelpInformation()}
                {isTheSameUser && renderFinishCampaignButton()}
                {!isTheSameUser && renderContactEntityButtons()}
            </View>
            <ConfirmationModal
                visible={confirmationModalVisible}
                setVisible={setConfirmationModalVisible}
                action={finishCampaign}
                message={'Você tem certeza que deseja finalizar esta campanha?'}
                isLoading={finishCampaignLoading}
            />
        </ScrollView>
    );
}
