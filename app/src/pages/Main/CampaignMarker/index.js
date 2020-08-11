import React from 'react';
import { Marker, Callout } from 'react-native-maps';
import Avatar from '../../../components/Avatar';
import { Text } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

export default function CampaignMarker({ campaign }) {
    const navigation = useNavigation();
    const campaignOwnerName = campaign.entity.name;

    return (
        <Marker
            title={campaign.distance}
            key={campaign._id}
            tracksViewChanges={false}
            coordinate={{
                latitude: campaign.entity.location.coordinates[1],
                longitude: campaign.entity.location.coordinates[0],
            }}>
            <Avatar iconType={'home'} />
            <Callout
                onPress={() =>
                    navigation.navigate('mapCampaignDescription', {
                        campaign,
                    })
                }
                style={styles.callout}>
                <Text style={styles.calloutPersonName} numberOfLines={1}>
                    {campaignOwnerName}
                </Text>
                <Text style={styles.calloutPress}>Toque para ver</Text>
            </Callout>
        </Marker>
    );
}
