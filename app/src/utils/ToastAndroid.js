import { ToastAndroid } from 'react-native';

export default function (message) {
    ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
        25,
        50,
    );
}
