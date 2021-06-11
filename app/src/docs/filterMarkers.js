import { TURN_OFF_OFFER } from 'react-native-dotenv';

const filterButtonTypes = [
    {
        id: 1,
        name: 'PEDIDOS',
        isEnabled: false,
        iconName: 'exclamation',
    },
    {
        id: 2,
        name: 'OFERTAS',
        isEnabled: false,
        iconName: 'hand-holding-heart',
    },
    {
        id: 3,
        name: 'INSTITUIÇÕES',
        isEnabled: false,
        iconName: 'home',
    },
];

if (TURN_OFF_OFFER) {
    // Turn Off Feature of Offer
    filterButtonTypes.splice(1, 1);
}

export default filterButtonTypes;
