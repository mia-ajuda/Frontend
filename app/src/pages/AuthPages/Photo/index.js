import React, { useContext } from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from 'react-native-elements';
import styles from './styles';
import Container from '../../../components/Container';

import { alertMessage, alertSuccess } from '../../../utils/Alert';
import { UserContext } from '../../../store/contexts/userContext';
import entityService from '../../../services/Entity';
import userService from '../../../services/User';
import useService from '../../../services/useService';
import actions from '../../../store/actions';
export default function Photo({ route, navigation }) {
    const { userDataFromAddressPage } = route.params;
    const { user, dispatch } = useContext(UserContext);

    async function requestPermission() {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alertMessage('É preciso permissão para colocar uma foto.');
            return;
        }
    }

    const handleSaveInfo = async (pickerResult) => {
        const userInfo = {
            ...userDataFromAddressPage,
            photo: pickerResult.base64,
        };
        let newUserInfo;
        const nextPage = user.cnpj ? 'createCampaign' : '';
        if (user.cnpj) {
            newUserInfo = await useService(entityService, 'editEntity', [
                userInfo,
            ]);
        } else {
            newUserInfo = await useService(userService, 'editUser', [userInfo]);
        }

        if (!newUserInfo.error) {
            dispatch({ type: actions.user.storeUserInfo, data: newUserInfo });
            alertSuccess('Alteração feita com sucesso!');
        }
        navigation.navigate(nextPage);
    };

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
        handleSaveInfo(pickerResult);
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
        handleSaveInfo(pickerResult);
    }
    const renderCameraButton = () => (
        <TouchableOpacity
            onPress={openImagePickerAsync}
            style={styles.pickPhotoButton}
        >
            <View style={styles.button}>
                <Icon name={'camera-alt'} color="gray" />
            </View>
            <Text style={styles.pickerText}>Abrir camera</Text>
        </TouchableOpacity>
    );
    const renderGalleryButton = () => {
        if (user.cnpj) {
            return (
                <TouchableOpacity
                    onPress={pickImageFromGallery}
                    style={styles.pickPhotoButton}
                >
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
                style={styles.logo}
            >
                <Container>
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
