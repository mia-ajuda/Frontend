import { TURN_OFF_OFFER } from 'react-native-dotenv';

const isOffersTurnedOff = () => {
    return TURN_OFF_OFFER == 'true';
};

export default isOffersTurnedOff;
