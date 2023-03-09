import React, { useRef } from 'react';
import MapView from 'react-native-maps';
import mapstyle from '../../../assets/styles/mapstyle';

export default function Map({ children, initialRegion, region, ...rest }) {
    const mapRef = useRef(null);

    return (
        <MapView
            ref={mapRef}
            provider="google"
            initialRegion={initialRegion}
            region={region}
            className="w-full h-full"
            showsUserLocation={true}
            onPress={() =>
                rest.setHelpListVisible && rest.setHelpListVisible(false)
            }
            customMapStyle={mapstyle.day.map}
        >
            {children}
        </MapView>
    );
}
