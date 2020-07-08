import colors from '../../../../assets/styles/colorVariables';
const bottomNavigationOptions = {
    style: {
        height: 60,
        borderTopColor: colors.primary,
        shadowOpacity: 0,
        elevation: 0,
    },
    keyboardHidesTabBar: true,
    activeTintColor: colors.light,
    inactiveTintColor: colors.dark,
    inactiveBackgroundColor: colors.primary,
    activeBackgroundColor: colors.primary,
    tabStyle: {
        justifyContent: 'center',
    },
    showLabel: false,
};

export default bottomNavigationOptions;
