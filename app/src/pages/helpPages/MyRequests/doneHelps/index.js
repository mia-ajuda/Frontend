import React, { useState, useContext, useCallback } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import HelpCard from '../../../../components/HelpCard';
import { UserContext } from '../../../../store/contexts/userContext';
import helpService from '../../../../services/Help';
import styles from '../styles';
import colors from '../../../../../assets/styles/colorVariables';

import NoHelps from '../../../../components/NoHelps';
import { useFocusEffect } from '@react-navigation/native';

export default function DoneHelps({ navigation }) {
    const [finishedHelpList, setFinishedHelpList] = useState([]);

    const [loadingHelps, setLoadingHelps] = useState(false);
    const { user } = useContext(UserContext);
    const { _id: userId } = user;

    useFocusEffect(
        useCallback(() => {
            loadFinishedHelps();
        }, [navigation]),
    );

    async function loadFinishedHelps() {
        setLoadingHelps(true);
        let resFinished = await helpService.getHelpMultipleStatus(
            userId,
            'finished',
        );
        setFinishedHelpList(resFinished);
        setLoadingHelps(false);
    }

    return (
        <View>
            {loadingHelps ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={colors.primary} />
                </View>
            ) : finishedHelpList.length > 0 ? (
                <ScrollView>
                    <View style={styles.helpList}>
                        {finishedHelpList.map((help) => (
                            <HelpCard key={help._id} help={help} />
                        ))}
                    </View>
                </ScrollView>
            ) : (
                <NoHelps title={'Você não possui ajudas finalizadas'} />
            )}
        </View>
    );
}
