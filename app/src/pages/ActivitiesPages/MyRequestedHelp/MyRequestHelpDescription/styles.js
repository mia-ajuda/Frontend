import { StyleSheet } from 'react-native';
import fonts from '../../../../../assets/styles/fontVariable';
import helpDescription from '../../../../../assets/styles/helpDescription';

const styles = StyleSheet.create({
    ...helpDescription,
    waitingToBeAccepted: {
        ...fonts.subtitle,
        fontSize: 20,
        marginBottom: 10,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
});

export default styles;
