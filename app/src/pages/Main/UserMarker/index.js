import React from 'react';
import { Marker, Circle } from 'react-native-maps';
import { Image } from 'react-native';
import mapStyle from '../../../../assets/styles/mapstyle';
import styles from './styles';

export default function UserMarker({ userPosition }) {
    return (
        <>
            <Marker
                title="Este é você!"
                coordinate={{
                    latitude: userPosition.latitude,
                    longitude: userPosition.longitude,
                }}>
                <Image source={mapStyle.day.cat} style={styles.catAvatar} />
            </Marker>
            <Circle
                center={{
                    latitude: userPosition.latitude,
                    longitude: userPosition.longitude,
                }}
                radius={2000}
                strokeColor={mapStyle.day.radiusColor}
                fillColor={mapStyle.day.radiusColor}
            />
        </>
    );
}
