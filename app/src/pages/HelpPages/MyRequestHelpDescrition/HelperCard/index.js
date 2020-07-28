import React, { useEffect, useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { View, Image, Text } from 'react-native';
import Button from '../../../../components/UI/button';
import UserService from '../../../../services/User';
import HelpService from '../../../../services/Help';
import ConfirmationModal from '../../../../components/modals/confirmationModal';
import { UserContext } from '../../../../store/contexts/userContext';
import { alertSuccess, alertError } from '../../../../utils/Alert';

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
        try {
            const helperResponse = await UserService.requestUserDataById(
                help.helperId,
            );
            setHelper(helperResponse);
        } catch (error) {
            console.log(error);
        }
    }

    async function finishHelpByOwner() {
        try {
            setFinishHelpRequestLoading(true);
            await HelpService.finishHelpByOwner(help._id, user._id);
            goBackToMyResquestsPage();
            alertSuccess(
                'Ajuda finalizada com sucesso! Aguarde a confirmação do ajudante!',
            );
        } catch (err) {
            goBackToMyResquestsPage();
            alertError(err);
        }
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
