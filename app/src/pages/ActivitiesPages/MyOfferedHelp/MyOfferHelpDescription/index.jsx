import React, { useState, useContext, useEffect } from 'react';
import { View } from 'react-native';
import HelpService from '../../../../services/Help';
import { alertSuccess } from '../../../../utils/Alert';
import { UserContext } from '../../../../store/contexts/userContext';
import callService from '../../../../services/callService';
import { ExpansiveModal } from '../../../../components/modals/expansiveModal';
import { DefaultButtonWithBadges } from '../../../../components/molecules/DefaultButtonWithBagdes';
import { LoadingContext } from '../../../../store/contexts/loadingContext';
import { HelpScreenLayout } from '../../../../components/templates/HelpScreenLayout';
import { Dialog } from '../../../../components/molecules/Dialog';

export default function OfferHelpDescription({ route, navigation }) {
    const { helpId, routeId } = route.params;

    const { user } = useContext(UserContext);
    const { isLoading, setIsLoading } = useContext(LoadingContext);

    const [confirmationModalVisible, setConfirmationModalVisible] =
        useState(false);
    const [help, setHelp] = useState(null);

    const [showHelpedUsers, setShowHelpedUsers] = useState(false);
    const goBackToMyOfferedHelpPage = () => navigation.goBack();
    const [showPossibleHelpedUsers, setShowPossibleHelpedUsers] =
        useState(false);
    const [updateData, setUpdateData] = useState(true);

    useEffect(() => {
        async function setupPage() {
            setIsLoading(true);
            const helpTemp = await callService(
                HelpService,
                `get${routeId}WithAggregationById`,
                [helpId],
            );

            setHelp(helpTemp);
            setIsLoading(false);
        }
        if (updateData) {
            setupPage();
            setUpdateData(false);
        }
    }, [updateData]);

    async function finishHelp() {
        setIsLoading(true);
        const finishHelpRequest = await callService(
            HelpService,
            'finishHelpByHelper',
            [help._id, user._id],
        );
        if (!finishHelpRequest.error) {
            alertSuccess('Você finalizou sua oferta!');
        }
        goBackToMyOfferedHelpPage();
    }

    const renderHelpedUsersButtons = () => {
        const possibleHelpedUsersBadgeValue =
            (help.possibleHelpedUsers?.length || 0) +
            (help.possibleEntities?.length || 0);

        const helpedUsersBadgeValue = help.helpedUsers?.length || 0;
        return (
            <View className="mt-6">
                <DefaultButtonWithBadges
                    title="Possíveis ajudados"
                    onPress={() => setShowPossibleHelpedUsers(true)}
                    badgeValue={possibleHelpedUsersBadgeValue}
                    disabled={possibleHelpedUsersBadgeValue <= 0}
                />
                <DefaultButtonWithBadges
                    title="Ajudados Escolhidos"
                    onPress={() => setShowHelpedUsers(!showHelpedUsers)}
                    badgeValue={helpedUsersBadgeValue}
                    marginTop="mt-4"
                    disabled={helpedUsersBadgeValue <= 0}
                />
            </View>
        );
    };

    const getAllPossibleHelpedUsers = () => {
        const { possibleHelpedUsers, possibleEntities } = help;
        return [...possibleHelpedUsers, ...possibleEntities];
    };

    return (
        <View className="h-full flex-1">
            <Dialog
                title="Finalizar oferta de ajuda"
                description="Você tem certeza que deseja finalizar essa oferta de ajuda?"
                cancelText="Não"
                confirmText="Sim"
                isVisible={confirmationModalVisible && !isLoading}
                onCloseDialog={() => setConfirmationModalVisible(false)}
                onConfirmPress={finishHelp}
            />

            {help && (
                <HelpScreenLayout
                    help={help}
                    navigation={navigation}
                    isNotOwner={user._id !== help.ownerId}
                    route={route}
                >
                    {user._id === help.ownerId && renderHelpedUsersButtons()}
                </HelpScreenLayout>
            )}
            {showPossibleHelpedUsers && (
                <ExpansiveModal
                    setShowModal={setShowPossibleHelpedUsers}
                    userList={getAllPossibleHelpedUsers()}
                    title="Possíveis ajudados"
                    method="chooseHelpedUsers"
                    confirmationText="Você deseja escolher esse usuário como ajudado?"
                    helpId={helpId}
                    showButton={true}
                    setUpdateData={setUpdateData}
                />
            )}
            {showHelpedUsers && (
                <ExpansiveModal
                    setShowModal={setShowHelpedUsers}
                    userList={help.helpedUsers}
                    title="Ajudados escolhidos"
                    helpId={helpId}
                    setUpdateData={setUpdateData}
                />
            )}
        </View>
    );
}
