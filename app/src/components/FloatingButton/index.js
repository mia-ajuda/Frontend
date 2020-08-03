import React, { useState } from 'react';
import Animated, { Easing, timing } from 'react-native-reanimated';
import { Text, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import styles from './styles';

const buttonsTransleY = new Animated.Value(0);
export default function FloatingButtons() {
    const [isButtonsShown, setButtonsShown] = useState(false);

    const toggleButtonsVisibility = () => {
        if (isButtonsShown) {
            hideButtons();
            setButtonsShown(false);
        } else {
            showButtons();
            setButtonsShown(true);
        }
    };
    const showButtons = () => {
        const showButtonsConfig = {
            duration: 150,
            toValue: 100,
            easing: Easing.inOut(Easing.ease),
        };
        timing(buttonsTransleY, showButtonsConfig).start();
    };

    const hideButtons = () => {
        const hideButtonsConfig = {
            duration: 150,
            toValue: 0,
            easing: Easing.inOut(Easing.ease),
        };
        timing(buttonsTransleY, hideButtonsConfig).start();
    };

    return (
        <>
            <Animated.View
                style={[
                    {
                        transform: [
                            {
                                rotate: buttonsTransleY.interpolate({
                                    inputRange: [0, 100],
                                    outputRange: [0, 1],
                                }),
                            },
                        ],
                    },
                    styles.plusButtonView,
                ]}>
                <TouchableOpacity
                    style={styles.plusButton}
                    onPress={toggleButtonsVisibility}>
                    <FontAwesome name="plus" size={30} color="#fff" />
                </TouchableOpacity>
            </Animated.View>

            <Animated.View
                style={[
                    {
                        transform: [
                            {
                                translateX: buttonsTransleY.interpolate({
                                    inputRange: [0, 100],
                                    outputRange: [0, -100],
                                }),
                            },
                        ],
                    },
                    styles.helpButtonView,
                ]}>
                <Text>Teste</Text>
                <TouchableOpacity style={styles.helpButton} />
            </Animated.View>

            <Animated.View
                style={[
                    {
                        transform: [
                            {
                                translateX: buttonsTransleY.interpolate({
                                    inputRange: [0, 100],
                                    outputRange: [0, -50],
                                }),
                            },
                        ],
                    },
                    styles.helpButtonView,
                ]}>
                <Text>Teste</Text>
                <TouchableOpacity style={styles.helpButton} />
            </Animated.View>
        </>
    );
}
