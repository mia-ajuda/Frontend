import React, { useContext } from 'react';
import { Marker, Callout } from 'react-native-maps';
import Avatar from '../../../components/Avatar';
import { Text } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import ShortenName from '../../../utils/shortenName';
import navigateToDescription from '../../../utils/navigateToDescription';
import { UserContext } from '../../../store/contexts/userContext';

export default function HelpsMarker({ help, isRiskGroup }) {
    const navigation = useNavigation();
    const helpOwnerNameFormated = ShortenName(help.user.name);
    const { user } = useContext(UserContext);
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
                latitude:
                    help.location?.coordinates[1] ??
                    help.user.location.coordinates[1],
                longitude:
                    help.location?.coordinates[0] ??
                    help.user.location.coordinates[0],
            }}
        >
            <Avatar
                isRiskGroup={help.user.riskGroup.length > 0}
                iconType={'exclamation'}
            />
            <Callout
                onPress={() =>
                    navigateToDescription('help', user, navigation, help)
                }
                style={styles.callout}
            >
                {renderCalloutTitleRiskGroup()}
                <Text style={styles.calloutPersonName} numberOfLines={1}>
                    {helpOwnerNameFormated}
                </Text>
                <Text style={styles.calloutPress}>Toque para ver</Text>
            </Callout>
        </Marker>
    );
}
