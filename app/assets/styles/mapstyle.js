const mapStyleNight = [
    {
        elementType: 'geometry',
        stylers: [
            {
                color: '#1d2c4d',
            },
        ],
    },
    {
        elementType: 'labels.text.fill',
        stylers: [
            {
                color: '#8ec3b9',
            },
        ],
    },
    {
        elementType: 'labels.text.stroke',
        stylers: [
            {
                color: '#1a3646',
            },
        ],
    },
    {
        featureType: 'administrative.country',
        elementType: 'geometry.stroke',
        stylers: [
            {
                color: '#4b6878',
            },
        ],
    },
];

const mapStyleDay = [
    {
        featureType: 'administrative.land_parcel',
        elementType: 'labels',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'poi',
        elementType: 'labels.text',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
    {
        featureType: 'poi.business',
        stylers: [
            {
                visibility: 'off',
            },
        ],
    },
];

export default {
    night: {
        map: mapStyleNight,
    },
    day: {
        map: mapStyleDay,
    },
};
