import React, { useContext } from 'react';
import { Marker, Callout } from 'react-native-maps';
import Avatar from '../../../components/Avatar';
import { Text } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../../store/contexts/userContext';
import navigateToDescription from '../../../utils/navigateToDescription';

export default function CampaignMarker({ campaign }) {
    const navigation = useNavigation();
    const campaignOwnerName = campaign.entity.name;
    const { user } = useContext(UserContext);

    const handleClick = () => {
        navigateToDescription('campaign', user, navigation, campaign);
    };
    return (
        <Marker
            title={campaign.distance}
            key={campaign._id}
            tracksViewChanges={false}
            coordinate={{
                latitude:
                    campaign.location?.coordinates[1] ??
                    campaign.entity.location.coordinates[1],
                longitude:
                    campaign.location?.coordinates[0] ??
                    campaign.entity.location.coordinates[0],
            }}
        >
            <Avatar iconType={'home'} />
            <Callout onPress={handleClick} style={styles.callout}>
                <Text style={styles.calloutPersonName} numberOfLines={1}>
                    {campaignOwnerName}
                </Text>
                <Text style={styles.calloutPress}>Toque para ver</Text>
            </Callout>
        </Marker>
    );
}
