import React, { useState } from 'react';
import Animated, { Easing, timing } from 'react-native-reanimated';
import { Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import styles from './styles';
import colors from '../../../assets/styles/colorVariables';

const buttonsTransleY = new Animated.Value(0);
const BUTTON_MAX_HEIGHT = 120;
const BUTTON_MIN_HEIGHT = 0;

const AnimatedButton = Animated.createAnimatedComponent(TouchableOpacity);

export default function FloatingButtons() {
    const navigation = useNavigation();
    const [isButtonsShown, setButtonsShown] = useState(false);

    const toggleButtonsVisibility = () => {
        if (isButtonsShown) {
            hideButtons();
        } else {
            showButtons();
        }
    };

    const navigateToCreateHelpPage = () => {
        navigation.navigate('createHelpRequest');
        hideButtons();
    };
    const navigateToCreateHelpOfferPage = () => {
        navigation.navigate('createHelpOffer');
        hideButtons();
    };

    const showButtons = () => {
        const showButtonsConfig = {
            duration: 150,
            toValue: BUTTON_MAX_HEIGHT,
            easing: Easing.inOut(Easing.ease),
        };
        timing(buttonsTransleY, showButtonsConfig).start();
        setButtonsShown(true);
    };

    const hideButtons = () => {
        const hideButtonsConfig = {
            duration: 150,
            toValue: BUTTON_MIN_HEIGHT,
            easing: Easing.inOut(Easing.ease),
        };
        timing(buttonsTransleY, hideButtonsConfig).start();
        setButtonsShown(false);
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
            ]}>
            <TouchableOpacity
                style={styles.plusButton}
                activeOpacity={1}
                onPress={toggleButtonsVisibility}>
                <FontAwesome name="plus" size={30} color="#fff" />
            </TouchableOpacity>
        </Animated.View>
    );

    const renderRequestHelpButton = () => (
        <AnimatedButton
            onPress={navigateToCreateHelpPage}
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
            ]}>
            {isButtonsShown && (
                <Text style={styles.helpButtonText}>Pedir ajuda</Text>
            )}
            <View
                style={[
                    { transform: [{ rotate: '-15deg' }] },
                    styles.helpButton,
                ]}>
                <FontAwesome
                    name="exclamation"
                    size={50}
                    color={colors.primary}
                />
            </View>
        </AnimatedButton>
    );
    const renderOfferButton = () => (
        <AnimatedButton
            onPress={navigateToCreateHelpOfferPage}
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
            ]}>
            {isButtonsShown && (
                <Text style={styles.helpButtonText}>oferecer ajuda</Text>
            )}

            <View style={styles.helpButton}>
                <FontAwesome5
                    name="hand-holding-heart"
                    size={30}
                    color={colors.primary}
                />
            </View>
        </AnimatedButton>
    );

    return (
        <>
            {renderPlusButton()}
            {renderOfferButton()}
            {renderRequestHelpButton()}
        </>
    );
}
