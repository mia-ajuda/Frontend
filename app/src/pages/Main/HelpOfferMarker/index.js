import React from 'react';
import { Marker, Callout } from 'react-native-maps';
import { FontAwesome5 } from '@expo/vector-icons';
import { Text, View } from 'react-native';
import colors from '../../../../assets/styles/colorVariables';
import styles from './styles';
// import { useNavigation } from '@react-navigation/native';
import ShortenName from '../../../utils/shortenName';

export default function HelpsMarker({ helpOffer }) {
    console.log(helpOffer);
    // const navigation = useNavigation();
    const helpOwnerNameFormated = ShortenName(helpOffer.user.name);

    return (
        <Marker
            title={helpOffer.distance}
            key={helpOffer._id}
            tracksViewChanges={false}
            coordinate={{
                latitude: helpOffer.user.location.coordinates[1],
                longitude: helpOffer.user.location.coordinates[0],
            }}>
            <View>
                <FontAwesome5
                    name="hand-holding-heart"
                    size={30}
                    color={colors.primary}
                />
            </View>
            <Callout onPress={() => {}} style={styles.callout}>
                <Text style={styles.calloutPersonName} numberOfLines={1}>
                    {helpOwnerNameFormated}
                </Text>
                <Text style={styles.calloutPress}>Toque para ver</Text>
            </Callout>
        </Marker>
    );
}
