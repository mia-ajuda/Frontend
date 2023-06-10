import React, { useContext, useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import { TextSwitch } from '../../components/molecules/TextSwitch';
import { PersonalDataForm } from '../../components/organisms/PersonalDataForm';
import { UserContext } from '../../store/contexts/userContext';
import { alertMessage, alertSuccess } from '../../utils/Alert';
import { TextButton } from '../../components/atoms/TextButton';
import { LoadingContext } from '../../store/contexts/loadingContext';
import actions from '../../store/actions';
import { AddressForm } from '../../components/organisms/AddressForm';
import { ProfilePhoto } from '../../components/molecules/ProfilePhoto';
import { DefaultCamera } from '../../components/organisms/DefaultCamera';
import { View } from 'react-native';
import { Camera } from 'expo-camera';

export const EditProfile = () => {
    const [option, setOption] = useState(0);
    const { user, editProfile, editAddress, dispatch } =
        useContext(UserContext);
    const { setIsLoading } = useContext(LoadingContext);
    const [photo, setPhoto] = useState(user?.photo || '');
    const [showCamera, setShowCamera] = useState(false);
    const cameraRef = useRef();
    const [requestPermission] = Camera.useCameraPermissions();

    const showProfile = option == 0;
    const showAddress = option == 1;
    const showInfos = !showCamera;

    const handleChangePhoto = async () => {
        const permissionResult = await requestPermission();
        if (!permissionResult.granted) {
            alertMessage('É preciso permissão para ter acesso as mídias!');
            return;
        }
        setPhoto();
        setShowCamera(true);
    };

    const handleTakePicture = async () => {
        const response = await cameraRef.current.takePictureAsync({
            base64: true,
            width: 320,
            height: 320,
        });
        setPhoto(response);
    };

    const handleEditProfile = async (data, type) => {
        const editingAddress = type === 'address';
        setIsLoading(true);
        const response = editingAddress
            ? await editAddress(data)
            : await editProfile({ ...data, photo });
        setIsLoading(false);
        if (!response.error) {
            dispatch({ type: actions.user.storeUserInfo, data: response });
            alertSuccess('Alteração feita com sucesso!');
        }
    };

    const handleSubmitPhoto = async (pickerResult) => {
        setShowCamera(false);
        setPhoto(pickerResult.base64);
        setIsLoading(true);
        const response = await editProfile({ photo: pickerResult.base64 });
        setIsLoading(false);
        if (!response.error) {
            dispatch({ type: actions.user.storeUserInfo, data: response });
            alertSuccess('Alteração feita com sucesso!');
        }
    };

    return (
        <View className="flex-1  bg-new_background">
            {showInfos && (
                <ScrollView className="px-4">
                    <>
                        <TextSwitch
                            option1="Perfil"
                            option2="Endereço"
                            selectedOption={option}
                            setSelectedOption={setOption}
                            darker
                        />
                        {showProfile && (
                            <>
                                <ProfilePhoto
                                    base64={photo}
                                    size={'lg'}
                                    className={'self-center my-2'}
                                />
                                <TextButton
                                    onPress={handleChangePhoto}
                                    text={'Mudar foto'}
                                    className="self-center"
                                />

                                <PersonalDataForm
                                    submissionFunction={(data) =>
                                        handleEditProfile(data, 'personal')
                                    }
                                />
                            </>
                        )}
                        {showAddress && (
                            <AddressForm
                                submissionFunction={(data) =>
                                    handleEditProfile(data, 'address')
                                }
                            />
                        )}
                    </>
                </ScrollView>
            )}
            {showCamera && (
                <DefaultCamera
                    setPhoto={setPhoto}
                    photo={photo}
                    cameraRef={cameraRef}
                    handleTakePicture={handleTakePicture}
                    handleSubmitPhoto={handleSubmitPhoto}
                    preview
                />
            )}
        </View>
    );
};
