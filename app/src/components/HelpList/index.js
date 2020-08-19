import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    ScrollView,
    Animated,
    TouchableWithoutFeedback,
} from 'react-native';
import { Icon } from 'react-native-elements';
import HelpCard from '../HelpCard';
import NoHelps from '../../components/NoHelps';
import colors from '../../../assets/styles/colorVariables';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function HelpList({
    helps,
    campaigns,
    visible,
    setVisible,
    navigation,
}) {
    const [iconName, setIconName] = useState('caret-up');
    const listHeight = useRef(new Animated.Value(40)).current;

    useEffect(() => {
        const isAnEmptyList = campaigns.length === 0 && helps.length === 0;
        switch (visible) {
            case true:
                setIconName('caret-down');
                Animated.spring(listHeight, {
                    toValue: isAnEmptyList ? 300 : 400,
                    tension: 10,
                    useNativeDriver: false,
                }).start();
                break;

            case false:
                setIconName('caret-up');
                Animated.spring(listHeight, {
                    toValue: 40,
                    useNativeDriver: false,
                }).start();
                break;
        }
    }, [visible]);

    const renderHelpList = () => {
        return (
            <ScrollView
                style={styles.listContent}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollStyle}>
                {helps.map((help) => {
                    const isRiskGroup = !!help.user.riskGroup.length;

                    return (
                        <TouchableOpacity
                            key={help._id}
                            onPress={() =>
                                navigation.navigate('mapHelpDescription', {
                                    help,
                                })
                            }>
                            <HelpCard help={help} isRiskGroup={isRiskGroup} />
                        </TouchableOpacity>
                    );
                })}
                {campaigns.map((campaign) => {
                    return (
                        <TouchableOpacity
                            key={campaign._id}
                            onPress={() =>
                                navigation.navigate('campaignDescription', {
                                    campaign,
                                })
                            }>
                            {/* <HelpCard help={campaign} isRiskGroup={false} /> */}
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        );
    };

    const renderNoHelpMessage = () => (
        <View
            style={{
                position: 'absolute',
                width: '100%',
                top: 30,
            }}>
            <NoHelps title="Não há ajudas próximas" color="light" />
        </View>
    );

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

            {helps.length > 0 ? renderHelpList() : renderNoHelpMessage()}
        </Animated.View>
    );
}
