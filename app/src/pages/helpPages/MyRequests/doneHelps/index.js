import React, { useState, useContext, useCallback } from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';
import ListCard from '../../../../components/ListCard';
import { UserContext } from '../../../../store/contexts/userContext';
import helpService from '../../../../services/Help';
import styles from '../styles';
import colors from '../../../../../assets/styles/colorVariables';

import NoHelps from '../../../../components/NoHelps';
import { useFocusEffect } from '@react-navigation/native';
import { ServiceContext } from '../../../../store/contexts/serviceContext';

export default function DoneHelps({ navigation }) {
    const [finishedHelpList, setFinishedHelpList] = useState([]);

    const [loadingHelps, setLoadingHelps] = useState(false);
    const { user } = useContext(UserContext);
    const { _id: userId } = user;
    const { useService } = useContext(ServiceContext);

    useFocusEffect(
        useCallback(() => {
            loadFinishedHelps();
        }, [navigation]),
    );

    async function loadFinishedHelps() {
        setLoadingHelps(true);
        let resFinished = await useService(
            helpService,
            'getHelpMultipleStatus',
            [userId, 'finished'],
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
                        {finishedHelpList.map((item) => (
                            <View key={item._id}>
                                <ListCard
                                    helpTitle={item.title}
                                    helpDescription={item.description}
                                    helpStatus={item.status}
                                    categoryName={item.category[0].name}
                                    navigation={navigation}
                                    pageName="RequestDescription"
                                />
                            </View>
                        ))}
                    </View>
                </ScrollView>
            ) : (
                <NoHelps title={'Você não possui ajudas finalizadas'} />
            )}
        </View>
    );
}
