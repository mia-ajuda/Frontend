import React from 'react';
import { Marker, Callout } from 'react-native-maps';
import Avatar from '../../../components/Avatar';
import { Text } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import ShortenName from '../../../utils/shortenName';

export default function HelpsMarker({ help, isRiskGroup }) {
    const navigation = useNavigation();
    const helpOwnerNameFormated = ShortenName(help.user.name);

    const renderCalloutTitleRiskGroup = () => {
        if (isRiskGroup) {
            return (
                <Text style={styles.calloutGroupRiskText}>Grupo de risco</Text>
            );
        }
    };
    return (
        <Marker
            title={help.distance}
            key={help._id}
            tracksViewChanges={false}
            coordinate={{
                latitude: help.user.location.coordinates[1],
                longitude: help.user.location.coordinates[0],
            }}>
            <Avatar
                isRiskGroup={help.user.riskGroup.length > 0}
                iconType={'exclamation'}
            />
            <Callout
                onPress={() => {
                    navigation.navigate('mapHelpDescription', {
                        help: help,
                        helpType: 'help',
                    });
                }}
                style={styles.callout}>
                {renderCalloutTitleRiskGroup()}
                <Text style={styles.calloutPersonName} numberOfLines={1}>
                    {helpOwnerNameFormated}
                </Text>
                <Text style={styles.calloutPress}>Toque para ver</Text>
            </Callout>
        </Marker>
    );
}
