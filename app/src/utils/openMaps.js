import { Linking, Platform } from 'react-native';

export const openMaps = (latitude, longitude, mapLabel) => {
    const scheme = Platform.select({
        ios: 'maps:0,0?q=',
        android: 'geo:0,0?q=',
    });

    const coordinates = `${latitude},${longitude}`;
    const url = Platform.select({
        ios: `${scheme}${mapLabel}@${coordinates}`,
        android: `${scheme}${coordinates}(${mapLabel})`,
    });
    Linking.openURL(url);
};
