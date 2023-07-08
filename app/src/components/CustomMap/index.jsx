import React, { useCallback, useRef } from 'react';
import MapView from 'react-native-maps';
import mapstyle from '../../../assets/styles/mapstyle';
import { useFocusEffect } from '@react-navigation/native';

export default function CustomMap({
    children,
    initialRegion,
    setHelpListVisible,
    animateToRegion,
    showsMyLocationButton = true,
}) {
    const mapRef = useRef(null);

    useFocusEffect(
        useCallback(() => {
            if (animateToRegion) {
                mapRef.current.animateToRegion(animateToRegion, 700);
            }
        }, [animateToRegion]),
    );

    return (
        <MapView
            ref={mapRef}
            provider="google"
            initialRegion={initialRegion}
            className="w-full h-full"
            showsUserLocation={true}
            customMapStyle={mapstyle.day.map}
            onRegionChange={() =>
                setHelpListVisible && setHelpListVisible(false)
            }
            onRegionChangeComplete={() =>
                setHelpListVisible && setHelpListVisible(true)
            }
            showsTraffic={false}
            showsMyLocationButton={showsMyLocationButton}
        >
            {children}
        </MapView>
    );
}
