import React from 'react';
import { View } from 'react-native';
import CustomMap from '../../../components/CustomMap';
import HelpOfferMarker from '../../Main/HelpOfferMarker';

export const SelectedHelpOnMap = ({ route }) => {
    const { help, helpLocationCoordinates } = route.params;

    return (
        <View>
            <CustomMap region={helpLocationCoordinates}>
                <HelpOfferMarker key={help._id} helpOffer={help} />
            </CustomMap>
            {/* the feature that change offer location will be developed in another issue
            <View className="items-center px-3">
                <DefaultButton
                    title="Alterar a localização"
                    customStyle="absolute bottom-2 z-10"
                />
            </View> */}
        </View>
    );
};
