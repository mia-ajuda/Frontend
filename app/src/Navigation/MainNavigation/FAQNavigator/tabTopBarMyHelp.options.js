import colors from '../../../../assets/styles/colorVariables';
import fonts from '../../../../assets/styles/fontVariable';

const tabTopBarOptions = {
    style: {
        backgroundColor: colors.primary,
    },
    labelStyle: {
        ...fonts.body,
        color: colors.light,
        fontSize: 14,
    },
    indicatorStyle: {
        backgroundColor: colors.light,
        padding: 2,
    },
};

export default tabTopBarOptions;
