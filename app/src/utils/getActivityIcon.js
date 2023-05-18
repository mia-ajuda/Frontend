function getActivityIcon(activityType) {
    const activitiesVariants = {
        help: {
            name: 'exclamation',
            type: 'font-awesome',
        },
        offer: {
            name: 'volunteer-activism',
            type: 'material',
        },
        campaign: {
            name: 'home',
            type: 'material',
        },
    };
    return activitiesVariants[activityType];
}

export default getActivityIcon;
