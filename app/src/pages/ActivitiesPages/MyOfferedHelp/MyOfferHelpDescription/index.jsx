import React, { useState, useContext, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import ConfirmationModal from '../../../../components/modals/confirmationModal';
import styles from './styles';
import HelpService from '../../../../services/Help';
import { alertSuccess } from '../../../../utils/Alert';
import { UserContext } from '../../../../store/contexts/userContext';
import callService from '../../../../services/callService';
import Map from '../../../../components/Map';
import HelpOfferMarker from '../../../Main/HelpOfferMarker';
import { ExpandedModal } from '../../../../components/modals/expandedModal';
import { DefaultButtonWithBadges } from '../../../../components/molecules/DefaultButtonWithBagdes';
import { LoadingContext } from '../../../../store/contexts/loadingContext';

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

    const renderWaitingHelpOwnerMessage = () => {
        return (
            <Text style={styles.waitingText}>
                Aguarde o dono da oferta entrar em contato.
            </Text>
        );
    };

    const renderHelpedUsersButtons = () => {
        const possibleHelpedUsersBadgeValue =
            help.possibleHelpedUsers.length + help.possibleEntities.length;

        const helpedUsersBadgeValue = help.helpedUsers.length;
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

    const renderHelpInformation = () => (
        <View className="mt-[16]">
            <Text className="text-xl text-center font-[montserrat-semibold]">
                {help.title}
            </Text>
            <View className="flex flex-row w-full mb-[32] justify-center flex-wrap mt-[16]">
                {help.categories.map((category) => (
                    <View key={category._id} style={styles.categoryWarning}>
                        <Text style={styles.categoryName}>{category.name}</Text>
                    </View>
                ))}
            </View>
            <View className="border border-[#D2D2D2] py-[16] px-[10] relative rounded-lg">
                <Text className="absolute -top-4 text-lg bg-white px-1 font-[montserrat-semibold]">
                    Descrição
                </Text>
                <Text style={[styles.infoText]}>{help.description}</Text>
            </View>
        </View>
    );

    const renderOfferLocation = () => {
        const helpLocationCoordinates = {
            latitude: help.location.coordinates[1],
            latitudeDelta: 0.025,
            longitude: help.location.coordinates[0],
            longitudeDelta: 0.025,
        };
        return (
            <View className="mt-4">
                <Text className="text-lg font-[montserrat-semibold]">
                    Localização
                </Text>
                <View className="relative w-full h-28 rounded-xl overflow-hidden mt-2">
                    <Map initialRegion={helpLocationCoordinates}>
                        <HelpOfferMarker key={help._id} helpOffer={help} />
                    </Map>
                    <TouchableOpacity
                        onPress={() =>
                            navigateToSelectedHelpOnMap(helpLocationCoordinates)
                        }
                        className="absolute bottom-2 bg-secondary left-2 rounded-full p-1"
                    >
                        <Icon name="fullscreen" type="material-icons" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const navigateToSelectedHelpOnMap = (helpLocationCoordinates) => {
        navigation.navigate('selectedHelpOnMap', {
            help: help,
            helpLocationCoordinates: helpLocationCoordinates,
        });
    };

    const showUserOrOwnerView = () => {
        if (user._id == help.ownerId) return renderHelpedUsersButtons();
        else return renderWaitingHelpOwnerMessage();
    };

    const getAllPossibleHelpedUsers = () => {
        const fakePossibleHelpedUsers = help.possibleHelpedUsers;
        const fakePossibleEntities = help.possibleEntities;
        fakePossibleEntities.push(...fakePossibleHelpedUsers);

        return fakePossibleEntities;
    };

    const ownerPhoto = (help && help.user && help.user.photo) || user.photo;
    return (
        <View className="h-full flex-1">
            <ConfirmationModal
                visible={confirmationModalVisible && !isLoading}
                setVisible={setConfirmationModalVisible}
                action={finishHelp}
                message={
                    'Você tem certeza que deseja finalizar essa oferta de ajuda?'
                }
            />
            {help && (
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View className="bg-white rounded-t-3xl p-[26] mt-14 flex-1">
                        <Image
                            className="w-[70] h-[70] object-cover rounded-full self-center absolute -top-9"
                            source={{
                                uri: `data:image/png;base64,${ownerPhoto}`,
                            }}
                        />
                        {renderHelpInformation()}
                        {renderOfferLocation()}
                        {showUserOrOwnerView()}
                    </View>
                </ScrollView>
            )}
            {showPossibleHelpedUsers && (
                <ExpandedModal
                    setShowModal={setShowPossibleHelpedUsers}
                    userList={getAllPossibleHelpedUsers()}
                    title="Possíveis ajudados"
                    method="chooseHelpedUsers"
                    helpId={helpId}
                    showButton={true}
                    setUpdateData={setUpdateData}
                />
            )}
            {showHelpedUsers && (
                <ExpandedModal
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
