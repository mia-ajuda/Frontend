import { Platform, StatusBar, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    templateContainerWithMargin: {
        width: '100%',
        height: '100%',
        marginTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
        paddingBottom: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
    },
    templateContainer: {
        width: '100%',
        height: '100%',
    },
});
