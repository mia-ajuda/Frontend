import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    ScrollView,
    Animated,
    Text,
    TouchableWithoutFeedback,
} from 'react-native';
import { Icon } from 'react-native-elements';
import HistoricCard from '../HistoricCard';
import NoHelps from '../../components/NoHelps';
import colors from '../../../assets/styles/colorVariables';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function HelpList({ helps, visible, setVisible, navigation }) {
    const [iconName, setIconName] = useState('caret-up');
    const [iconDescription, setIconDescription] = useState(
        'Visualizar pedidos e ofertas',
    );
    const listHeight = useRef(new Animated.Value(40)).current;

    useEffect(() => {
        const isAnEmptyList = helps.length === 0;
        switch (visible) {
            case true:
                setIconName('caret-down');
                setIconDescription('Esconder pedidos e ofertas');
                Animated.spring(listHeight, {
                    toValue: isAnEmptyList ? 300 : 400,
                    tension: 10,
                    useNativeDriver: false,
                }).start();
                break;

            case false:
                setIconName('caret-up');
                setIconDescription('Visualizar pedidos e ofertas');
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
                contentContainerStyle={styles.scrollStyle}
            >
                {helps.map((help) => {
                    const isRiskGroup = !!help.user.riskGroup.length;

                    return (
                        <TouchableOpacity
                            key={help._id}
                            onPress={() =>
                                navigation.navigate('mapHelpDescription', {
                                    help: help,
                                    helpType: 'help',
                                })
                            }
                        >
                            <HistoricCard
                                object={help}
                                isRiskGroup={isRiskGroup}
                            />
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
            }}
        >
            <NoHelps title="Não há ajudas próximas" color="light" />
        </View>
    );

    return (
        <Animated.View
            style={[styles.helpListContainer, { height: listHeight }]}
        >
            <TouchableWithoutFeedback onPress={() => setVisible(!visible)}>
                <View style={styles.buttonStyle}>
                    <Text style={styles.iconDescription}>
                        {iconDescription}
                    </Text>
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
