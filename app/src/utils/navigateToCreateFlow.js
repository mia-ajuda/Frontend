export default function navigateToCreateFlow(
    navigation,
    title,
    category,
    description,
    requestType,
) {
    navigation.navigate('location', {
        requestInfo: {
            title,
            category,
            description,
        },
        requestType,
    });
}
