import React, { useContext, useState } from 'react';
import Animated, { EasingNode, timing } from 'react-native-reanimated';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import styles from './styles';
import colors from '../../../assets/styles/colorVariables';
import isOffersTurnedOff from '../../utils/isOffersTurnedOff';
import verifyUserInfo from '../../utils/verifyUserInfo';
import { UserContext } from '../../store/contexts/userContext';

const buttonsTransleY = new Animated.Value(0);
const BUTTON_MAX_HEIGHT = 120;
const BUTTON_MIN_HEIGHT = 0;

const HelpButtonAnimated = Animated.createAnimatedComponent(TouchableOpacity);

export default function CreateHelpButtons() {
    const navigation = useNavigation();
    const [isButtonsVisible, setButtonsVisible] = useState(false);
    const { user } = useContext(UserContext);
    const toggleButtonsVisibility = () => {
        if (isButtonsVisible) {
            hideButtons();
        } else {
            showButtons();
        }
    };

    const navigateToCreatePage = (page) => {
        const creationPage =
            page == 'help' ? 'createHelpRequest' : 'createHelpOffer';
        if (verifyUserInfo(user)) {
            navigation.navigate(creationPage);
        } else {
            navigation.navigate('address');
        }
        hideButtons();
    };

    const showButtons = () => {
        const showButtonsConfig = {
            duration: 150,
            toValue: BUTTON_MAX_HEIGHT,
            easing: EasingNode.inOut(EasingNode.ease),
        };
        timing(buttonsTransleY, showButtonsConfig).start();
        setButtonsVisible(true);
    };

    const hideButtons = () => {
        const hideButtonsConfig = {
            duration: 150,
            toValue: BUTTON_MIN_HEIGHT,
            easing: EasingNode.inOut(EasingNode.ease),
        };
        timing(buttonsTransleY, hideButtonsConfig).start();
        setButtonsVisible(false);
    };

    const renderPlusButton = () => (
        <Animated.View
            style={[
                {
                    transform: [
                        {
                            rotate: buttonsTransleY.interpolate({
                                inputRange: [
                                    BUTTON_MIN_HEIGHT,
                                    BUTTON_MAX_HEIGHT,
                                ],
                                outputRange: [0, 0.8],
                            }),
                        },
                    ],
                },
                styles.plusButtonView,
            ]}
        >
            <TouchableOpacity
                style={styles.plusButton}
                activeOpacity={1}
                onPress={toggleButtonsVisibility}
            >
                <FontAwesome name="plus" size={30} color="#fff" />
            </TouchableOpacity>
        </Animated.View>
    );

    const renderOfferButton = () => {
        if (!isOffersTurnedOff()) {
            // Turn Off Feature of Offer
            return (
                <HelpButtonAnimated
                    onPress={() => navigateToCreatePage('offer')}
                    style={[
                        {
                            transform: [
                                {
                                    translateY: buttonsTransleY.interpolate({
                                        inputRange: [
                                            BUTTON_MIN_HEIGHT,
                                            BUTTON_MAX_HEIGHT,
                                        ],
                                        outputRange: [0, -BUTTON_MAX_HEIGHT],
                                    }),
                                },
                            ],
                        },
                        styles.helpButtonView,
                    ]}
                >
                    {isButtonsVisible && (
                        <Text style={styles.helpButtonText}>
                            Oferecer ajuda
                        </Text>
                    )}

                    <View style={styles.helpButton}>
                        <FontAwesome5
                            name="hand-holding-heart"
                            size={30}
                            color={colors.primary}
                        />
                    </View>
                </HelpButtonAnimated>
            );
        }
    };

    const renderRequestHelpButton = () => (
        <HelpButtonAnimated
            onPress={() => navigateToCreatePage('help')}
            style={[
                {
                    transform: [
                        {
                            translateY: buttonsTransleY.interpolate({
                                inputRange: [
                                    BUTTON_MIN_HEIGHT,
                                    BUTTON_MAX_HEIGHT,
                                ],
                                outputRange: [0, -BUTTON_MAX_HEIGHT / 2],
                            }),
                        },
                    ],
                },
                styles.helpButtonView,
            ]}
        >
            {isButtonsVisible && (
                <Text style={styles.helpButtonText}>Pedir ajuda</Text>
            )}
            <View
                style={[
                    { transform: [{ rotate: '-15deg' }] },
                    styles.helpButton,
                ]}
            >
                <FontAwesome
                    name="exclamation"
                    size={50}
                    color={colors.primary}
                />
            </View>
        </HelpButtonAnimated>
    );

    return (
        <>
            {renderPlusButton()}
            {renderOfferButton()}
            {renderRequestHelpButton()}
        </>
    );
}
