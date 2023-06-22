import React, { Fragment, useCallback, useContext, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { DefaultButtonWithBadges } from '../../../../components/molecules/DefaultButtonWithBagdes';
import { HelpScreenLayout } from '../../../../components/templates/HelpScreenLayout';
import { UserContext } from '../../../../store/contexts/userContext';
import callService from '../../../../services/callService';
import helpService from '../../../../services/Help';
import { LoadingContext } from '../../../../store/contexts/loadingContext';
import { ExpansiveModal } from '../../../../components/modals/expansiveModal';
import { UserProfileCard } from '../../../../components/atoms/UserProfileCard';
import { DefaultButton } from '../../../../components/atoms/DefaultButton';
import openWhatsapp from '../../../../utils/openWhatsapp';
import callNumber from '../../../../utils/callNumber';
import { HelpContext } from '../../../../store/contexts/helpContext';
import { useFocusEffect, useNavigationState } from '@react-navigation/native';
import { Dialog } from '../../../../components/molecules/Dialog';
import { FeedbackContext } from '../../../../store/contexts/feedbackContext';
import { FeedbackModal } from './FeedbackModal';
import { BadgeContext } from '../../../../store/contexts/badgeContext';

export default function HelpDescription({
    route,
    navigation,
    setConfirmationModalVisible,
    confirmationModalVisible,
    setHelp,
    help,
}) {
    const { helpId, routeId } = route.params;
    const { user } = useContext(UserContext);
    const { setIsLoading } = useContext(LoadingContext);
    const { createFeedback } = useContext(FeedbackContext);
    const { increaseUserBadge } = useContext(BadgeContext);

    const [updateData, setUpdateData] = useState(false);
    const [showPossibleHelpers, setShowPossibleHelpers] = useState(false);
    const [helper, setHelper] = useState(null);
    const { finishHelpByOwner } = useContext(HelpContext);
    const { fetchUserInfo } = useContext(UserContext);
    const [showSuccessDialog, setShowSuccesDialog] = useState(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [showSendedFeedbackDialog, setShowSendedFeedbackDialog] =
        useState(false);
    const [feedback, setFeedback] = useState('');

    const state = useNavigationState((state) => state);

    const { routes } = state;
    const initialRoute = routes[0].name;

    const getHelp = async () => {
        setIsLoading(true);
        const helpTemp = await callService(
            helpService,
            `get${routeId}WithAggregationById`,
            [helpId],
        );

        setHelp(helpTemp);
        setIsLoading(false);
    };

    const fetchHelperInfo = async () => {
        setIsLoading(true);
        const helperTemp = await fetchUserInfo(help.helperId);
        setHelper(helperTemp);
        setIsLoading(false);
    };

    useFocusEffect(
        useCallback(() => {
            getHelp();
            return () => {
                setHelp();
                setHelper();
            };
        }, [updateData]),
    );

    useFocusEffect(
        useCallback(() => {
            help?.helperId && fetchHelperInfo();
        }, [help]),
    );

    const renderButtons = () => {
        const possibleHelpersBadgeValue =
            (help?.possibleHelpers?.length || 0) +
            (help?.possibleEntities?.length || 0);

        return (
            <View className="mt-6">
                {helper ? (
                    renderMyHelper()
                ) : (
                    <DefaultButtonWithBadges
                        title="Possíveis Ajudantes"
                        onPress={() => setShowPossibleHelpers(true)}
                        badgeValue={possibleHelpersBadgeValue}
                        disabled={possibleHelpersBadgeValue <= 0}
                    />
                )}
            </View>
        );
    };

    const renderHelperCard = () => {
        return (
            <Fragment>
                <Text className="text-lg font-ms-semibold mb-2">Ajudante</Text>
                <UserProfileCard user={helper} />
            </Fragment>
        );
    };

    const renderHelperContactButtons = () => {
        return (
            <View className="mt-4">
                <DefaultButton
                    title="Inicie uma conversa"
                    onPress={() => openWhatsapp(user.phone)}
                />
                <DefaultButton
                    title="Faça uma ligação"
                    variant="transparent"
                    onPress={() => callNumber(user.phone)}
                />
            </View>
        );
    };

    const renderMyHelper = () => {
        if (help.status != 'finished')
            return (
                <Fragment>
                    {renderHelperCard()}
                    {renderHelperContactButtons()}
                </Fragment>
            );
    };

    const getAllPossibleHelpers = () => {
        const { possibleHelpers, possibleEntities } = help;
        return [...possibleHelpers, ...possibleEntities];
    };

    const finishHelpByOwnerAction = async () => {
        setConfirmationModalVisible(false);
        setIsLoading(true);
        const response = await finishHelpByOwner(helpId);
        setIsLoading(false);
        if (response) {
            setShowSuccesDialog(true);
            increaseUserBadge(help?.helperId, 'help');
        }
    };

    const handleShowFeedbackBottomSheet = () => {
        setShowSuccesDialog(false);
        setShowFeedbackModal(true);
    };

    const handleSendFeedback = async () => {
        setIsLoading(true);
        const response = await createFeedback(
            help?.ownerId,
            help?.helperId,
            feedback,
        );
        setIsLoading(false);
        if (!response.error) {
            setShowFeedbackModal(false);
            setShowSendedFeedbackDialog(true);
        }
    };

    const navigateToInitialScreen = () =>
        navigation.reset({
            index: 0,
            routes: [{ name: initialRoute }],
        });

    const renderModals = () => {
        return (
            <>
                {confirmationModalVisible && (
                    <Dialog
                        title="Finalizar Pedido?"
                        description="Você tem certeza que deseja finalizar este pedido de ajuda?"
                        isVisible={confirmationModalVisible}
                        onCloseDialog={() => setConfirmationModalVisible(false)}
                        onConfirmPress={finishHelpByOwnerAction}
                        cancelText={'Não'}
                        confirmText="Sim"
                    />
                )}
                {showSuccessDialog && (
                    <Dialog
                        title="Pedido Finalizado"
                        description="Deseja deixar uma mensagem para o usuário que te ajudou?"
                        isVisible={showSuccessDialog}
                        onCloseDialog={navigateToInitialScreen}
                        onConfirmPress={handleShowFeedbackBottomSheet}
                        cancelText={'Não'}
                        confirmText="Sim"
                    />
                )}
                {showSendedFeedbackDialog && (
                    <Dialog
                        description="Feedback enviado com sucesso!"
                        isVisible={showSendedFeedbackDialog}
                        onCloseDialog={navigateToInitialScreen}
                        onConfirmPress={navigateToInitialScreen}
                    />
                )}

                {showPossibleHelpers && (
                    <ExpansiveModal
                        setShowModal={setShowPossibleHelpers}
                        userList={getAllPossibleHelpers()}
                        title="Possíveis ajudantes"
                        method="chooseHelper"
                        confirmationText="Você deseja escolher esse usuário como ajudante?"
                        helpId={helpId}
                        showButton={true}
                        setUpdateData={setUpdateData}
                    />
                )}
                {showFeedbackModal && (
                    <FeedbackModal
                        setShowFeedbackModal={setShowFeedbackModal}
                        showFeedbackModal={showFeedbackModal}
                        onCloseModal={navigateToInitialScreen}
                        feedback={feedback}
                        setFeedback={setFeedback}
                        onSubmit={handleSendFeedback}
                    />
                )}
            </>
        );
    };
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {help && (
                <HelpScreenLayout
                    help={help}
                    navigation={navigation}
                    route={route}
                    isNotOwner={user._id !== help.ownerId}
                >
                    {user._id === help.ownerId && renderButtons()}
                </HelpScreenLayout>
            )}
            {renderModals()}
        </ScrollView>
    );
}
