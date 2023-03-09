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
import getYearsSince from '../../../../utils/getYearsSince';
import styles from './styles';
import HelpService from '../../../../services/Help';
import { alertSuccess } from '../../../../utils/Alert';
import { UserContext } from '../../../../store/contexts/userContext';
import callService from '../../../../services/callService';
import shortenName from '../../../../utils/shortenName';
import helpService from '../../../../services/Help';
import colors from '../../../../../assets/styles/colorVariables';
import UserCard from '../../../../components/InterestedList/UserCard';
import ChosenHelpersInfo from '../../../../components/modals/chosenHelpersInfo';
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
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState({});
    const [updateData, setUpdateData] = useState(true);

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

    const renderLoadingIndicator = () => (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );

    const navigateToPossibleHelpedUsersList = () => {
        navigation.navigate('listHelpInteresteds', {
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

    const renderHelpOwnerInformation = () => {
        const ownerNameFormated = shortenName(help.user.name);
        const ownerPhoto = (help && help.user && help.user.photo) || user.photo;

        return (
            <View style={[styles.userInfo, styles.noFlex]}>
                <Image
                    source={{
                        uri: `data:image/png;base64,${ownerPhoto}`,
                    }}
                    style={styles.profileImage}
                />
                <View style={styles.infoTextView}>
                    <Text style={[styles.infoText, styles.infoTextFont]}>
                        {ownerNameFormated}
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
    };

    const renderHelpInformation = () => (
        <View>
            <View style={styles.helpInfoText}>
                <Text style={[styles.titleFont, styles.noPaddingBottom]}>
                    {help.title}
                </Text>
                <View style={styles.categoryContainer}>
                    {help.categories.map((category) => (
                        <View key={category._id} style={styles.categoryWarning}>
                            <Text style={styles.categoryName}>
                                {category.name}
                            </Text>
                        </View>
                    ))}
                </View>
                <Text style={[styles.infoText, styles.smallMargin]}>
                    {help.description}
                </Text>
            </View>
        </View>
    );

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

    return (
        <View style={styles.viewOffer}>
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
                        isLoading={isLoading}
                    />
                    {!isLoading && (
                        <>
                            {renderHelpOwnerInformation()}
                            {renderHelpInformation()}
                            <View style={styles.helpButtons}>
                                {showUserOrOwnerView()}
                                {showHelpedUsers && renderHelpedUsers()}
                            </View>
                        </>
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
