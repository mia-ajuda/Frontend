import * as Font from 'expo-font';

export default async function loadFonts() {
    return Font.loadAsync({
        'montserrat-light': require('../fonts/Montserrat/Montserrat-Light.ttf'),
        'montserrat-regular': require('../fonts/Montserrat/Montserrat-Regular.ttf'),
        'montserrat-medium': require('../fonts/Montserrat/Montserrat-Medium.ttf'),
        'montserrat-semibold': require('../fonts/Montserrat/Montserrat-SemiBold.ttf'),
        'montserrat-bold': require('../fonts/Montserrat/Montserrat-Bold.ttf'),
    });
}
