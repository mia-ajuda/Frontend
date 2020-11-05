import React, { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { View, Image, Text } from 'react-native';
import Button from '../../../../../components/UI/button';
import UserService from '../../../../../services/User';
import HelpService from '../../../../../services/Help';
import ConfirmationModal from '../../../../../components/modals/confirmationModal';
import { UserContext } from '../../../../../store/contexts/userContext';
import { alertSuccess } from '../../../../../utils/Alert';
import useService from '../../../../../services/useService';

export default function HelperCard({ help }) {
    const navigation = useNavigation();
    const { user } = useContext(UserContext);
    const [helper, setHelper] = useState({});
    const [confirmationModalVisible, setConfirmationModalVisible] = useState(
        false,
    );
    const [isFinishHelpRequestLoading, setFinishHelpRequestLoading] = useState(
        false,
    );
    const goBackToMyResquestsPage = () => navigation.goBack();

    useEffect(() => {
        getHelperInformation();
    }, []);

    async function getHelperInformation() {
        const helperResponse = await useService(
            UserService,
            'requestAnyTypeUserData',
            [help.helperId],
        );
        if (!helperResponse.error) {
            setHelper(helperResponse);
        }
    }

    async function finishHelpByOwner() {
        setFinishHelpRequestLoading(true);
        const finishHelpRequest = await useService(
            HelpService,
            'finishHelpByOwner',
            [help._id, user._id],
        );
        if (!finishHelpRequest.error) {
            alertSuccess(
                'Ajuda finalizada com sucesso! Aguarde a confirmação do ajudante!',
            );
        }
        goBackToMyResquestsPage();
    }
    return (
        <View>
            <Text style={styles.textVolunteer}>Voluntário:</Text>
            <View style={styles.volunteerContainer}>
                <View style={styles.volunteerContainerDirection}>
                    <Image
                        style={styles.volunteerImage}
                        source={{
                            uri: `data:image/png;base64,${helper.photo}`,
                        }}
                    />
                    <View style={styles.volunteerText}>
                        <Text style={styles.infoTextFont}>{helper.name}</Text>
                        <Text style={styles.volunteerName}>
                            <Text style={styles.infoTextFont}>Cidade: </Text>
                            {helper.address?.city}
                        </Text>
                        <Text>
                            <Text style={styles.infoTextFont}>Telefone: </Text>
                            {helper.phone}
                        </Text>
                    </View>
                </View>

                <Button
                    press={() => setConfirmationModalVisible(true)}
                    title="Finalizar Ajuda"
                    large
                />
            </View>
            <ConfirmationModal
                visible={confirmationModalVisible}
                setVisible={setConfirmationModalVisible}
                action={finishHelpByOwner}
                message={
                    'Você tem certeza que deseja finalizar este pedido de ajuda?'
                }
                isLoading={isFinishHelpRequestLoading}
            />
        </View>
    );
}
