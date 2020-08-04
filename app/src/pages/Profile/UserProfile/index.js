import React, { useContext, useState } from 'react';
import {
    View,
    ScrollView,
    Text,
    ImageBackground,
    TouchableOpacity,
    Alert,
} from 'react-native';
import styles from './styles';
import Button from '../../../components/UI/button';
import { UserContext } from '../../../store/contexts/userContext';
import actions from '../../../store/actions';
import UserService from '../../../services/User';
import EntityService from '../../../services/Entity';
import SessionService from '../../../services/Session';
import { Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import ConfirmationModal from '../../../components/modals/confirmationModal';
import formatCPF from '../../../utils/formatCpf';
import formatCNPJ from '../../../utils/formatCNPJ';
import formatPhone from '../../../utils/formatPhone';
import parseDate from '../../../utils/parseDate';
import { alertMessage, alertSuccess, alertError } from '../../../utils/Alert';

export default function Profile({ navigation }) {
    const { user, dispatch } = useContext(UserContext);
    const [isModalVisible, setModalVisible] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false);
    const [photo, setPhoto] = useState('');

    async function logout() {
        await SessionService.signOut();
    }

    function chooseBetweenCameraOrGallery() {
        if (user.cpf) {
            openImagePickerAsync();
        } else {
            Alert.alert(
                null,
                'Como deseja atualizar a foto?',
                [
                    {
                        text: 'Câmera',
                        onPress: openImagePickerAsync,
                    },
                    {
                        text: 'Galeria',
                        onPress: pickImageFromGallery,
                    },
                ],
                { cancelable: true },
            );
        }
    }

    async function openImagePickerAsync() {
        const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            // eslint-disable-next-line no-undef
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

        setPhoto(pickerResult.base64);
        setModalVisible(true);
    }

    async function pickImageFromGallery() {
        const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

        if (permissionResult.granted === false) {
            // eslint-disable-next-line no-undef
            alertMessage('É preciso permissão para acesso a câmera!');
            return;
        }
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 0.5,
            aspect: [1, 1],
            base64: true,
        });

        if (pickerResult.cancelled === true) {
            return;
        }

        if (pickerResult.cancelled === true) {
            return;
        }

        setPhoto(pickerResult.base64);
        setModalVisible(true);
    }

    const sendPhoto = async () => {
        try {
            setLoadingModal(true);
            let photoUpdated;
            if (user.cnpj)
                photoUpdated = await EntityService.editEntity({
                    ...user,
                    photo: photo,
                });
            else
                photoUpdated = await UserService.editUser({
                    ...user,
                    photo: photo,
                });
            dispatch({ type: actions.user.storeUserInfo, data: photoUpdated });
            setLoadingModal(false);
            setModalVisible(false);
            alertSuccess('Foto atualizada com sucesso!');
        } catch (err) {
            setLoadingModal(false);
            setModalVisible(false);
            alertError(err, null, 'Ooops..');
        }
    };

    function renderUserInfoFrom(label, data) {
        return (
            <View style={styles.viewInput}>
                <Text style={styles.labelInput}>{label}</Text>
                <View style={styles.inputWrapper}>
                    <Text style={styles.textInput}>{data}</Text>
                </View>
            </View>
        );
    }
    function renderEditableUserInfoFrom(label, data, navigateToPage) {
        return (
            <View style={styles.viewInput}>
                <Text style={styles.labelInput}>{label}</Text>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate(navigateToPage, { user })
                    }>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.textInput}>{data}</Text>
                        <Icon size={25} name="edit" color="#000" />
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
    return (
        <ScrollView style={styles.container}>
            <ConfirmationModal
                visible={isModalVisible}
                setVisible={setModalVisible}
                action={sendPhoto}
                message={'Tem certeza que deseja trocar sua foto?'}
                isLoading={loadingModal}
            />
            <View style={styles.imageView}>
                <TouchableOpacity onPress={chooseBetweenCameraOrGallery}>
                    <ImageBackground
                        source={{ uri: `data:image/png;base64,${user.photo}` }}
                        style={styles.imageContainer}
                        imageStyle={styles.profileImage}>
                        <Icon size={45} name={'camera-alt'} color="black" />
                    </ImageBackground>
                </TouchableOpacity>
            </View>
            <View style={styles.viewContent}>
                {renderEditableUserInfoFrom(
                    'Nome Completo',
                    user.name,
                    'EditNameField',
                )}
                {user.birthday &&
                    renderUserInfoFrom(
                        'Data de Nascimento',
                        parseDate(user.birthday),
                    )}
                {renderUserInfoFrom('E-mail', user.email)}
                {user.cpf
                    ? renderUserInfoFrom('CPF', formatCPF(user.cpf))
                    : renderUserInfoFrom('CNPJ', formatCNPJ(user.cnpj))}
                {renderEditableUserInfoFrom(
                    'Telefone',
                    formatPhone(user.phone),
                    'EditPhoneField',
                )}
                {renderEditableUserInfoFrom(
                    'CEP',
                    user.address.cep,
                    'EditCEPField',
                )}
                <View style={styles.buttonWrapper}>
                    <Button
                        style={styles.buttonExit}
                        large
                        press={() => {
                            logout();
                        }}
                        title="Sair"
                    />
                </View>
            </View>
        </ScrollView>
    );
}
