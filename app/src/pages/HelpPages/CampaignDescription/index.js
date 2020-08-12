import React, { useContext } from 'react';
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

export default function CampaignDescription({ route }) {
    const { campaign } = route.params;
    const { user } = useContext(UserContext);
    const campaignOwnerPhoto = campaign.entity.photo;

    function openGoogleMaps() {
        const scheme = Platform.select({
            ios: 'maps:0,0?q=',
            android: 'geo:0,0?q=',
        });
        const campaignLatitude = campaign.entity.location.coordinates[1];
        const campaignLongitude = campaign.entity.location.coordinates[0];

        const campaignCoordinates = `${campaignLatitude},${campaignLongitude}`;
        const campaignLabel = 'Pedido de Ajuda de ' + campaign.entity.name;
        const url = Platform.select({
            ios: `${scheme}${campaignLabel}@${campaignCoordinates}`,
            android: `${scheme}${campaignCoordinates}(${campaignLabel})`,
        });
        Linking.openURL(url);
    }

    function openWhatsapp() {
        Linking.openURL(
            `whatsapp://send?phone=${
                campaign.entity.phone
            }&text=${'Olá, precisa de ajuda?'}`,
        );
    }

    const renderContactEntityButtons = () => {
        if (user._id != campaign.ownerId) {
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
                </View>
            );
        }
    };

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
                </View>
            </View>
        );
    };
    const renderHelpInformation = () => (
        <View style={styles.campaignInfo}>
            <View style={styles.campaignInfoText}>
                <Text style={styles.titleFont}>{campaign.title}</Text>
                <View style={styles.categoryWarning}>
                    <Text style={styles.categoryName}>
                        {campaign.category[0].name}
                    </Text>
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
                {renderHelpOwnerInformation()}
                {renderHelpInformation()}
                {renderContactEntityButtons()}
            </View>
        </ScrollView>
    );
}
