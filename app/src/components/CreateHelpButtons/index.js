import React, { useContext, useState } from 'react';
import Animated, { EasingNode, timing } from 'react-native-reanimated';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { UserContext } from '../../store/contexts/userContext';
import createInteraction from '../../utils/createInteraction';
import { Icon } from 'react-native-elements';
import colors from '../../../colors';

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
        createInteraction(user, navigation, creationPage);
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
                <Icon name="plus" type="font-awesome" color="#fff" size={30} />
            </TouchableOpacity>
        </Animated.View>
    );

    const renderOfferButton = () => {
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
                    <Text style={styles.helpButtonText}>Oferecer ajuda</Text>
                )}

                <View style={styles.helpButton}>
                    <Icon
                        name="hand-heart"
                        type="material-community"
                        color={colors.primary.DEFAULT}
                        size={32}
                    />
                </View>
            </HelpButtonAnimated>
        );
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
                <Icon
                    name="exclamation"
                    type="font-awesome"
                    color={colors.primary.DEFAULT}
                    size={32}
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
