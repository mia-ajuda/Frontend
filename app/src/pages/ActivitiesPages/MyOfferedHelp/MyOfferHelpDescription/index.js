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
import useService from '../../../../services/useService';
import shortenName from '../../../../utils/shortenName';
import helpService from '../../../../services/Help';
import colors from '../../../../../assets/styles/colorVariables';
import UserCard from '../../../../components/InterestedList/UserCard';

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

    useEffect(() => {
        async function setupPage() {
            setIsHelpOfferLoading(true);
            const helpTemp = await useService(
                helpService,
                `get${routeId}WithAggregationById`,
                [helpId],
            );

            setHelp(helpTemp);
            setIsHelpOfferLoading(false);
        }
        setupPage();
    }, []);

    async function finishHelp() {
        setFinishRequestLoading(true);
        const finishHelpRequest = await useService(
            HelpService,
            'finishHelpByHelper',
            [help._id, user._id],
        );
        if (!finishHelpRequest.error) {
            alertSuccess(
                'Você finalizou sua ajuda! Aguarde o dono do pedido finalizar para concluí-la',
            );
        }
        goBackToMyOfferedHelpPage();
    }

    const renderLoadingIndicator = () => (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );

    const navigateToHelpedUsersList = () => {
        navigation.navigate('ListHelpInteresteds', {
            helpId: help._id,
            routeId: 'HelpOffer',
            message: '',
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
                onPress={props.onPress}>
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
        if (user._id != help.ownerId) {
            return (
                <Text style={styles.waitingText}>
                    Aguarde a confirmação do dono da ajuda.
                </Text>
            );
        } else {
            return (
                <>
                    <Button
                        text="Interessados"
                        marginBottom
                        onPress={navigateToHelpedUsersList}
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
        }
    };

    const renderHelpOwnerInformation = () => {
        const ownerNameFormated = shortenName(help.user.name);
        const ownerPhoto = (help && help.user && help.user.photo) || user.photo;

        return (
            <View style={styles.userInfo}>
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
        <View style={styles.helpInfo}>
            <View style={styles.helpInfoText}>
                <Text style={styles.titleFont}>{help.title}</Text>
                <View style={styles.categoryContainer}>
                    {help.categories.map((category) => (
                        <View key={category._id} style={styles.categoryWarning}>
                            <Text style={styles.categoryName}>
                                {category.name}
                            </Text>
                        </View>
                    ))}
                </View>
                <Text style={[styles.infoText, styles.infoTextBottom]}>
                    {help.description}
                </Text>
            </View>
        </View>
    );

    const renderHelpedUsers = () => {
        return (
            <View style={styles.helpedUsers}>
                {help.helpedUsers.map((user) => (
                    <UserCard
                        key={user._id}
                        user={user}
                        handleClick={() => null}
                    />
                ))}
            </View>
        );
    };

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
                {isHelpOfferLoading ? (
                    renderLoadingIndicator()
                ) : (
                    <>
                        {renderHelpOwnerInformation()}
                        {renderHelpInformation()}
                        <View style={styles.helpButtons}>
                            {renderWaitingHelpOwnerMessage()}
                            {showHelpedUsers && renderHelpedUsers()}
                        </View>
                    </>
                )}
            </View>
        </ScrollView>
    );
}
