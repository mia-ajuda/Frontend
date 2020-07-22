import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from 'react-native-elements';
import styles from './styles';
import Container from '../../../components/Container';

import { alertMessage } from '../../../utils/Alert';
export default function Photo({ route, navigation }) {
    const { userDataFromAddressPage } = route.params;

    async function openImagePickerAsync() {
        const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            alertMessage('É preciso permissão para acesso a câmera!');
            return;
        }

        const pickerResult = await ImagePicker.launchCameraAsync({
            base64: true,
            allowsEditing: true,
            quality: 0.5,
        });
        if (pickerResult.cancelled === true) {
            return;
        }

        navigation.navigate('photoPreview', {
            selectedPhoto: pickerResult.base64,
            userDataFromAddressPage,
        });
    }

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../../images/catPhoto.png')}
                style={styles.logo}>
                <Container>
                    <View style={styles.backIcon}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name={'arrow-back'} color={'black'} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textView}>
                        <Text style={styles.text}>
                            Também precisamos de uma foto sua, é só clicar na
                            camêra aqui em baixo!
                        </Text>
                    </View>
                    <View style={styles.btnView}>
                        <TouchableOpacity
                            onPress={openImagePickerAsync}
                            style={styles.button}>
                            <Icon name={'camera-alt'} color="gray" />
                        </TouchableOpacity>
                    </View>
                </Container>
            </ImageBackground>
        </View>
    );
}
