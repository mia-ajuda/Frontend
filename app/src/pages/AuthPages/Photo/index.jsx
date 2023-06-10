import React, { useContext, useRef, useState } from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from 'react-native-elements';
import styles from './styles';
import Container from '../../../components/Container';
import { Camera } from 'expo-camera';

import { alertMessage, alertSuccess } from '../../../utils/Alert';
import { UserContext } from '../../../store/contexts/userContext';
import entityService from '../../../services/Entity';
import userService from '../../../services/User';
import callService from '../../../services/callService';
import actions from '../../../store/actions';
import { ActivityBottomSheetContext } from '../../../store/contexts/activityBottomSheetContext';
import { useNavigationState } from '@react-navigation/native';
import { DefaultCamera } from '../../../components/organisms/DefaultCamera';
export default function Photo({ route, navigation }) {
    const state = useNavigationState((state) => state);
    const { userDataFromAddressPage } = route.params;
    const { dispatch, isEntity } = useContext(UserContext);
    const { handleShowModal } = useContext(ActivityBottomSheetContext);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [showCamera, setShowCamera] = useState(false);
    const [photo, setPhoto] = useState();
    const cameraRef = useRef();
    const { routes } = state;

    const handleSaveInfo = async (pickerResult) => {
        const initialRoute = routes[0].name;
        const userInfo = {
            ...userDataFromAddressPage,
            photo: pickerResult.base64,
        };
        let newUserInfo;
        const { modalParams, nextPage } = userDataFromAddressPage;
        if (isEntity) {
            newUserInfo = await callService(entityService, 'editEntity', [
                userInfo,
            ]);
        } else {
            newUserInfo = await callService(userService, 'editUser', [
                userInfo,
            ]);
        }

        if (!newUserInfo.error) {
            dispatch({ type: actions.user.storeUserInfo, data: newUserInfo });
            alertSuccess('Alteração feita com sucesso!');
        }
        if (modalParams) {
            handleShowModal(...modalParams);
            navigation.reset({
                index: 0,
                routes: [{ name: initialRoute }],
            });
        } else {
            navigation.reset({
                index: 1,
                routes: [{ name: initialRoute }, { name: nextPage }],
            });
        }
    };

    const openImagePickerAsync = async () => {
        await requestPermission();
        if (permission.granted) {
            setShowCamera(true);
        }
    };

    const pickImageFromGallery = async () => {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alertMessage('É preciso permissão para colocar uma foto.');
            return;
        }
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 0.5,
            aspect: [1, 1],
            base64: true,
        });

        if (pickerResult.canceled === true) {
            return;
        }
        handleSaveInfo(pickerResult);
    };

    const handleTakePicture = async () => {
        const response = await cameraRef.current.takePictureAsync({
            base64: true,
            width: 320,
            height: 320,
        });
        setPhoto(response);
    };

    const renderCamera = () => (
        <DefaultCamera
            cameraRef={cameraRef}
            handleTakePicture={handleTakePicture}
            handleSubmitPhoto={handleSaveInfo}
            photo={photo}
            setPhoto={setPhoto}
            preview
        />
    );

    const renderInstructions = () => (
        <ImageBackground
            source={require('../../../images/catPhoto.png')}
            style={styles.logo}
        >
            <Container>
                <View style={styles.textView}>
                    <Text style={styles.text}>
                        Também precisamos de uma foto sua, é só clicar na camêra
                        aqui em baixo!
                    </Text>
                </View>
                <View style={styles.btnView}>
                    <TouchableOpacity
                        onPress={openImagePickerAsync}
                        style={styles.pickPhotoButton}
                    >
                        <View style={styles.button}>
                            <Icon name={'camera-alt'} color="gray" />
                        </View>
                        <Text style={styles.pickerText}>Abrir camera</Text>
                    </TouchableOpacity>
                    {isEntity && (
                        <TouchableOpacity
                            onPress={pickImageFromGallery}
                            style={styles.pickPhotoButton}
                        >
                            <View style={styles.button}>
                                <Icon name={'photo-library'} color="gray" />
                            </View>

                            <Text style={styles.pickerText}>Abrir galeria</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </Container>
        </ImageBackground>
    );

    return (
        <View style={styles.container}>
            {showCamera ? renderCamera() : renderInstructions()}
        </View>
    );
}
