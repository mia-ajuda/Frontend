import React, { useContext, useState } from 'react';
import {
    View,
    ScrollView,
    Text,
    ImageBackground,
    TouchableOpacity,
} from 'react-native';
import styles from './styles';
import Button from '../../../components/UI/button';
import { UserContext } from '../../../store/contexts/userContext';
import actions from '../../../store/actions';
import UserService from '../../../services/User';
import SessionService from '../../../services/Session';
import { Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import ConfirmationModal from '../../../components/modals/confirmationModal';
import formatCPF from '../../../utils/formatCpf';
import formatPhone from '../../../utils/formatPhone';
import { alertMessage, alertSuccess, alertError } from '../../../utils/Alert';

export default function Profile({ navigation }) {
    const { user, dispatch } = useContext(UserContext);
    const [isModalVisible, setModalVisible] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false);
    const [photo, setPhoto] = useState('');

    async function logout() {
        await SessionService.signOut();
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

    const sendPhoto = async () => {
        try {
            setLoadingModal(true);
            const resp = await UserService.editUser({
                ...user,
                photo: photo,
            });
            dispatch({ type: actions.user.storeUserInfo, data: resp });
            setLoadingModal(false);
            setModalVisible(false);
            alertSuccess('Foto atualizada com sucesso!');
        } catch (err) {
            setLoadingModal(false);
            setModalVisible(false);
            alertError(err, null, 'Ooops..');
        }
    };
    function parseDate(date) {
        const newDate = new Date(date);
        return `${('0' + (newDate.getDate() + 1)).slice(-2)}/${(
            '0' +
            (newDate.getMonth() + 1)
        ).slice(-2)}/${newDate.getFullYear()}`;
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
                <TouchableOpacity onPress={openImagePickerAsync}>
                    <ImageBackground
                        source={{ uri: `data:image/png;base64,${user.photo}` }}
                        style={styles.imageContainer}
                        imageStyle={styles.profileImage}>
                        <Icon size={45} name={'camera-alt'} color="black" />
                    </ImageBackground>
                </TouchableOpacity>
            </View>
            <View style={styles.viewContent}>
                <View style={styles.viewInput}>
                    <Text style={styles.labelInput}>Nome Completo</Text>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('EditNameField', { user })
                        }>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.textInput}>{user.name}</Text>
                            <Icon size={25} name="edit" color="#000" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.viewInput}>
                    <Text style={styles.labelInput}>Data de Nascimento</Text>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.textInput}>
                            {parseDate(user.birthday)}
                        </Text>
                    </View>
                </View>
                <View style={styles.viewInput}>
                    <Text style={styles.labelInput}>E-mail</Text>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.textInput}>{user.email}</Text>
                    </View>
                </View>
                <View style={styles.viewInput}>
                    <Text style={styles.labelInput}>CPF</Text>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.textInput}>
                            {formatCPF(user.cpf)}
                        </Text>
                    </View>
                </View>
                <View style={styles.viewInput}>
                    <Text style={styles.labelInput}>Telefone</Text>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('EditPhoneField', { user })
                        }>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.textInput}>
                                {formatPhone(user.phone)}
                            </Text>
                            <Icon size={25} name="edit" color="#000" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.viewInput}>
                    <Text style={styles.labelInput}>CEP</Text>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate('EditCEPField', { user })
                        }>
                        <View style={styles.inputWrapper}>
                            <Text style={styles.textInput}>
                                {user.address.cep}
                            </Text>
                            <Icon size={25} name="edit" color="#000" />
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonWrapper}>
                    <Button
                        style={styles.buttonExit}
                        large
                        press={() => {
                            logout();
                        }}
                        title="sair"
                    />
                </View>
            </View>
        </ScrollView>
    );
}
