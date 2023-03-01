import React from 'react';
import MapView from 'react-native-maps';
import mapstyle from '../../../assets/styles/mapstyle';

export default function Map({ children, initialRegion, region, ...rest }) {
    return (
        <MapView
            initialRegion={initialRegion}
            className="w-full h-full"
            region={region}
            onPress={() =>
                rest.setHelpListVisible && rest.setHelpListVisible(false)
            }
            customMapStyle={mapstyle.day.map}
        >
            {children}
        </MapView>
    );
}
