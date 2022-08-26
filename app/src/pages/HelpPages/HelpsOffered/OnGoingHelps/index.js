import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import styles from '../../MyRequests/styles';
import HistoricCard from '../../../../components/HistoricCard';
import { UserContext } from '../../../../store/contexts/userContext';
import NoHelps from '../../../../components/NoHelps';
import colors from '../../../../../assets/styles/colorVariables';
import helpService from '../../../../services/Help';
import callService from '../../../../services/callService';

import { TouchableOpacity } from 'react-native-gesture-handler';
export default function AskedHelps({ navigation }) {
    const { user } = useContext(UserContext);
    const [myOfferedHelps, setMyOfferedHelps] = useState([]);
    const [loadingOfferdHelps, setLoadingOfferdHelps] = useState(true);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getHelps();
        });
        return unsubscribe;
    }, [navigation]);

    async function getHelps() {
        setLoadingOfferdHelps(true);
        const filteredHelps = await callService(
            helpService,
            'getHelpMultipleStatus',
            [user._id, ['on_going', 'owner_finished', 'waiting'], true],
        );
        if (!filteredHelps.error) {
            setMyOfferedHelps(filteredHelps);
        }
        setLoadingOfferdHelps(false);
    }

    const renderLoadingIndicator = () => (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );

    const renderHelpRequestsList = () => {
        if (myOfferedHelps.length > 0) {
            return (
                <ScrollView>
                    {myOfferedHelps.map((help) => {
                        return (
                            <TouchableOpacity
                                key={help._id}
                                onPress={() =>
                                    navigation.navigate('OfferDescription', {
                                        help,
                                    })
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
            {loadingOfferdHelps
                ? renderLoadingIndicator()
                : renderHelpRequestsList()}
        </View>
    );
}
