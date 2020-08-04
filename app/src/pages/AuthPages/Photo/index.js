import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from 'react-native-elements';
import styles from './styles';
import Container from '../../../components/Container';

import { alertMessage } from '../../../utils/Alert';
export default function Photo({ route, navigation }) {
    const { userDataFromAddressPage } = route.params;
    const goBackToAdressPage = () => navigation.goBack();

    async function requestPermission() {
        const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
        if (permissionResult.granted === false) {
            alertMessage('É preciso permissão para colocar uma foto.');
            return;
        }
    }

    async function openImagePickerAsync() {
        requestPermission();

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
    async function pickImageFromGallery() {
        requestPermission();

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 0.5,
            aspect: [1, 1],
            base64: true,
        });

        if (pickerResult.cancelled === true) {
            return;
        }

        navigation.navigate('photoPreview', {
            selectedPhoto: pickerResult.base64,
            userDataFromAddressPage,
        });
    }
    const renderCameraButton = () => (
        <TouchableOpacity
            onPress={openImagePickerAsync}
            style={styles.pickPhotoButton}>
            <View style={styles.button}>
                <Icon name={'camera-alt'} color="gray" />
            </View>
            <Text style={styles.pickerText}>Abrir camera</Text>
        </TouchableOpacity>
    );
    const renderGalleryButton = () => {
        if (userDataFromAddressPage.cnpj) {
            return (
                <TouchableOpacity
                    onPress={pickImageFromGallery}
                    style={styles.pickPhotoButton}>
                    <View style={styles.button}>
                        <Icon name={'photo-library'} color="gray" />
                    </View>

                    <Text style={styles.pickerText}>Abrir galeria</Text>
                </TouchableOpacity>
            );
        }
    };
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../../images/catPhoto.png')}
                style={styles.logo}>
                <Container>
                    <View style={styles.backIcon}>
                        <TouchableOpacity onPress={() => goBackToAdressPage()}>
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
                        {renderCameraButton()}
                        {renderGalleryButton()}
                    </View>
                </Container>
            </ImageBackground>
        </View>
    );
}
