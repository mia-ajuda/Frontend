import React, { useRef } from 'react';
import MapView from 'react-native-maps';
import mapstyle from '../../../assets/styles/mapstyle';

export default function CustomMap({
    children,
    initialRegion,
    region,
    setHelpListVisible,
}) {
    const mapRef = useRef(null);

    return (
        <MapView
            ref={mapRef}
            provider="google"
            initialRegion={initialRegion}
            region={region}
            className="w-full h-full"
            showsUserLocation={true}
            customMapStyle={mapstyle.day.map}
            onRegionChange={() =>
                setHelpListVisible && setHelpListVisible(false)
            }
            onRegionChangeComplete={() =>
                setHelpListVisible && setHelpListVisible(true)
            }
        >
            {children}
        </MapView>
    );
}
