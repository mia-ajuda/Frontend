import colors from '../../../../assets/styles/colorVariables';

const navigationIcons = {
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

    FAQ: {
        icon: 'question',
        active: {
            color: colors.primary,
            raised: true,
        },
        inactive: {
            color: colors.light,
            raised: false,
        },
    },
    history: {
        icon: 'th-list',
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

    findUsers: {
        icon: 'search',
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

export default navigationIcons;
