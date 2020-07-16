import React, { useEffect, useState, useContext } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import helpService from '../../../services/Help';
import styles from './styles';
import Button from '../../../components/UI/button';
import colors from '../../../../assets/styles/colorVariables';
import ConfirmationModal from '../../../components/modals/confirmationModal';
import HelpService from '../../../services/Help';
import HelpUserInfo from '../../../components/HelpUserInfo';
import HelpInfo from '../../../components/HelpInfo';
import { UserContext } from '../../../store/contexts/userContext';
import { HelpContext } from '../../../store/contexts/helpContext';
import { alertSuccess, alertError } from '../../../utils/Alert';

export default function HelpDetails({ route, navigation }) {
    const { id } = route.params;
    const [help, setHelp] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useContext(UserContext);
    const { removeHelpFromMap } = useContext(HelpContext);

    useEffect(() => {
        async function getHelp() {
            const helpTemp = await helpService.getHelp(id);
            setHelp(helpTemp);
            const photoTemp = helpTemp.user.photo.includes('http') //photo from web
                ? { uri: helpTemp.user.photo }
                : { uri: `data:image/png;base64,${helpTemp.user.photo}` };
            setPhoto(photoTemp);
        }
        getHelp();
    }, []);

    async function chooseHelp() {
        try {
            await HelpService.chooseHelp(id, user._id);
            removeHelpFromMap(id);
            navigation.goBack();
            alertSuccess(
                'Oferta enviada com sucesso e estará no aguardo para ser aceita',
            );
        } catch (error) {
            navigation.goBack();
            alertError(error);
        }
    }

    return help && photo ? (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                alignSelf: 'center',
                width: '100%',
                padding: 15,
            }}>
            <ConfirmationModal
                visible={isModalOpen}
                setVisible={setIsModalOpen}
                action={chooseHelp}
                message={`Você deseja ajudar ${help.user.name}?`}
            />
            <HelpUserInfo help={help} photo={photo} />
            <HelpInfo help={help} />
            <Button
                title="Oferecer Ajuda"
                large
                press={() => setIsModalOpen(true)}
            />
        </ScrollView>
    ) : (
        <View style={styles.loadingArea}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );
}
