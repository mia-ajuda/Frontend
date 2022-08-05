import React, { useContext } from 'react';
import { Marker, Callout } from 'react-native-maps';
import Avatar from '../../../components/Avatar';
import { Text } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import verifyUserInfo from '../../../utils/verifyUserInfo';
import { UserContext } from '../../../store/contexts/userContext';

export default function CampaignMarker({ campaign }) {
    const navigation = useNavigation();
    const campaignOwnerName = campaign.entity.name;
    const { user } = useContext(UserContext);
    const navigateToCampaign = () => {
        if (verifyUserInfo(user)) {
            navigation.navigate('campaignDescription', {
                campaign,
            });
        } else {
            navigation.navigate('address', { nextPage: 'campaignDescription' });
        }
    };
    return (
        <Marker
            title={campaign.distance}
            key={campaign._id}
            tracksViewChanges={false}
            coordinate={{
                latitude: campaign.entity.location.coordinates[1],
                longitude: campaign.entity.location.coordinates[0],
            }}
        >
            <Avatar iconType={'home'} />
            <Callout onPress={navigateToCampaign} style={styles.callout}>
                <Text style={styles.calloutPersonName} numberOfLines={1}>
                    {campaignOwnerName}
                </Text>
                <Text style={styles.calloutPress}>Toque para ver</Text>
            </Callout>
        </Marker>
    );
}
