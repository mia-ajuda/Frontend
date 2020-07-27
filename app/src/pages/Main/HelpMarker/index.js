import React from 'react';
import { Marker, Callout } from 'react-native-maps';
import Avatar from '../../../components/helpAvatar';
import { Text } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

export default function HelpsMarker({ help, isRiskGroup }) {
    const navigation = useNavigation();

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
            <Avatar help={help} />
            <Callout
                onPress={() =>
                    navigation.navigate('mapHelpDescription', {
                        help,
                    })
                }
                style={styles.callout}>
                {renderCalloutTitleRiskGroup()}
                <Text style={styles.calloutPersonName} numberOfLines={1}>
                    {help.user.name}
                </Text>
                <Text style={styles.calloutPress}>Toque para ver</Text>
            </Callout>
        </Marker>
    );
}
