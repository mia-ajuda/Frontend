
const { MAPS_API_KEY } = process.env;

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
            googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
            config: {
                googleMaps: {
                    apiKey: process.env.MAPS_API_KEY,
                },
            },
            versionCode: 302,
        },
    };
};
