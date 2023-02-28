import React, { useState, useContext, useEffect } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import { Badge, Icon } from 'react-native-elements';
import ConfirmationModal from '../../../../components/modals/confirmationModal';
import styles from './styles';
import HelpService from '../../../../services/Help';
import { alertSuccess } from '../../../../utils/Alert';
import { UserContext } from '../../../../store/contexts/userContext';
import callService from '../../../../services/callService';
import helpService from '../../../../services/Help';
import colors from '../../../../../assets/styles/colorVariables';
import UserCard from '../../../../components/InterestedList/UserCard';
import ChosenHelpersInfo from '../../../../components/modals/chosenHelpersInfo';
import MapView from 'react-native-maps';

export default function OfferHelpDescription({ route, navigation }) {
    const { helpId, routeId } = route.params;
    const { user } = useContext(UserContext);
    const [confirmationModalVisible, setConfirmationModalVisible] =
        useState(false);
    const [isFinishRequestLoading, setFinishRequestLoading] = useState(false);
    const [isHelpOfferLoading, setIsHelpOfferLoading] = useState(true);
    const [help, setHelp] = useState(null);

    const [showHelpedUsers, setShowHelpedUsers] = useState(false);
    const goBackToMyOfferedHelpPage = () => navigation.goBack();
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [updateData, setUpdateData] = useState(true);

    useEffect(() => {
        async function setupPage() {
            setIsHelpOfferLoading(true);
            const helpTemp = await callService(
                helpService,
                `get${routeId}WithAggregationById`,
                [helpId],
            );

            setHelp(helpTemp);
            setIsHelpOfferLoading(false);
        }
        if (updateData) {
            setupPage();
            setUpdateData(false);
        }
    }, [updateData]);

    async function finishHelp() {
        setFinishRequestLoading(true);
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

    const renderLoadingIndicator = () => (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );

    const navigateToPossibleHelpedUsersList = () => {
        navigation.navigate('ListHelpInteresteds', {
            possibleInteresteds: help.possibleHelpedUsers.concat(
                help.possibleEntities,
            ),
            message: 'Você deseja ajudar esse usuário?',
            method: 'chooseHelpedUsers',
            helpId: help._id,
            setUpdateData: setUpdateData,
        });
    };

    const Button = (props) => {
        const buttonStyle = { ...styles.buttonInteresteds };

        if (props.marginBottom) {
            buttonStyle.marginBottom = 15;
        }

        const iconName = props.activated ? 'chevron-down' : 'chevron-right';

        return (
            <TouchableOpacity
                style={[buttonStyle, styles.inline]}
                onPress={props.onPress}
            >
                <Text style={styles.textBtn}>{props.text}</Text>
                {props.showArrow && (
                    <View style={[styles.textBtn, styles.btnArrow]}>
                        <Icon
                            color="#FFF"
                            name={iconName}
                            type="font-awesome"
                        />
                    </View>
                )}
                <Badge
                    value={
                        <Text style={styles.labelBadge}>{props.badgeText}</Text>
                    }
                    badgeStyle={[styles.badgeStyle, styles.smallBadge]}
                    containerStyle={styles.containerBadge}
                />
            </TouchableOpacity>
        );
    };

    const renderWaitingHelpOwnerMessage = () => {
        return (
            <Text style={styles.waitingText}>
                Aguarde o dono da oferta entrar em contato.
            </Text>
        );
    };

    const renderHelpedUsersButtons = () => {
        return (
            <>
                <Button
                    text="Possíveis ajudados"
                    marginBottom
                    onPress={navigateToPossibleHelpedUsersList}
                    badgeText={
                        help.possibleHelpedUsers.length +
                        help.possibleEntities.length
                    }
                />
                <Button
                    text="Ajudados Escolhidos"
                    showArrow
                    onPress={() => setShowHelpedUsers(!showHelpedUsers)}
                    activated={showHelpedUsers}
                    badgeText={help.helpedUsers.length}
                />
            </>
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
        return (
            <View className="mt-[16]">
                <Text className="text-lg font-[montserrat-semibold]">
                    Localização
                </Text>
                <View className="relative w-full h-28 rounded-xl overflow-hidden mt-2">
                    <MapView className="w-full h-full" />
                    <TouchableOpacity
                        className={`absolute bottom-2 left-2 bg-[${colors.secondary}] rounded-full p-1`}
                    >
                        <Icon name="fullscreen" type="material-icons" />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    const renderHelpedUsers = () => {
        return (
            <ScrollView
                style={styles.helpedUsers}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                {help.helpedUsers.map((helpedUser) => (
                    <UserCard
                        key={helpedUser._id}
                        user={helpedUser}
                        showPhone
                        handleClick={() => {
                            setSelectedUser(helpedUser);
                            setShowModal(true);
                        }}
                    />
                ))}
            </ScrollView>
        );
    };

    const showUserOrOwnerView = () => {
        if (user._id == help.ownerId) return renderHelpedUsersButtons();
        else return renderWaitingHelpOwnerMessage();
    };

    const ownerPhoto = (help && help.user && help.user.photo) || user.photo;
    return (
        <View className="h-full">
            <ScrollView style={styles.scrollViewOffer}>
                {showModal && <View style={styles.viewBackdrop} />}
                <View style={styles.container}>
                    <ConfirmationModal
                        visible={confirmationModalVisible}
                        setVisible={setConfirmationModalVisible}
                        action={finishHelp}
                        message={
                            'Você tem certeza que deseja finalizar essa oferta de ajuda?'
                        }
                        isLoading={isFinishRequestLoading}
                    />
                    {isHelpOfferLoading ? (
                        renderLoadingIndicator()
                    ) : (
                        <View className="bg-white h-screen w-screen rounded-t-3xl p-[26] mt-14">
                            <Image
                                className="w-[70] h-[70] object-cover rounded-full self-center absolute -top-9"
                                source={{
                                    uri: `data:image/png;base64,${ownerPhoto}`,
                                }}
                            />
                            {renderHelpInformation()}
                            {renderOfferLocation()}
                            <View className="mt-[16]">
                                {showUserOrOwnerView()}
                                {showHelpedUsers && renderHelpedUsers()}
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>
            {showModal && (
                <ChosenHelpersInfo
                    user={selectedUser}
                    setShowModal={setShowModal}
                    showModal={showModal}
                />
            )}
        </View>
    );
}
