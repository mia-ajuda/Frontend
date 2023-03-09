import React, { useContext, useEffect, useState } from 'react';
import { View, ActivityIndicator, ScrollView } from 'react-native';
import { UserContext } from '../../../store/contexts/userContext';
import styles from '../styles';
import callService from '../../../services/callService';
import helpService from '../../../services/Help';
import colors from '../../../../assets/styles/colorVariables';
import NoHelps from '../../../components/NoHelps';
import HistoricCard from '../../../components/HistoricCard';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LoadingContext } from '../../../store/contexts/loadingContext';

const OfferHelpPage = ({ navigation }) => {
    const { user } = useContext(UserContext);
    const { isLoading, setIsLoading } = useContext(LoadingContext);

    const [myOfferedHelp, setMyOfferedHelps] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getHelps();
        });
        return unsubscribe;
    }, [navigation]);

    async function getHelps() {
        setIsLoading(true);
        const filteredHelps = await callService(
            helpService,
            'getHelpMultipleStatus',
            [user._id, ['on_going', 'owner_finished', 'waiting'], true],
        );
        if (!filteredHelps.error) {
            setMyOfferedHelps(filteredHelps);
        }
        setIsLoading(false);
    }

    const renderHelpRequestsList = () => {
        if (myOfferedHelp.length > 0) {
            return (
                <ScrollView>
                    {myOfferedHelp.map((help) => {
                        return (
                            <TouchableOpacity
                                key={help._id}
                                onPress={() =>
                                    navigation.navigate(
                                        'myOfferHelpDescription',
                                        {
                                            helpId: help._id,
                                            routeId: 'Help',
                                        },
                                    )
                                }
                            >
                                <HistoricCard object={help} />
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            );
        } else {
            return (
                <NoHelps title="Você não está ajudando ninguém até o momento" />
            );
        }
    };

    return (
        <View style={styles.helpList}>
            {!isLoading && renderHelpRequestsList()}
        </View>
    );
};

export default OfferHelpPage;
