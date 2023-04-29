import React, { useContext, useState } from 'react';
import { Image, ScrollView } from 'react-native';
import { TextSwitch } from '../../components/molecules/TextSwitch';
import { PersonalDataForm } from '../../components/organisms/PersonalDataForm';
import { UserContext } from '../../store/contexts/userContext';
import { alertMessage, alertSuccess } from '../../utils/Alert';
import * as ImagePicker from 'expo-image-picker';
import { TextButton } from '../../components/atoms/TextButton';
import { LoadingContext } from '../../store/contexts/loadingContext';
import actions from '../../store/actions';
import { UpdaterContext } from '../../store/contexts/updaterContext';
import { AddressForm } from '../../components/organisms/AddressForm';

export const EditProfile = () => {
    const [option, setOption] = useState(0);
    const { user, editProfile, editAddress, dispatch } =
        useContext(UserContext);
    const { setIsLoading } = useContext(LoadingContext);
    const [photo, setPhoto] = useState(user?.photo || '');
    const { setShouldUpdate } = useContext(UpdaterContext);

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
        setShouldUpdate(true);
    };

    return (
        <ScrollView className="p-4 bg-new_background">
            <TextSwitch
                option1="Perfil"
                option2="Endereço"
                selectedOption={option}
                setSelectedOption={setOption}
            />
            {showProfile && (
                <>
                    <Image
                        className="w-24 h-24 rounded-full self-center my-4"
                        source={{
                            uri: `data:image/png;base64,${photo}`,
                        }}
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
