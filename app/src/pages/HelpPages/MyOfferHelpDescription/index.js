import React, { useState, useContext } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    Linking,
    Platform,
} from 'react-native';
import { Icon } from 'react-native-elements';
import ConfirmationModal from '../../../components/modals/confirmationModal';
import Button from '../../../components/UI/button';
import getYearsSince from '../../../utils/getYearsSince';
import styles from './styles';
import HelpService from '../../../services/Help';
import { alertError, alertSuccess } from '../../../utils/Alert';
import { UserContext } from '../../../store/contexts/userContext';

export default function MyOfferHelpDescription({ route, navigation }) {
    const { help } = route.params;
    const { user } = useContext(UserContext);
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(
        false,
    );
    const [isFinishRequestLoading, setFinishRequestLoading] = useState(false);
    const goBackToMyOfferedHelpPage = () => navigation.goBack();
    const helpOwnerPhoto = help.user.photo;

    function openGoogleMaps() {
        const scheme = Platform.select({
            ios: 'maps:0,0?q=',
            android: 'geo:0,0?q=',
        });
        const helpLatitude = help.user.location.coordinates[1];
        const helpLongitude = help.user.location.coordinates[0];

        const helpCoordinates = `${helpLatitude},${helpLongitude}`;
        const helpLabel = 'Pedido de Ajuda de ' + help.user.name;
        const url = Platform.select({
            ios: `${scheme}${helpLabel}@${helpCoordinates}`,
            android: `${scheme}${helpCoordinates}(${helpLabel})`,
        });
        Linking.openURL(url);
    }

    function openWhatsapp() {
        Linking.openURL(
            `whatsapp://send?phone=${
                help.user.phone
            }&text=${'Olá, precisa de ajuda?'}`,
        );
    }
    async function finishHelp() {
        try {
            setFinishRequestLoading(true);
            await HelpService.finishHelpByHelper(help._id, user._id);
            goBackToMyOfferedHelpPage();
            alertSuccess(
                'Você finalizou sua ajuda! Aguarde o dono do pedido finalizar para concluí-la',
            );
        } catch (error) {
            goBackToMyOfferedHelpPage();
            alertError(error);
        }
    }

    const renderOnGoingHelpButtons = () => {
        if (help.status != 'finished') {
            return (
                <View style={styles.ViewLink}>
                    <View style={styles.ViewLinkBox}>
                        <TouchableOpacity onPress={openWhatsapp}>
                            <Icon
                                name="whatsapp"
                                type="font-awesome"
                                size={50}
                                color="#25d366"
                            />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={openGoogleMaps}>
                            <Icon
                                name="directions"
                                type="font-awesome-5"
                                size={50}
                                color="#4285F4"
                            />
                        </TouchableOpacity>
                    </View>

                    <Button
                        title="Finalizar ajuda"
                        large
                        press={() => setConfirmationModalVisible(true)}
                    />
                </View>
            );
        }
    };

    const renderWaitingHelpOwnerMessage = () => {
        if (help.status == 'waiting') {
            return (
                <Text style={styles.waitingText}>
                    Aguarde o dono da ajuda escolher seu ajudante.
                </Text>
            );
        }
    };

    const renderHelpOwnerInformation = () => (
        <View style={styles.userInfo}>
            <Image
                source={{
                    uri: `data:image/png;base64,${helpOwnerPhoto}`,
                }}
                style={styles.profileImage}
            />
            <View style={styles.infoTextView}>
                <Text style={[styles.infoText, styles.infoTextFont]}>
                    {help.user.name}
                </Text>
                <Text style={styles.infoText}>
                    <Text style={styles.infoTextFont}>Idade: </Text>
                    {getYearsSince(help.user.birthday)}
                </Text>
                <Text style={styles.infoText}>
                    <Text style={styles.infoTextFont}>Cidade: </Text>
                    {help.user.address.city}
                </Text>
            </View>
        </View>
    );

    const renderHelpInformation = () => (
        <View style={styles.helpInfo}>
            <View style={styles.helpInfoText}>
                <Text style={styles.infoText}>
                    <Text style={styles.infoTextFont}>Categoria: </Text>
                    {help.category[0].name}
                </Text>
                <Text style={[styles.infoText, styles.infoTextDescription]}>
                    Descrição:
                </Text>
                <Text style={[styles.infoText, styles.infoTextBottom]}>
                    {help.description}
                </Text>
            </View>
        </View>
    );

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <ConfirmationModal
                    visible={confirmationModalVisible}
                    setVisible={setConfirmationModalVisible}
                    action={finishHelp}
                    message={
                        'Você tem certeza que deseja finalizar essa ajuda?'
                    }
                    isLoading={isFinishRequestLoading}
                />
                {renderHelpOwnerInformation()}
                {renderHelpInformation()}

                {help.status == 'waiting'
                    ? renderWaitingHelpOwnerMessage()
                    : renderOnGoingHelpButtons()}
            </View>
        </ScrollView>
    );
}
