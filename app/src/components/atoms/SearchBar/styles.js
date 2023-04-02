import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import colors from '../../../../assets/styles/colorVariables';
import fonts from '../../../../assets/styles/fontVariable';

export const styles = StyleSheet.create({
    searchBarContainer: {
        borderRadius: RFValue(32, 640),
        width: '100%',
        borderWidth: 0.5,
        borderColor: '#3535354d',
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: colors.light,
        flexDirection: 'row',
        alignItems: 'center',
        maxHeight: RFValue(40, 640),
        marginBottom: RFValue(24, 640),
    },
    input: {
        marginLeft: 4,
        ...fonts.body,
        width: '80%',
    },
    buttonContainer: {
        minWidth: '5%',
        marginLeft: 'auto',
    },
    iconButtonStyle: {
        padding: 0,
    },
});
