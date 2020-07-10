import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    ScrollView,
    Animated,
    TouchableWithoutFeedback,
    Image,
    Text,
} from 'react-native';
import { Icon } from 'react-native-elements';
import HelpCard from '../HelpCard';

import colors from '../../../assets/styles/colorVariables';
import styles from './styles';

export default function HelpList({ helps, visible, setVisible, navigation }) {
    const [iconName, setIconName] = useState('caret-up');
    const listHeight = useRef(new Animated.Value(40)).current;

    useEffect(() => {
        switch (visible) {
            case true:
                setIconName('caret-down');
                Animated.spring(listHeight, {
                    toValue: helps.length > 0 ? 400 : 300,
                    tension: 10,
                }).start();
                break;

            case false:
                setIconName('caret-up');
                Animated.spring(listHeight, {
                    toValue: 40,
                }).start();
                break;
        }
    }, [visible]);

    function clickHandler(helpId) {
        console.log(helpId);
        navigation.navigate('helpDetails', { id: helpId });
    }

    return (
        <Animated.View
            style={[styles.helpListContainer, { height: listHeight }]}>
            <TouchableWithoutFeedback onPress={() => setVisible(!visible)}>
                <View style={styles.buttonStyle}>
                    <Icon
                        size={25}
                        name={iconName}
                        type="font-awesome"
                        color={colors.light}
                    />
                </View>
            </TouchableWithoutFeedback>
            {visible && (
                <>
                    {helps.length > 0 ? (
                        <ScrollView
                            style={styles.listContent}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.scrollStyle}>
                            {helps.map((help, index) => (
                                <HelpCard
                                    key={index}
                                    help={help}
                                    onClick={() => clickHandler(help._id)}
                                />
                            ))}
                        </ScrollView>
                    ) : (
                        <View style={styles.emptyList}>
                            <Image
                                source={require('../../../assets/images/whiteCat.png')}
                                style={styles.emptyListImage}
                            />
                            <Text style={styles.emptyListText}>
                                Não há ajudas próximas{' '}
                            </Text>
                        </View>
                    )}
                </>
            )}
        </Animated.View>
    );
}
