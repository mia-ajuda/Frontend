import isOffersTurnedOff from '../utils/isOffersTurnedOff';

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

if (isOffersTurnedOff()) {
    // Turn Off Feature of Offer
    filterButtonTypes.splice(1, 1);
}

export default filterButtonTypes;
