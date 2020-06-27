import colors from '../../../../assets/styles/colorVariables';

const navigationiIcons = {
    main: {
        active: {
            icon: require('../../../../assets/images/whileLogo.png'),
            size: { height: 40, width: 40 },
        },
        inactive: {
            icon: require('../../../../assets/images/whiteCat.png'),
            size: {
                height: 25,
                width: 25,
                resizeMode: 'contain',
            },
        },
    },

    helpList: {
        icon: 'outdent',
        active: {
            color: colors.primary,
            raised: true,
        },
        inactive: {
            color: colors.light,
            raised: false,
        },
    },
    givenHelp: {
        icon: 'outdent',
        active: {
            color: colors.primary,
            raised: true,
        },
        inactive: {
            color: colors.light,
            raised: false,
        },
    },
    notification: {
        icon: 'bell',
        active: {
            color: colors.primary,
            raised: true,
        },
        inactive: {
            color: colors.light,
            raised: false,
        },
    },
    profile: {
        icon: 'user-circle',
        active: {
            color: colors.primary,
            raised: true,
        },
        inactive: {
            color: colors.light,
            raised: false,
        },
    },
};

export default navigationiIcons;
