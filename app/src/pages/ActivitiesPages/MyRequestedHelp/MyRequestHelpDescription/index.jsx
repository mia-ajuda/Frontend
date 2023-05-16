import React, { Fragment, useContext, useEffect, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { DefaultButtonWithBadges } from '../../../../components/molecules/DefaultButtonWithBagdes';
import { HelpScreenLayout } from '../../../../components/templates/HelpScreenLayout';
import { UserContext } from '../../../../store/contexts/userContext';
import callService from '../../../../services/callService';
import helpService from '../../../../services/Help';
import { LoadingContext } from '../../../../store/contexts/loadingContext';
import { ExpansiveModal } from '../../../../components/modals/expansiveModal';
import { UserProfileCard } from '../../../../components/atoms/UserCard';
import { DefaultButton } from '../../../../components/atoms/DefaultButton';
import openWhatsapp from '../../../../utils/openWhatsapp';
import callNumber from '../../../../utils/callNumber';
import ConfirmationModal from '../../../../components/modals/confirmationModal';
import { HelpContext } from '../../../../store/contexts/helpContext';

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
    const { isLoading, setIsLoading } = useContext(LoadingContext);
    const [updateData, setUpdateData] = useState(true);
    const [showPossibleHelpers, setShowPossibleHelpers] = useState(false);
    const [helper, setHelper] = useState();
    const { finishHelpByOwner } = useContext(HelpContext);
    const { fetchUserInfo } = useContext(UserContext);

    useEffect(() => {
        async function setupPage() {
            setIsLoading(true);
            const helpTemp = await callService(
                helpService,
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

    useEffect(() => {
        async function fetchHelperInfo() {
            setIsLoading(true);
            const helperTemp = await fetchUserInfo(help.helperId);
            setHelper(helperTemp);
            setIsLoading(false);
        }

        if (help?.helperId) {
            fetchHelperInfo();
        }
    }, [help]);

    const renderButtons = () => {
        const possibleHelpersBadgeValue =
            (help.possibleHelpers?.length || 0) +
            (help.possibleEntities?.length || 0);

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
                <UserProfileCard
                    userId={helper.helperId}
                    photo={helper.photo}
                    phone={helper.phone}
                    email={helper.email}
                    name={helper.name}
                />
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

    const ownerPhoto = (help && help.user && help.user.photo) || user.photo;

    const getAllPossibleHelpers = () => {
        const { possibleHelpers, possibleEntities } = help;
        return [...possibleHelpers, ...possibleEntities];
    };

    const finishHelpByOwnerAction = () => {
        finishHelpByOwner(helpId);
        navigation.reset({
            index: 0,
            routes: [{ name: 'activitiesDrawer' }],
        });
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <ConfirmationModal
                visible={confirmationModalVisible && !isLoading}
                setVisible={setConfirmationModalVisible}
                action={finishHelpByOwnerAction}
                message={
                    'Você tem certeza que deseja finalizar este pedido de ajuda?'
                }
            />
            {help && (
                <HelpScreenLayout
                    help={help}
                    ownerPhoto={ownerPhoto}
                    navigation={navigation}
                >
                    {renderButtons()}
                </HelpScreenLayout>
            )}
            {showPossibleHelpers && (
                <ExpansiveModal
                    setShowModal={setShowPossibleHelpers}
                    userList={getAllPossibleHelpers()}
                    title="Possíveis ajudantes"
                    method="chooseHelper"
                    helpId={helpId}
                    showButton={true}
                    setUpdateData={setUpdateData}
                />
            )}
        </ScrollView>
    );
}
