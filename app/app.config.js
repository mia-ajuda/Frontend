import { MAPS_API_KEY } from 'react-native-dotenv';

export default ({ config }) => {
    return {
        ...config,
        android: {
            package: 'com.unb.miaajuda',
            permissions: [
                'ACCESS_COARSE_LOCATION',
                'ACCESS_FINE_LOCATION',
                'CAMERA',
                'MANAGE_DOCUMENTS',
                'READ_EXTERNAL_STORAGE',
                'READ_PHONE_STATE',
                'WRITE_EXTERNAL_STORAGE',
            ],
            googleServicesFile: './google-services.json',
            config: {
                googleMaps: {
                    apiKey: MAPS_API_KEY,
                },
            },
            versionCode: 200,
        },
    };
};
