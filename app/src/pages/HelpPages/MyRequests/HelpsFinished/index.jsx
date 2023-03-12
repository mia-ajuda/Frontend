import React, { useState, useContext, useCallback } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import HistoricCard from '../../../../components/HistoricCard';
import { UserContext } from '../../../../store/contexts/userContext';
import helpService from '../../../../services/Help';
import styles from '../styles';

import NoHelps from '../../../../components/NoHelps';
import { useFocusEffect } from '@react-navigation/native';
import callService from '../../../../services/callService';
import { LoadingContext } from '../../../../store/contexts/loadingContext';

export default function HelpsFinished({ navigation }) {
    const { isLoading, setIsLoading } = useContext(LoadingContext);
    const { user } = useContext(UserContext);

    const [finishedHelpList, setFinishedHelpList] = useState([]);

    useFocusEffect(
        useCallback(() => {
            loadFinishedHelps();
        }, [navigation]),
    );

    async function loadFinishedHelps() {
        setIsLoading(true);
        const { _id: userId } = user;
        const resFinished = await callService(
            helpService,
            'getHelpMultipleStatus',
            [userId, 'finished'],
        );
        if (!resFinished.error) {
            setFinishedHelpList(resFinished);
        }
        setIsLoading(false);
    }

    const renderHelpList = () => {
        if (finishedHelpList.length > 0) {
            return (
                <ScrollView>
                    <View style={styles.helpList}>
                        {finishedHelpList.map((help) => (
                            <TouchableOpacity
                                key={help._id}
                                onPress={() =>
                                    navigation.navigate(
                                        'myRequestHelpDescription',
                                        {
                                            help,
                                        },
                                    )
                                }
                            >
                                <HistoricCard object={help} />
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            );
        } else {
            return <NoHelps title={'Você não possui ajudas finalizadas'} />;
        }
    };
    return <View>{!isLoading && renderHelpList()}</View>;
}
