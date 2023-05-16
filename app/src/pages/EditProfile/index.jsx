import React, { useContext, useState } from 'react';
import { ScrollView } from 'react-native';
import { TextSwitch } from '../../components/molecules/TextSwitch';
import { PersonalDataForm } from '../../components/organisms/PersonalDataForm';
import { UserContext } from '../../store/contexts/userContext';
import { alertMessage, alertSuccess } from '../../utils/Alert';
import * as ImagePicker from 'expo-image-picker';
import { TextButton } from '../../components/atoms/TextButton';
import { LoadingContext } from '../../store/contexts/loadingContext';
import actions from '../../store/actions';
import { AddressForm } from '../../components/organisms/AddressForm';
import { ProfilePhoto } from '../../components/molecules/ProfilePhoto';

export const EditProfile = () => {
    const [option, setOption] = useState(0);
    const { user, editProfile, editAddress, dispatch } =
        useContext(UserContext);
    const { setIsLoading } = useContext(LoadingContext);
    const [photo, setPhoto] = useState(user?.photo || '');

    const showProfile = option == 0;
    const showAddress = option == 1;

    const handleChangePhoto = async () => {
        const permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            alertMessage('É preciso permissão para ter acesso as mídias!');
            return;
        }
        const pickerResult = await ImagePicker.launchCameraAsync({
            base64: true,
            allowsEditing: true,
            quality: 0.5,
        });
        if (pickerResult.cancelled) return;
        setPhoto(pickerResult.base64);
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

    return (
        <ScrollView className="px-4 bg-new_background">
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
        </ScrollView>
    );
};
