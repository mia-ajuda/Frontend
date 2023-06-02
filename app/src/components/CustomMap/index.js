import React, { useEffect, useRef } from 'react';
import MapView from 'react-native-maps';
import mapstyle from '../../../assets/styles/mapstyle';

export default function CustomMap({
    children,
    initialRegion,
    animateToRegion,
    showsMyLocationButton = true,
    ...rest
}) {
    const mapRef = useRef(null);

    useEffect(() => {
        if (animateToRegion) {
            mapRef.current.animateToRegion(animateToRegion, 900);
        }
    }, [animateToRegion]);

    return (
        <MapView
            ref={mapRef}
            provider="google"
            initialRegion={initialRegion}
            className="w-full h-full"
            showsUserLocation={true}
            showsTraffic={false}
            onPress={() =>
                rest.setHelpListVisible && rest.setHelpListVisible(false)
            }
            customMapStyle={mapstyle.day.map}
            showsMyLocationButton={showsMyLocationButton}
        >
            {children}
        </MapView>
    );
}
