import React, { useContext } from 'react';
import { Marker, Callout } from 'react-native-maps';
import { FontAwesome5 } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import colors from '../../../../assets/styles/colorVariables';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import ShortenName from '../../../utils/shortenName';
import navigateToDescription from '../../../utils/navigateToDescription';
import { UserContext } from '../../../store/contexts/userContext';

export default function HelpsMarker({ helpOffer }) {
    const navigation = useNavigation();
    const helpOwnerNameFormated = ShortenName(helpOffer.user.name);
    const { user } = useContext(UserContext);

    const userIsOwner = user._id === helpOffer.ownerId;
    const userIsParticipating =
        helpOffer.helpedUserId?.includes(user._id) ||
        helpOffer.possibleHelpedUsers?.some((obj) => obj._id === user._id);

    const renderMarkerText = () => {
        return userIsOwner || userIsParticipating ? (
            <Text style={styles.calloutTitle} numberOfLines={1}>
                {userIsOwner ? 'Sua oferta' : 'Participando'}
            </Text>
        ) : (
            <>
                <Text style={styles.calloutTitle} numberOfLines={1}>
                    Oferta de ajuda
                </Text>
                <Text style={styles.calloutPersonName} numberOfLines={1}>
                    {helpOwnerNameFormated}
                </Text>
                <Text style={styles.calloutPress}>Toque para ver</Text>
            </>
        );
    };

    return (
        <Marker
            title={helpOffer.distance}
            key={helpOffer._id}
            tracksViewChanges={false}
            coordinate={{
                latitude:
                    helpOffer.location?.coordinates[1] ??
                    helpOffer.user.location.coordinates[1],
                longitude:
                    helpOffer.location?.coordinates[0] ??
                    helpOffer.user.location.coordinates[0],
            }}
        >
            <View style={styles.helpOfferMarker}>
                <FontAwesome5
                    name="hand-holding-heart"
                    size={30}
                    color={colors.primary}
                />
            </View>
            <Callout
                onPress={() =>
                    !userIsOwner &&
                    !userIsParticipating &&
                    navigateToDescription('offer', user, navigation, helpOffer)
                }
                style={styles.callout}
            >
                {renderMarkerText()}
            </Callout>
        </Marker>
    );
}
